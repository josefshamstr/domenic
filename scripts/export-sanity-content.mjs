// Einmaliger Export des veröffentlichten Sanity-Contents (ohne Gutscheine, ohne Entwürfe).
// Rettungsanker für die CMS-Entkopplung. Repo-tauglich: enthält keine personenbezogenen Daten.
// Aufruf: node --env-file=.env.local scripts/export-sanity-content.mjs
import { createClient } from "@sanity/client";
import { writeFileSync, mkdirSync } from "node:fs";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-03-01",
  useCdn: false,
  perspective: "published",
});

const docs = await client.fetch(
  `*[!(_type match "sanity.*") && !(_type match "system.*") && _type != "voucher"] | order(_type asc, _id asc)`
);
// Nur Bild-Assets, die von Content-Dokumenten referenziert werden (Gutschein-PDFs sind fileAssets und bleiben draußen).
const images = await client.fetch(
  `*[_type == "sanity.imageAsset"]{_id, url, originalFilename, extension, "w": metadata.dimensions.width, "h": metadata.dimensions.height}`
);

mkdirSync("content-backup", { recursive: true });
writeFileSync("content-backup/sanity-content.json", JSON.stringify(docs, null, 2));
writeFileSync("content-backup/sanity-images.json", JSON.stringify(images, null, 2));
console.log(`${docs.length} Dokumente, ${images.length} Bilder exportiert`);
for (const t of [...new Set(docs.map((d) => d._type))]) console.log(" -", t, docs.filter((d) => d._type === t).length);
