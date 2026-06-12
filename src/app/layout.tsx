import type { Metadata } from "next";
import { Poppins, Comfortaa, Oswald, Marcellus } from "next/font/google";
import { clashDisplay } from "./utils/fonts";
import "./globals.css";
import "./box-model.css";
import "./home.css";
import "./blog-model.css";
import Footer from "./ui/footer/footer";

//

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins", // For variable fonts
  weight: ["300", "400", "700", "800", "900"],
});
const marcellus = Marcellus({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-marcellus", // For variable fonts
  weight: ["400"],
});

const comfortaa = Comfortaa({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-comfortaa", // For variable fonts
  weight: ["300", "400", "500", "600", "700"],
});
const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald", // For variable fonts
  weight: ["300", "400", "500", "600", "700"],
});
export const metadata: Metadata = {
  metadataBase: new URL("https://www.higorgeous.co.uk"),
  title: "High Quality Skin Care Products with Science-Backed Performance",
  description:
    "Formulated in a controlled environment with safe  ingredients and latest skin care innovation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable}
         ${comfortaa.variable} 
         ${clashDisplay.variable} 
         ${oswald.variable}
         ${marcellus.variable}  antialiased`}
      >
        <main className="page-main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
