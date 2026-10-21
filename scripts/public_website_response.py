"""Read a public HTTP response using curl's TLS stack."""
import subprocess
from email.parser import Parser


def public_website_response(url):
    result = subprocess.run(
        ['curl', '--silent', '--show-error', '--max-time', '30', '--include', '--write-out', '\n%{http_code}', '--', url],
        capture_output=True, text=True, check=True,
    )
    raw, status = result.stdout.rsplit('\n', 1)
    header, _, body = raw.partition('\n\n')
    headers = Parser().parsestr(header.partition('\n')[2])
    return int(status), headers, body
