#!/usr/bin/env python3
import datetime
import json
import os
import pathlib
import shutil
import ssl
import subprocess
import sys
import tarfile
import urllib.request


def main():
    """Stage a public-only runtime and preserve the previous app before restart."""
    config = json.loads(sys.argv[1])
    root = pathlib.Path(config['serviceRoot']).resolve(strict=True)
    current = root / 'app'
    revision = config['revision']
    if not current.is_dir() or not (current / 'REVISION').is_file():
        raise RuntimeError('The target is not an existing public runtime.')
    owner = current.stat()
    stage = root / ('app.next-' + revision[:12])
    stage.mkdir()
    with tarfile.open(config['archive']) as archive:
        archive.extractall(stage, filter='data')
    if (stage / 'REVISION').read_text().strip() != revision:
        raise RuntimeError('Staged runtime revision mismatch.')
    if list(stage.rglob('.env*')) or list(stage.rglob('*.db')):
        raise RuntimeError('Public runtime contains environment or database files.')
    # The build can trace a public GeoIP asset needed only by the private app.
    data = stage / 'data'
    if data.exists():
        if any(path.is_file() and path.name != 'geoip-country.dat' for path in data.rglob('*')):
            raise RuntimeError('Unexpected runtime data; refusing to modify it.')
        shutil.rmtree(data)
    subprocess.run(['chown', '-hR', f'{owner.st_uid}:{owner.st_gid}', str(stage)], check=True)
    old_revision = (current / 'REVISION').read_text().strip()[:12]
    stamp = datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ')
    backup = root / f'app.prev-{old_revision}-{stamp}'
    startup = stage / 'public-start.sh'
    if not startup.is_file():
        raise RuntimeError('Public startup script is missing.')
    (root / ('start.sh.prev-' + stamp)).write_bytes((root / 'start.sh').read_bytes())
    (root / 'start.sh').write_bytes(startup.read_bytes())
    os.chown(root / 'start.sh', owner.st_uid, owner.st_gid)
    current.rename(backup)
    stage.rename(current)
    request = urllib.request.Request(
        'https://127.0.0.1:2087/api/websites/' + config['websiteId'] + '/apps/persistent/' + config['appId'],
        data=json.dumps({'startMode': 'automatic'}).encode(),
        headers={'Authorization': 'Bearer ' + pathlib.Path(config['restartTokenFile']).read_text().strip(), 'Content-Type': 'application/json'},
        method='PATCH',
    )
    try:
        with urllib.request.urlopen(request, context=ssl._create_unverified_context(), timeout=60) as response:
            if response.status != 200:
                raise RuntimeError('The process manager did not confirm restart.')
    except Exception:
        current.rename(root / ('app.failed-' + revision[:12] + '-' + stamp))
        backup.rename(current)
        (root / 'start.sh').write_bytes((root / ('start.sh.prev-' + stamp)).read_bytes())
        raise RuntimeError('Restart failed; prior files restored and staged runtime preserved.') from None
    print('PASS installed public revision ' + revision + '; previous runtime preserved.')
    os.unlink(config['archive'])


if __name__ == '__main__':
    main()
