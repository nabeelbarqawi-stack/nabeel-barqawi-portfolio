import Nav from "@/components/Nav";
import Programs from "@/components/Programs";
import Footer from "@/components/Footer";

export const revalidate = 60;

export const metadata = {
  title: "Programs — Nabeel Barqawi",
  description: "Single sessions, a 5-week program, and corporate workshops — pick the outcome, not the format.",
};

export default function ProgramsPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Programs />
      </main>
      <Footer />
    </>
  );
}
