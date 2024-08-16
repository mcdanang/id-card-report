export default function Footer() {
  return (
    <footer className="bg-gray-100 text-slate-400">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Lapor Penyalahgunaan KTP. Hak
            Cipta Dilindungi.
          </p>
          <p className="mt-2 text-sm">
            Situs ini dibuat untuk melaporkan penggunaan KTP yang tidak sah
            dalam pemilihan Gubernur Jakarta. Kami berkomitmen untuk menjaga
            kerahasiaan data Anda.
          </p>
          <p className="mt-2 text-sm">
            Bantu kontribusi di proyek open source{" "}
            <a
              href="https://github.com/mcdanang/id-card-report"
              target="_blank"
              className="text-blue-400"
            >
              Github
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
