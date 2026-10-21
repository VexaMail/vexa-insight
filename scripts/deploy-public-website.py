#!/usr/bin/env python3
import argparse
import json
from pathlib import Path
import shlex
import stat
import subprocess
import sys
import tarfile
import tempfile
import time
from purge_public_cache import purge_public_cache
from read_public_deploy_config import read_public_deploy_config


def main():
    """Deploy a verified Linux standalone artifact, purge, then check public behavior."""
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('runtime', type=Path)
    parser.add_argument('--config', type=Path, default=Path.home() / '.config/vexa-insight/public-deploy.json')
    args = parser.parse_args()
    config = read_public_deploy_config(args.config)
    token_file = Path(config['tokenFile']).expanduser()
    if not token_file.is_file() or stat.S_IMODE(token_file.stat().st_mode) & 0o077:
        raise RuntimeError('A protected purge token is required before deploying.')
    runtime = args.runtime.resolve(strict=True)
    revision = (runtime / 'REVISION').read_text().strip()
    if len(revision) != 40 or any(c not in '0123456789abcdef' for c in revision):
        raise RuntimeError('A full source SHA is required in REVISION.')
    if list(runtime.rglob('.env*')) or list(runtime.rglob('*.db')):
        raise RuntimeError('Public artifact contains environment or database files.')
    ssh = ['ssh', '-o', 'BatchMode=yes', '-p', str(config['sshPort']), '-i', str(Path(config['sshIdentityFile']).expanduser()), config['sshHost']]
    remote_archive = '/tmp/vexa-public-' + revision + '.tar.gz'
    with tempfile.TemporaryDirectory(prefix='vexa-public-deploy-') as directory:
        archive_path = Path(directory) / 'runtime.tar.gz'
        with tarfile.open(archive_path, 'w:gz') as archive:
            archive.add(runtime, arcname='.')
            archive.add(Path(__file__).resolve().parent.parent / 'deploy/public/start.sh', arcname='public-start.sh')
        subprocess.run(['scp', '-q', '-P', str(config['sshPort']), '-i', str(Path(config['sshIdentityFile']).expanduser()), str(archive_path), config['sshHost'] + ':' + remote_archive], check=True)
        remote_config = {key: config[key] for key in ['serviceRoot', 'websiteId', 'appId', 'restartTokenFile']}
        remote_config.update(revision=revision, archive=remote_archive)
        installer = Path(__file__).with_name('install_public_runtime.py').read_text()
        subprocess.run(ssh + ['python3 - ' + shlex.quote(json.dumps(remote_config))], input=installer, text=True, check=True)
    # Enhance restarts sibling persistent apps as part of its PATCH operation.
    time.sleep(3)
    purge_public_cache(config)
    subprocess.run([sys.executable, str(Path(__file__).with_name('check-public-website.py')), config['productionUrl'], 'teleporte.es'], check=True)


if __name__ == '__main__':
    main()
