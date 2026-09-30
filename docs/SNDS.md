# Microsoft SNDS

Microsoft's Smart Network Data Services (SNDS) reports how Outlook.com sees mail
from IPs you control: how much arrived, the spam filter verdict, the complaint
rate and spam trap hits. Vexa pulls that data through the SNDS REST API and
shows it next to the DMARC data on the IP pages.

## Before you start

- Register the IPs at <https://sendersupport.olc.protection.outlook.com/snds/>
  with a personal Microsoft account and get access approved. Vexa reads what
  that account can see; it does not request access itself.
- Data for a day appears one to two days later, and only for IPs that sent mail
  to Outlook.com that day. An empty report is normal for a quiet IP.

## Connect

SNDS only accepts `http://localhost` as the sign-in redirect for its API client,
so the sign-in cannot return to Vexa on its own. The flow is:

1. In **Settings > Microsoft SNDS**, choose **Connect**. Vexa opens the
   Microsoft sign-in page in a new tab and keeps the PKCE verifier on the
   server, encrypted, for ten minutes.
2. Sign in with the account that owns the SNDS access and accept the permission
   prompt.
3. The tab ends on an address like `http://localhost/?code=...` that fails to
   load. That is expected. Copy the whole address and paste it into the form in
   Settings right away: Microsoft's codes expire within about a minute.
4. Vexa redeems the code, stores the refresh token encrypted with the instance
   key and runs a first sync.

The token redemption is done by the server without an `Origin` header; Microsoft
refuses a browser-style redemption for this client (`AADSTS90023`).

The browser sends only the query string of the pasted address. A web application
firewall running the OWASP Core Rule Set (ModSecurity, Coraza) blocks any
request parameter that names `localhost` as a possible SSRF (rule 934190), which
would otherwise reject the connect step with a 403.

## Sync

- Daily at 06:17 server time, and on demand with **Sync now**.
- Each run fetches every day of the last 30 that is not stored yet, then the IP
  status list (IPs SNDS currently blocks or junks).
- A 404 from SNDS means "no data for that day" and is not an error; the day is
  retried on the next run, since data can arrive late.
- Microsoft rotates the refresh token on every use and Vexa stores the new one
  each time. If the sync reports a sign-in error, reconnect.

**Disconnect** removes the stored token and keeps the data already fetched.

## Alerts

A day with any IP that is not rated `GREEN`, has a complaint rate above 0.3% or
has spam trap hits fires the `snds.reputation_alert` webhook event with the
report date and the flagged IPs.

## Data mapping

The REST API answers with CSV (`application/octet-stream`), one line per IP and
no header row, in the column order of the old CSV export: IP address, activity
start and end, RCPT commands, DATA commands, message recipients, filter result,
complaint rate, trap message period start and end, spam trap hits, sample HELO,
sample MAIL FROM and sample comments. The status report uses first IP, last IP,
blocked and details. Vexa also accepts a JSON body, matching field names loosely
(`IP Address`, `ipAddress` and `ip` all work), and keeps each row as it arrived
in the `raw` column.
