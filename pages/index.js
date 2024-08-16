import Head from "next/head";
import Header from "../components/Header";
import ReportForm from "../components/ReportForm";
import ReportCounter from "../components/ReportCounter";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Lapor Penyalahgunaan KTP - Pemilihan Gubernur Jakarta</title>
        <meta
          name="description"
          content="Laporkan penggunaan KTP yang tidak sah untuk pemilihan Gubernur Jakarta"
        />
      </Head>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Form Pelaporan</h2>
        <ReportForm />
        <ReportCounter />
      </main>

      <Footer />
    </div>
  );
}
