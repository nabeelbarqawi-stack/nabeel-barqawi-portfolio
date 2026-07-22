"use client";

import { usePathname } from "next/navigation";
import Nav from "./Nav";
import Footer from "./Footer";
import ChatKitWidget from "./ChatKitWidget";
import SiteUIProvider from "./SiteUI";

/**
 * Renders the public marketing chrome (nav, footer, chat widget) around page
 * content — EXCEPT on the /admin portal, which is a self-contained app with its
 * own header and must not show the marketing nav/footer/chat bubble.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  if (isAdmin) {
    return <main id="main-content">{children}</main>;
  }

  return (
    <>
      <SiteUIProvider>
        <Nav />
        <main id="main-content">{children}</main>
        <Footer />
      </SiteUIProvider>
      <ChatKitWidget />
    </>
  );
}
