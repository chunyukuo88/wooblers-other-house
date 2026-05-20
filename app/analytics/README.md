## Automatic Events

In addition to `clicked_woobler` and other self-defined events, there are also GA4 automatic events — Google fires them for you with no code required, just by virtue of having gtag.js loaded. 

Here's what triggers each one:

```angular2html
session_start
```

This is fired when a user begins a new session. A session is defined as a period of activity — by default GA4 expires a session after 30 minutes of inactivity. So a returning visitor the next day = new session, new session_start.

```angular2html
page_view
```

Fired automatically by `gtag("config", 'G-XXXXXXXX')` — that single line in your inline script is what triggers it. Every time that config call runs, GA4 records a page view. In a Next.js app router setup this only runs once on initial load though, so if you want page views tracked on client-side navigation between routes, that's a separate problem to solve.

```angular2html
user_engagement
```
Fired when the page has been in focus for at least 1 second. Google uses this to distinguish real human visits from bots or accidental loads. It's also what powers the "engaged sessions" metric in the console.