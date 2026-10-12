---
title: "Why your SSO rejects passkeys: SAML AuthnContext and Entra ID"
description: "Users sign in to Microsoft 365 with Face ID or a passkey, then a SAML app makes them type a password anyway. One default setting is usually to blame."
date: 2026-10-12
tags: [identity, entra-id, sso, passwordless]
draft: true
---

You roll out passwordless sign-in. People start using passkeys, Face ID and Windows Hello, and Microsoft 365 works perfectly. Then they open a SaaS app that uses SAML single sign-on and get pushed back to a password prompt, or simply get an error.

The only combination that still works is the old one: password plus an authenticator app. It looks like the app "doesn't support passkeys". Usually that's not the problem.

## What is actually happening

When a SAML app sends you to Entra ID to sign in, its request can include a **RequestedAuthnContext**: the kind of authentication the app wants. Many apps send this by default:

```
urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport
```

Entra ID takes that literally. It means "the user must have signed in with a password". If your existing session came from a passkey or biometrics, it doesn't count, so Entra either asks for a password again or fails with:

```
AADSTS75011: Authentication method 'X509, MultiFactor' by which the user
authenticated with the service doesn't match requested authentication
method 'Password, ProtectedTransport'.
```

Password plus authenticator still works because that session *did* include a password.

## How to confirm it

Open the Entra ID sign-in logs, filter on the affected enterprise app, and look at a failed sign-in. If you see `AADSTS75011` or a mismatch on the requested authentication method, this is your issue.

## The fix

Stop the app from asking for a specific authentication method. In most SAML configurations this is an advanced option called **AuthnContextClassRef**. Set it to *none* or *don't send*.

In Slack, for example, it's under the SAML configuration's advanced options, and the last item in the dropdown is "Don't send this value."

Then decide how strong authentication should be where it belongs: in your identity provider. A Conditional Access policy with an **authentication strength** (for example, phishing-resistant MFA) on the app enforces what you actually want, and it treats passkeys as the strong method they are rather than locking them out.

## The takeaway

Passwordless rollouts rarely fail because of the passkeys themselves. They fail on defaults that quietly assume a password exists. If an app "doesn't support" passwordless sign-in, check what it's *asking* your identity provider for before you blame the app.
