import type { Metadata } from "next";
import { VariantSwitcher } from "./_shared/VariantSwitcher";

export const metadata: Metadata = {
  title: "Labs · Mobile Massage – Design-Varianten",
  robots: { index: false, follow: false },
};

export default function LabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <VariantSwitcher />
    </>
  );
}
