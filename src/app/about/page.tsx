import Nav from "@/components/Nav";
import About from "@/components/About";
import SelectedWork from "@/components/SelectedWork";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About — Nabeel Barqawi",
  description: "Background, and the work behind the numbers — Disney and CarMax AI agents reaching millions of users.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <About />
        <SelectedWork />
      </main>
      <Footer />
    </>
  );
}
