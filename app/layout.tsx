import type { Metadata } from "next";
import { Chakra_Petch, Orbitron, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { SystemProvider } from "@/components/providers/SystemProvider";
import { SiteHeader } from "@/components/system/SiteHeader";
import "./globals.css";

// Display / UI / títulos (sci-fi)
const chakra = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-chakra",
  display: "swap",
});

// Numérico (níveis, XP, ranks, scores)
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

// Corpo legível
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${chakra.variable} ${orbitron.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="bg-bg-base text-body flex min-h-full flex-col font-sans">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SiteHeader />
          {children}
          <SystemProvider />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
