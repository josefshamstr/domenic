import { defineField, defineType } from "sanity";

export const mobileMassagePageSchema = defineType({
  name: "mobileMassagePage",
  title: "Mobile Massage Wien",
  type: "document",
  fields: [
    // ── Hero ──────────────────────────────────────────────────
    defineField({
      name: "heroBadge",
      title: "Hero — Badge",
      type: "string",
      initialValue: "Hausbesuch in ganz Wien",
      group: "hero",
    }),
    defineField({
      name: "heroHeading",
      title: "Hero — Überschrift",
      type: "string",
      initialValue: "Mobile Massage – nachhaltige Entspannung bei Ihnen zuhause",
      group: "hero",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero — Untertitel",
      type: "text",
      rows: 3,
      initialValue:
        "Ich komme zu Ihnen — mit Massageliege, Ölen und Handtüchern. Sie brauchen nichts vorzubereiten außer einem ruhigen Platz. Diplomierte Heilmassage in Ihren eigenen vier Wänden.",
      group: "hero",
    }),
    defineField({
      name: "heroServiceLine",
      title: "Hero — Service-Zeile (VIP-Badge)",
      type: "string",
      initialValue: "Hotel & VIP Service auf Anfrage",
      group: "hero",
    }),
    defineField({
      name: "heroImage",
      title: "Hero — Bild",
      type: "image",
      options: { hotspot: true },
      group: "hero",
    }),

    // ── Preis ─────────────────────────────────────────────────
    defineField({
      name: "priceHeading",
      title: "Preis — Überschrift",
      type: "string",
      initialValue: "Ein Fixpreis, zwei Längen",
      group: "price",
    }),
    defineField({
      name: "priceDescription",
      title: "Preis — Beschreibung",
      type: "text",
      rows: 3,
      initialValue:
        "Keine Staffelung, keine Überraschungen: Ein Hausbesuch kostet 120 € — egal ob Sie 60 oder 90 Minuten buchen. Anfahrt innerhalb Wiens ist im Preis enthalten.",
      group: "price",
    }),
    defineField({
      name: "priceAmount",
      title: "Preis — Betrag in €",
      type: "number",
      initialValue: 120,
      group: "price",
    }),
    defineField({
      name: "priceDurations",
      title: "Preis — Dauer-Optionen",
      type: "array",
      of: [{ type: "string" }],
      initialValue: ["60 Minuten", "90 Minuten"],
      group: "price",
    }),
    defineField({
      name: "priceNote",
      title: "Preis — Hinweis",
      type: "text",
      rows: 3,
      initialValue:
        "Für Adressen außerhalb Wiens oder am Stadtrand kann ein Anfahrtsaufschlag dazukommen — den nenne ich Ihnen immer vorab, bevor der Termin fix ist.",
      group: "price",
    }),

    // ── Was ich mitbringe ─────────────────────────────────────
    defineField({
      name: "includedHeading",
      title: "Ausstattung — Überschrift",
      type: "string",
      initialValue: "Ich bringe alles mit",
      group: "included",
    }),
    defineField({
      name: "includedDescription",
      title: "Ausstattung — Beschreibung",
      type: "text",
      rows: 3,
      initialValue:
        "Sie müssen nichts besorgen, nichts umräumen und nichts vorbereiten. Ein Platz von etwa zwei mal zwei Metern reicht — den Rest bringe ich mit.",
      group: "included",
    }),
    defineField({
      name: "included",
      title: "Ausstattung — Karten",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titel", type: "string" }),
            defineField({
              name: "description",
              title: "Beschreibung",
              type: "text",
              rows: 3,
            }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
      initialValue: [
        {
          _key: "included-1",
          title: "Profi-Massageliege",
          description:
            "Stabile, gepolsterte Liege mit Nackenstütze — dieselbe Qualität wie in der Praxis, in wenigen Minuten aufgebaut.",
        },
        {
          _key: "included-2",
          title: "Öle & Emulsionen",
          description:
            "Hochwertige, hautverträgliche Öle. Auf Wunsch neutral und unparfümiert, wenn Sie empfindlich reagieren.",
        },
        {
          _key: "included-3",
          title: "Frische Handtücher",
          description:
            "Frisch gewaschene Handtücher und Auflagen für jeden Termin — Ihre eigenen Textilien bleiben unberührt.",
        },
        {
          _key: "included-4",
          title: "Ruhige Atmosphäre",
          description:
            "Auf Wunsch mit leiser Musik, sonst in Stille. Sie bestimmen, wie viel gesprochen wird.",
        },
      ],
      group: "included",
    }),

    // ── Für wen / Anlässe ─────────────────────────────────────
    defineField({
      name: "forWhomHeading",
      title: "Für wen — Überschrift",
      type: "string",
      initialValue: "Wann eine Massage zu Hause die bessere Wahl ist",
      group: "forWhom",
    }),
    defineField({
      name: "forWhomDescription",
      title: "Für wen — Beschreibung",
      type: "text",
      rows: 3,
      initialValue:
        "Manchmal ist der Weg zur Praxis genau das, was fehlt. Wer nach der Behandlung nicht mehr in die U-Bahn steigen muss, kommt tiefer runter — und bleibt länger entspannt.",
      group: "forWhom",
    }),
    defineField({
      name: "occasions",
      title: "Für wen — Anlass-Tags",
      type: "array",
      of: [{ type: "string" }],
      initialValue: [
        "Massage zu Hause",
        "Nach langen Arbeitstagen",
        "Hotelaufenthalt in Wien",
        "Nach Fernflügen",
        "Eingeschränkte Mobilität",
        "Junge Eltern",
        "Vor wichtigen Terminen",
        "Als Geschenk",
      ],
      group: "forWhom",
    }),

    // ── Ablauf ────────────────────────────────────────────────
    defineField({
      name: "processHeading",
      title: "Ablauf — Überschrift",
      type: "string",
      initialValue: "So läuft ein Hausbesuch ab",
      group: "process",
    }),
    defineField({
      name: "processDescription",
      title: "Ablauf — Beschreibung",
      type: "text",
      rows: 3,
      initialValue:
        "Diskret, pünktlich und ohne Aufwand für Sie. Vom Klingeln bis zum Abbau vergeht keine Minute, die Sie organisieren müssten.",
      group: "process",
    }),
    defineField({
      name: "processSteps",
      title: "Ablauf — Schritte",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titel", type: "string" }),
            defineField({
              name: "description",
              title: "Beschreibung",
              type: "text",
              rows: 3,
            }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
      initialValue: [
        {
          _key: "step-1",
          title: "Anfrage & Termin",
          description:
            "Sie nennen mir Adresse, Wunschtermin und ob 60 oder 90 Minuten. Ich bestätige den Termin und den Preis verbindlich.",
        },
        {
          _key: "step-2",
          title: "Aufbau in fünf Minuten",
          description:
            "Ich komme pünktlich, baue die Liege leise auf und Sie zeigen mir kurz, wo Sie es am liebsten hätten.",
        },
        {
          _key: "step-3",
          title: "Die Behandlung",
          description:
            "Kurzes Gespräch über Beschwerden und Intensität — danach 60 oder 90 Minuten gezielte Arbeit an Ihrem Körper.",
        },
        {
          _key: "step-4",
          title: "Nachklingen lassen",
          description:
            "Ich packe zusammen und gehe. Sie bleiben liegen, sitzen oder schlafen einfach weiter — kein Heimweg, kein Bruch.",
        },
      ],
      group: "process",
    }),

    // ── Hotel & VIP ───────────────────────────────────────────
    defineField({
      name: "vipHeading",
      title: "VIP — Überschrift",
      type: "string",
      initialValue: "Hotel & VIP Service auf Anfrage",
      group: "vip",
    }),
    defineField({
      name: "vipText",
      title: "VIP — Text",
      type: "text",
      rows: 4,
      initialValue:
        "Für Gäste in Wiener Hotels, Künstlerinnen und Künstler auf Tour und alle, die einen diskreten Termin brauchen: Ich behandle auf Anfrage auch im Hotelzimmer, in der Suite oder Backstage. Terminfenster außerhalb der üblichen Zeiten sind möglich — fragen Sie einfach an.",
      group: "vip",
    }),
    defineField({
      name: "vipPoints",
      title: "VIP — Punkte",
      type: "array",
      of: [{ type: "string" }],
      initialValue: [
        "Behandlung im Hotelzimmer oder in der Suite",
        "Diskretion und absolute Verschwiegenheit",
        "Termine auch am Abend und am Wochenende",
        "Auf Wunsch Abrechnung über die Rezeption oder das Management",
      ],
      group: "vip",
    }),

    // ── Social Proof ──────────────────────────────────────────
    defineField({
      name: "socialProofEyebrow",
      title: "Social Proof — Eyebrow",
      type: "string",
      initialValue: "Auf Tour & backstage",
      group: "socialProof",
    }),
    defineField({
      name: "socialProofHeading",
      title: "Social Proof — Überschrift",
      type: "string",
      initialValue: "Vertrauen von Menschen, die auf ihren Körper angewiesen sind",
      group: "socialProof",
    }),
    defineField({
      name: "socialProofText",
      title: "Social Proof — Text",
      type: "text",
      rows: 4,
      initialValue:
        "Bühne, Studio, Wettkampf: Wer beruflich mit dem Körper arbeitet, kann sich keine verschleppte Verspannung leisten. Aus dem Breakdance kenne ich diese Welt von innen — und weiß, wie viel ein guter Termin am richtigen Tag wert ist.",
      group: "socialProof",
    }),
    defineField({
      name: "socialProofImage",
      title: "Social Proof — Bild",
      type: "image",
      options: { hotspot: true },
      group: "socialProof",
    }),
    defineField({
      name: "socialProofCaption",
      title: "Social Proof — Bildunterschrift",
      type: "string",
      description:
        "Bildunterschrift unter dem Foto, z. B. Name und Anlass. Leer lassen, um die Unterschrift auszublenden.",
      group: "socialProof",
    }),

    // ── Einzugsgebiet ─────────────────────────────────────────
    defineField({
      name: "areaHeading",
      title: "Einzugsgebiet — Überschrift",
      type: "string",
      initialValue: "Mobile Massage in ganz Wien",
      group: "area",
    }),
    defineField({
      name: "areaDescription",
      title: "Einzugsgebiet — Beschreibung",
      type: "text",
      rows: 3,
      initialValue:
        "Ausgangspunkt ist meine Praxis in der Josefstadt. Innerhalb Wiens komme ich in jeden Bezirk — in den Innenbezirken bin ich meist besonders kurzfristig verfügbar.",
      group: "area",
    }),
    defineField({
      name: "areaDistricts",
      title: "Einzugsgebiet — Bezirke / Gebiete",
      type: "array",
      of: [{ type: "string" }],
      initialValue: [
        "1010 Innere Stadt",
        "1030 Landstraße",
        "1040 Wieden",
        "1060 Mariahilf",
        "1070 Neubau",
        "1080 Josefstadt",
        "1090 Alsergrund",
        "Alle weiteren Bezirke auf Anfrage",
      ],
      group: "area",
    }),

    // ── FAQs ──────────────────────────────────────────────────
    defineField({
      name: "faqs",
      title: "Häufige Fragen (Mobile Massage)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", title: "Frage", type: "string" }),
            defineField({
              name: "answer",
              title: "Antwort",
              type: "text",
              rows: 5,
            }),
          ],
          preview: { select: { title: "question" } },
        },
      ],
      initialValue: [
        {
          _key: "faq-1",
          question: "Was kostet eine mobile Massage in Wien?",
          answer:
            "Ein Hausbesuch kostet 120 € als Fixpreis — für 60 genauso wie für 90 Minuten. Die Anfahrt innerhalb Wiens ist enthalten. Bei Adressen weiter außerhalb kann ein Anfahrtsaufschlag dazukommen, den ich Ihnen vor der Terminbestätigung nenne.",
        },
        {
          _key: "faq-2",
          question: "Was muss ich für den Termin zu Hause vorbereiten?",
          answer:
            "Nichts. Ich bringe Massageliege, Öle und frische Handtücher mit. Sie brauchen nur einen freien Platz von etwa zwei mal zwei Metern — Wohnzimmer, Schlafzimmer oder Büro funktionieren alle gleich gut.",
        },
        {
          _key: "faq-3",
          question: "Wie viel Platz braucht die Massageliege?",
          answer:
            "Die Liege ist rund 190 cm lang und 70 cm breit. Damit ich rundherum arbeiten kann, sind etwa zwei mal zwei Meter ideal. Wenn Sie unsicher sind, schicken Sie mir vorab ein Foto des Raums — dann klären wir das in einer Minute.",
        },
        {
          _key: "faq-4",
          question: "Kommen Sie auch ins Hotel?",
          answer:
            "Ja. Hotelzimmer und Suiten sind auf Anfrage möglich, ebenso Termine außerhalb der üblichen Zeiten. Bitte geben Sie bei der Anfrage Hotel, Zimmernummer und Ihren Wunschtermin an, damit ich mich an der Rezeption anmelden kann.",
        },
        {
          _key: "faq-5",
          question: "Welche Massage bekomme ich beim Hausbesuch?",
          answer:
            "Dieselbe Arbeit wie in der Praxis: klassische Massage, Heilmassage-Techniken und gezielte Behandlung von Verspannungen — abgestimmt auf das, was Ihr Körper an diesem Tag braucht. Nur Anwendungen mit Geräten sind zu Hause nicht möglich.",
        },
        {
          _key: "faq-6",
          question: "Wie kurzfristig kann ich einen Hausbesuch buchen?",
          answer:
            "In den Innenbezirken geht oft noch etwas am selben oder am nächsten Tag. Für Wunschtermine am Abend oder am Wochenende melden Sie sich am besten ein paar Tage vorher.",
        },
        {
          _key: "faq-7",
          question: "Zahlt die Krankenkasse eine mobile Massage?",
          answer:
            "Ein Hausbesuch wird als private Leistung abgerechnet und von den gesetzlichen Kassen nicht erstattet. Wenn Ihnen eine Rückerstattung wichtig ist, ist die Heilmassage mit ärztlicher Verordnung in der Praxis der passendere Weg — Details dazu auf der Preise-Seite.",
        },
      ],
      group: "faqs",
    }),

    // ── CTA ───────────────────────────────────────────────────
    defineField({
      name: "ctaHeading",
      title: "CTA — Überschrift",
      type: "string",
      initialValue: "Entspannung kommt zu Ihnen",
      group: "cta",
    }),
    defineField({
      name: "ctaText",
      title: "CTA — Text",
      type: "text",
      rows: 2,
      initialValue:
        "Termin online anfragen oder direkt anrufen — sagen Sie mir Adresse und Wunschzeit, den Rest übernehme ich.",
      group: "cta",
    }),
  ],
  groups: [
    { name: "hero", title: "Hero" },
    { name: "price", title: "Preis" },
    { name: "included", title: "Ausstattung" },
    { name: "forWhom", title: "Für wen" },
    { name: "process", title: "Ablauf" },
    { name: "vip", title: "Hotel & VIP" },
    { name: "socialProof", title: "Social Proof" },
    { name: "area", title: "Einzugsgebiet" },
    { name: "faqs", title: "FAQs" },
    { name: "cta", title: "CTA" },
  ],
  preview: {
    prepare: () => ({ title: "Mobile Massage Wien" }),
  },
});
