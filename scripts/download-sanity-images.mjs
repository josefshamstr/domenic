// Einmalig: lädt die live verwendeten Sanity-Bilder mit exakt den Zuschnitten der bisherigen urlFor()-Aufrufe
// (inkl. Hotspot/Crop) nach public/images/cms/. Aufruf: node scripts/download-sanity-images.mjs
import { createImageUrlBuilder } from "@sanity/image-url";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const docs = JSON.parse(readFileSync("content-backup/sanity-content.json", "utf8"));
const doc = (t) => docs.find((d) => d._type === t);
const b = createImageUrlBuilder({ projectId: "vm9l1skm", dataset: "production" });
const jobs = [
  ["home-hero-bg", doc("homePage").heroBackgroundImage, (i) => i.width(2000).quality(80)],
  ["home-portrait", doc("homePage").portraitImage, (i) => i.width(576).height(576)],
  ["home-about-teaser", doc("homePage").aboutTeaserImage, (i) => i.width(352).height(352)],
  ["heilmassage-hero", doc("heilmassagePage").heroImage, (i) => i.width(800).height(600)],
  ["heilmassage-approach", doc("heilmassagePage").approachImage, (i) => i.width(800).height(600)],
  ["sportmassage-hero", doc("sportmassagePage").heroImage, (i) => i.width(800).height(600)],
  ["sportmassage-approach", doc("sportmassagePage").approachImage, (i) => i.width(800).height(600)],
  ["about-hero", doc("about").heroImage, (i) => i.width(800).height(600)],
  ["about-breakdance", doc("about").breakdanceImage, (i) => i.width(600).height(750)],
  ["about-avatar", doc("about").image, (i) => i.width(80).height(80)],
];
mkdirSync("public/images/cms", { recursive: true });
for (const [name, image, shape] of jobs) {
  if (!image?.asset) { console.log("–", name, "kein Bild in Sanity, übersprungen"); continue; }
  const url = shape(b.image(image)).format("webp").url();
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(`public/images/cms/${name}.webp`, buf);
  console.log("✓", name, `${Math.round(buf.length / 1024)} KB`);
}
