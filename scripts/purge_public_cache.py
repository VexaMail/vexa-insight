import json
import stat
import urllib.error
import urllib.request
from pathlib import Path


def purge_public_cache(config):
    """Invalidate an explicit allowlist using a separately stored scoped token."""
    token_path = Path(config['tokenFile']).expanduser()
    if stat.S_IMODE(token_path.stat().st_mode) & 0o077:
        raise RuntimeError('Purge token file must be owner-only (mode 600).')
    origin = config['productionUrl'].rstrip('/')
    if origin != 'https://insight.vexamail.com':
        raise RuntimeError('Refusing to purge an unexpected public hostname.')
    files = [origin + path for path in ['/', '/robots.txt', '/sitemap.xml', '/vexa-insight-dashboard-light.png']]
    request = urllib.request.Request(
        'https://api.cloudflare.com/client/v4/zones/' + config['zoneId'] + '/purge_cache',
        data=json.dumps({'files': files}).encode(),
        headers={'Authorization': 'Bearer ' + token_path.read_text().strip(), 'Content-Type': 'application/json'},
        method='POST',
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            result = json.load(response)
    except urllib.error.HTTPError as error:
        raise RuntimeError(f'Cloudflare purge failed: HTTP {error.code}.') from None
    if not result.get('success'):
        raise RuntimeError('Cloudflare did not confirm cache invalidation.')
    print(f'PASS targeted Cloudflare purge: {len(files)} public URLs')
