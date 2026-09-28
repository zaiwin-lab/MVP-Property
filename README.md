# KOBIS Property Concierge

**Guided property discovery, affordability exploration and appointment planning for Kuching buyers.**

[Open the verified live demonstration](https://mvp-property.netlify.app)

> **Maturity:** Interactive demonstration · pre-production · not an operational lead-management system  
> **Delivery:** Next.js interface with calculators, multilingual content, demonstration dashboards and an optional OpenAI route  
> **Prepared by:** Ts. Zaiwin Kassim with the KOBIS AI Prodigy Team

KOBIS Property Concierge explores how property discovery, affordability scenarios, buyer questions and viewing requests could sit within one coherent digital journey. It is a portfolio demonstration, not a verified property marketplace, authenticated CRM or production sales platform.

## Business problem

Prospective buyers often move between listings, calculators, messaging threads and viewing arrangements. That fragmentation makes comparison harder and can obscure which figures are indicative, which properties remain available and which requests have actually reached an adviser.

The product demonstrates a clearer front-end journey while keeping property, financing and appointment decisions under qualified human control.

## Intended users

- prospective Kuching homebuyers and property investors;
- human property advisers demonstrating a guided discovery journey;
- delivery teams testing multilingual property-content and calculator experiences;
- administrators evaluating a future governed lead and appointment workflow.

These are intended users, not evidence of adoption, authorised agency relationships or completed transactions.

## Capabilities evidenced in the repository

- responsive property-discovery pages for three illustrative apartment developments;
- English, Bahasa Malaysia, Mandarin and Tamil interface foundations;
- affordability, loan-eligibility and return-on-investment scenario calculators;
- partner-page and referral-link interface foundations;
- appointment-request and lead-capture interface flows;
- demonstration administrator and partner dashboards;
- a server-side streaming assistant route using `gpt-4o-mini` when `OPENAI_API_KEY` is configured;
- an offline assistant message when no AI key is present;
- Prisma models for partners, introducers, properties, leads, appointments and configuration.

## Strategic value

The repository demonstrates how KOBIS could connect discovery, early financial orientation, human advisory support and structured appointment requests. It is also useful evidence of multilingual product design, deterministic calculators and supervised AI-assisted implementation.

Its next strategic milestone is not more interface polish: it is a fail-closed, authenticated and durable lead workflow backed by authorised property information.

## Verified deployment record

Netlify records a ready public deployment at [mvp-property.netlify.app](https://mvp-property.netlify.app), originally published on **25 June 2026**.

The inspected production deploy:

- was triggered by an upload/API workflow;
- has no attached Git commit reference or commit URL;
- contains one Next.js server handler;
- records a source ZIP as available in Netlify;
- predates later default-branch documentation and source-of-truth commits.

The live site and current default branch therefore cannot be assumed to be identical until the Netlify source bundle is compared with GitHub.

## What is demonstration-only

- **Authentication is not configured.** The login form always returns “Authentication system not yet configured.”
- **Dashboards are not protected.** The inspected administrator and partner layouts do not enforce a session or role check.
- **Dashboard identities and metrics are illustrative.** Partner names, lead totals, appointment totals and dates are hard-coded demonstration data.
- **Lead persistence can fail open.** If Prisma fails, the lead endpoint returns an HTTP 201 response containing a generated mock record.
- **Appointment persistence can fail open.** The appointment endpoint also returns a mock success record when the database is unavailable.
- **The browser can show success after a network failure.** The appointment form sets its submitted state inside the request error handler.
- **SQLite is not a governed production datastore.** The current Prisma configuration uses a local file database and falls back to a null client when it cannot initialise.
- **AI lead capture is not persisted.** The interface infers “lead captured” from conversation text or message length but does not store a verified lead.
- **AI availability is conditional.** Without an OpenAI key, the assistant operates only as an offline message.

These behaviours make the product suitable for demonstrations—not for collecting or managing real customer records.

## Technology

| Layer | Evidence |
|---|---|
| Application | Next.js 16, React 19 and TypeScript |
| Interface | Tailwind CSS, Motion and Lucide |
| Validation | React Hook Form and Zod |
| Calculators | Deterministic client-side scenario logic |
| Data model | Prisma 7 with SQLite development adapter |
| AI route | OpenAI streaming chat with `gpt-4o-mini` when configured |
| Deployment | Netlify Next.js runtime |
| Languages | English, Bahasa Malaysia, Mandarin and Tamil foundations |

## Delivery role

**Ts. Zaiwin Kassim** leads product strategy, stakeholder requirements, customer-journey definition and delivery review with the **KOBIS AI Prodigy Team**.

AI tools may accelerate design and implementation. Human reviewers remain responsible for property facts, financial wording, data protection, testing and release decisions.

## Responsible-use limitations

- Do not treat displayed properties, prices, facilities, availability, partner identities or contact details as current without authorised verification.
- Calculators are illustrative planning tools, not financial advice, lending eligibility or investment-return guarantees.
- AI responses may be incomplete or incorrect and require human property and financial review.
- Do not enter real personal, financial or confidential information into the demonstration.
- No external organisation, developer, lender or property brand should be presented as a client, partner or endorser without written evidence.
- Production use requires consent records, privacy and retention controls, rate limiting, monitoring, incident handling and qualified legal review.

## Production-readiness checklist

1. Retrieve the Netlify source ZIP and compare it with the current default branch.
2. Replace placeholder login with tested server-side authentication and role-based authorisation.
3. Protect every administrator, partner and data API route.
4. Replace local SQLite and mock-success fallbacks with durable storage that fails closed.
5. Make the browser confirm success only after a verified stored record is returned.
6. Replace illustrative partners, listings, contact details and metrics with authorised data.
7. Add prompt-safety controls, consent, rate limiting, evaluation and human escalation for the AI route.
8. Test the complete path from enquiry to authenticated adviser follow-up before accepting real data.
9. Connect the next production deploy to an exact reviewed Git commit.

## Licence guidance

No open-source licence is declared. Public visibility does not grant permission to reuse the code, branding, content or property material. Confirm ownership and third-party rights before choosing a licence.

## Evidence boundary

This README describes inspected repository and connected deployment evidence. It does not claim customers, property mandates, authorised listings, qualified leads, appointments, revenue, financing approvals, partner relationships or production readiness.
