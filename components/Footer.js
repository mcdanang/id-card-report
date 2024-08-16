export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <p>
            &copy; {new Date().getFullYear()} Lapor Penyalahgunaan KTP. Hak
            Cipta Dilindungi.
          </p>
          <p className="mt-2 text-sm">
            Situs ini dibuat untuk melaporkan penggunaan KTP yang tidak sah
            dalam pemilihan Gubernur Jakarta. Kami berkomitmen untuk menjaga
            kerahasiaan data Anda.
          </p>
        </div>
      </div>
    </footer>
  );
}
