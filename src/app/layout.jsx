import { Poppins } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/provider/NextAuthProvider";
import SmoothScroll from "@/components/reusable/SmoothScroll";
import ScrollToTop from "@/components/reusable/ScrollToTop";

export const metadata = {
  title: {
    default: "Care Io",
    template: "%s | Care Io",
  },
  description:
    "Find your perfect caregiver for your family, elderly, and more. We're here to make your life easier.",
};

const poppins = Poppins({
  weight: ["100", "300", "400", "500", "600", "800"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html className="scroll-smooth" lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        (function () {
          try {
            const saved = localStorage.getItem("theme");

            if (saved) {
              document.documentElement.setAttribute("data-theme", saved);
            } else {
              const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
              document.documentElement.setAttribute(
                "data-theme",
                systemDark ? "dark" : "light"
              );
            }
          } catch (e) {}
        })();
      `,
          }}
        />
      </head>

      <body className={poppins.className}>
        <NextAuthProvider>
          <SmoothScroll>
            {children}
            <ScrollToTop />
          </SmoothScroll>
        </NextAuthProvider>
      </body>
    </html>
  );
}