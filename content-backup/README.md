# Content-Backup (Sanity-Snapshot)

Stand des **veröffentlichten** Sanity-Contents vom 19. September 2026, unmittelbar vor der CMS-Entkopplung.

- `sanity-content.json`: alle Content-Dokumente, ohne Entwürfe.
- `sanity-images.json`: Liste aller Bild-Assets mit Original-URL.

Bewusst **nicht** enthalten: Gutscheine, Käuferdaten, Gutschein-PDFs. Dieses Verzeichnis darf nie personenbezogene Daten aufnehmen.

Die Originale liegen unverändert im Sanity-Projekt `vm9l1skm` (Dataset `production`) und sind im Studio unter „Archiv" einsehbar. Neu erzeugen:

```
node --env-file=.env.local scripts/export-sanity-content.mjs
```
