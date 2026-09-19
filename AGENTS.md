<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
Bitte sieh dir immer zuerst die @package.json    an, bevor du irgendwas implementierst, damit wir die richtigen Pakete verwenden, die wir schon installiert haben.

## Deploy-Workflow & Branches

GitHub-Repo: `pixelheld-org/domenic` (seit 19.09.2026, vorher `josefshamstr/domenic`; GitHub leitet die alte Adresse weiter).

Vercel-Projekt `domenic` (Team `josefs-projects-3ccea825`):

- **`main`** → Production-Deploy. Auto-deployed zu `heilmasseur-domenic.at` + `www.heilmasseur-domenic.at`.
- **`preview`** → Vercel Preview-Deploy. Auto-deployed zu `domenic-snowy.vercel.app` (Custom Alias der Preview-Domain). **Branch NICHT löschen** — er ist die fest verlinkte Staging-URL und wird laufend für Reviews vor Production-Merge genutzt.

Üblicher Flow: feature work → push to `preview` → review auf `domenic-snowy.vercel.app` → PR `preview → main` → merge → Production-Deploy.

Wegen `preview`'s Custom-Alias-Domain greift Vercels automatischer `x-robots-tag: noindex` (der nur auf `*-git-*-josefs-projects-*.vercel.app` Defaults gesetzt wird) NICHT. Stattdessen setzen wir noindex/nofollow für alle Nicht-Production-Deployments via `next.config.ts → headers()` basierend auf `process.env.VERCEL_ENV !== "production"`. Wenn die Preview-Domain umgezogen wird, diesen Mechanismus checken.

## Inhalte & Pixelheld-Portal (seit September 2026)

Die Website liest **keine Inhalte mehr aus Sanity**. Texte stehen direkt im JSX der Seiten und Komponenten, Bilder liegen unter `public/images/`. Domenic pflegt Inhalte selbst über das Pixelheld-Portal (Änderungsplattform).

- **`data-edit-id` ist Pflicht:** Jedes sichtbare Textelement trägt ein eindeutiges, statisches `data-edit-id`. Die Kinder des Elements sind reiner Text oder ein String-Literal. Nur dann funktioniert die direkte Textbearbeitung im Portal ohne KI-Job. Neue Texte immer so anlegen, IDs nie doppelt vergeben, bestehende IDs nicht umbenennen.
- **`editkit/edit-kit.tsx`** ist im Root-Layout eingebunden und nur in der Portal-Sandbox aktiv (`NEXT_PUBLIC_PIXELHELD_EDIT_MODE`). In Produktion ist es inert. Die Datei wird vom Portal beim Sandbox-Start überschrieben, deshalb hier nicht von Hand ändern.
- **Build ohne Secrets muss durchlaufen.** Die Portal-Sandbox baut das Repo ohne Stripe-, Resend- und Sanity-Variablen. Clients deshalb immer lazy erzeugen (siehe `lib/stripe/client.ts`), nie beim Modul-Import auf fehlende Env-Variablen werfen.
- **Preise der Blockkarten** stehen ausschließlich in `lib/blockOptions.ts` (`BLOCK_PRICES`). Dieselbe Tabelle speist Gutschein-Seite, Preisseite und Stripe-Checkout.
- Das Portal arbeitet auf `main`: Sandbox klont `main`, „Übernehmen" merged nach `main`. Nach Portal-Änderungen vor eigener Arbeit immer `git pull`.

### Sanity ist nur noch die Gutschein-Datenbank

Der Stripe-Webhook schreibt Gutscheine nach Sanity, das Studio unter `/studio` dient zum Einlösen. Die früheren Content-Dokumente liegen weiter im Sanity-Projekt (im Studio unter „Archiv") und als Snapshot in `content-backup/`. Sie sind ein Rettungsanker und haben keine Wirkung auf die Live-Seite. `content-backup/` darf nie Gutschein- oder Kundendaten enthalten.
