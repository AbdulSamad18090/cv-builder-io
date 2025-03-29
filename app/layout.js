import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer/Footer";
import { Toaster } from "@/components/ui/sonner";
import SessionWrapper from "@/components/session-wrapper/SessionWrapper";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata = {
  title: "CV Builder",
  description: "Prfessional CV Builder",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <SessionWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Footer />
            <Toaster />
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
