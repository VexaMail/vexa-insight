import json
import stat
from pathlib import Path


def read_public_deploy_config(path):
    source = Path(path).expanduser()
    if stat.S_IMODE(source.stat().st_mode) & 0o077:
        raise RuntimeError('Deployment configuration must be owner-only (mode 600).')
    config = json.loads(source.read_text())
    if config.get('productionUrl', '').rstrip('/') != 'https://insight.vexamail.com':
        raise RuntimeError('Unexpected deployment hostname.')
    return config
