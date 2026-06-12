import React from "react";
import SiteHeader from "@/app/ui/header/SiteHeader";

//
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="page-main">
      <SiteHeader />
      <section className="page-container">{children}</section>
    </main>
  );
}
