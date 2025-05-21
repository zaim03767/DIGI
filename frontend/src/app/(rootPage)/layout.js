import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/footer";

export default function WithHeaderFooterLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
