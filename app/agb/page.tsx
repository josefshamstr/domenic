import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { getSettings } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "AGB | Heilmasseur Domenic Hacker",
  description:
    "Allgemeine Geschäftsbedingungen der Praxis Domenic Hacker, Heilmasseur in Wien 1080.",
  alternates: {
    canonical: "https://heilmasseur-domenic.at/agb",
  },
};

export default async function Agb() {
  const settings = await getSettings();

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-16 sm:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#0d4f4f] hover:underline mb-8"
        >
          <ArrowLeft size={16} />
          Zurück zur Startseite
        </Link>

        <h1 className="text-4xl font-extrabold text-[#111] mb-2">AGB</h1>
        <p className="text-lg font-semibold text-[#555] mb-8">
          Allgemeine Geschäftsbedingungen
        </p>

        <div className="mb-10 rounded-2xl border border-[#f2a93b]/40 bg-[#f2a93b]/10 px-5 py-4 text-sm text-[#333] leading-relaxed">
          <p className="font-bold text-[#111]">Entwurf — zur Prüfung durch die Praxis</p>
          <p className="mt-1">
            Dieser Text ist ein klarer Arbeitsentwurf für Domenic Hacker. Er ist
            noch nicht rechtsverbindlich und ersetzt keine anwaltliche Prüfung.
            Fristen, Beträge und Verrechnungsregeln bitte vor Veröffentlichung
            bestätigen.
          </p>
        </div>

        <div className="prose prose-gray max-w-none space-y-6 text-[#333] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              1. Geltungsbereich
            </h2>
            <p>
              Diese Allgemeinen Geschäftsbedingungen gelten für Behandlungen und
              Termine in der Praxis:
            </p>
            <p className="mt-3">
              <strong>Domenic Hacker</strong>
              <br />
              Diplomierter Heilmasseur
              <br />
              Feldgasse 3/20
              <br />
              1080 Wien
            </p>
            <p className="mt-3">
              Sie gelten für alle über die Website, telefonisch oder persönlich
              vereinbarten Termine, soweit nichts anderes schriftlich vereinbart
              ist.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              2. Termine
            </h2>
            <p>
              Termine werden nach Vereinbarung vergeben, in der Regel über die
              Online-Buchung. Ein Termin gilt als vereinbart, sobald er bestätigt
              wurde. Bitte erscheinen Sie pünktlich, damit die volle
              Behandlungszeit zur Verfügung steht.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              3. Terminabsage
            </h2>
            <p>
              Bitte sagen Sie Termine so früh wie möglich ab, damit der Platz
              anderen Klientinnen und Klienten angeboten werden kann.
            </p>
            <p className="mt-3">
              <strong>Platzhalter — 24-Stunden-Frist (Entwurf):</strong> Absagen
              bis 24 Stunden vor dem Termin sind kostenfrei möglich.
            </p>
            <p className="mt-3">
              Bei Nichterscheinen (No-Show) oder kurzfristiger Absage innerhalb
              dieser Frist kann die vereinbarte Behandlung in Rechnung gestellt
              werden.
            </p>
            <p className="mt-3 text-sm text-[#555]">
              Entwurf: Die genaue Frist und ob/wie viel verrechnet wird, legt
              die Praxis fest. Das ist keine feststehende Rechtsregel.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              4. Zahlung
            </h2>
            <p>
              Das Honorar ist nach der Behandlung fällig, sofern nichts anderes
              vereinbart ist. Es gelten die jeweils aktuellen Preise auf der
              Website. Gutscheine werden gemäß den Angaben beim Kauf
              eingelöst.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              5. Haftung
            </h2>
            <p>
              Die Behandlung erfolgt nach bestem Wissen und Gewissen. Bitte
              teilen Sie vor der Behandlung relevante gesundheitliche Angaben
              mit (z.&nbsp;B. Schmerzen, Unverträglichkeiten, ärztliche Vorgaben).
            </p>
            <p className="mt-3">
              Für Schäden, die auf unvollständige oder unrichtige Angaben
              zurückgehen, wird — soweit gesetzlich zulässig — keine Haftung
              übernommen. Die gesetzliche Haftung für Vorsatz und grobe
              Fahrlässigkeit bleibt unberührt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              6. Keine Heilversprechen
            </h2>
            <p>
              Heilmassage und verwandte Anwendungen ersetzen keine ärztliche
              Diagnose, Behandlung oder Therapie. Es werden keine medizinischen
              Heilversprechen abgegeben.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              7. Schlussbestimmungen
            </h2>
            <p>
              Es gilt österreichisches Recht. Sollten einzelne Bestimmungen
              unwirksam sein, bleibt der übrige Text wirksam.
            </p>
            <p className="mt-3">
              Fragen zu diesen AGB:{" "}
              <a
                href="mailto:praxis@heilmasseur-domenic.at"
                className="text-[#0d4f4f] hover:underline"
              >
                praxis@heilmasseur-domenic.at
              </a>
            </p>
          </section>
        </div>
      </div>
      <Footer sanitySettings={settings} />
    </div>
  );
}
