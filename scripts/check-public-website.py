#!/usr/bin/env python3
"""Check a deployed public website, including its private-route boundary."""
import json
import sys
from public_website_response import public_website_response


def main():
    base = (sys.argv[1] if len(sys.argv) > 1 else 'https://insight.vexamail.com').rstrip('/')
    if base.startswith('https://'):
        status, headers, _ = public_website_response('http://' + base.removeprefix('https://') + '/')
        assert status in (301, 308) and headers.get('Location') == base + '/', 'HTTPS redirect missing'
        print('PASS HTTP redirects to HTTPS')
    domain = sys.argv[2] if len(sys.argv) > 2 else 'teleporte.es'
    for path in ['/', '/' + domain, '/vexa-insight-logo.svg', '/vexa-insight-logo-dark.svg', '/robots.txt']:
        status, headers, body = public_website_response(base + path)
        assert status == 200, (path, status)
        if path == '/':
            assert 'Free DMARC &amp;' in body, 'Wrong landing'
            assert headers.get('Content-Security-Policy'), 'Missing CSP'
        if path == '/robots.txt':
            assert 'Sitemap: https://insight.vexamail.com/sitemap.xml' in body, 'Public sitemap not advertised'
        print('PASS 200', path)
    status, headers, body = public_website_response(base + '/sitemap.xml')
    assert status == 200 and 'application/xml' in headers.get('Content-Type', ''), 'Invalid public sitemap'
    assert '<loc>https://insight.vexamail.com/</loc>' in body and '/login' not in body
    print('PASS public XML sitemap')
    for path in ['/install', '/settings', '/login', '/api/install', '/api/v1/domains', '/api/v1/openapi.json', '/api/v1/health']:
        status, _, _ = public_website_response(base + path)
        assert status == 404, (path, status)
        print('PASS 404', path)
    status, _, _ = public_website_response(base + '/api/public/domain-check?domain=localhost')
    assert status == 400, ('Private domain input accepted', status)
    status, headers, body = public_website_response(base + '/api/public/domain-check?domain=' + domain)
    assert status == 200, ('DNS report', status)
    report = json.loads(body)
    assert report['domain'] == domain
    score = report['score']
    assert score['value'] is None or score['value'] == score['spf'] + score['dmarc']
    assert score['value'] is None or 0 <= score['value'] <= 100
    assert {item['name'] for item in report['checks']} == {'SPF', 'DKIM', 'DMARC', 'MX'}
    assert any(item['status'] != 'unknown' for item in report['checks']), 'All DNS checks failed'
    assert headers['Cache-Control'] == 'no-store'
    assert headers['X-Robots-Tag'] == 'noindex'
    print('PASS public DNS report for', report['domain'], 'checked at', report['checkedAt'])
    print('PASS public website:', base)


if __name__ == '__main__':
    main()
