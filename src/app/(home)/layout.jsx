import Navbar from "@/components/HomeLayout/components/Navbar";
import Footer from "@/components/HomeLayout/components/Footer";

export default function HomeLayout({ children }) {
  return (
    <>
      <Navbar />

      <main>
        {children}
      </main>

      <Footer />
    </>
  );
}