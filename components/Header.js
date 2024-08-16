import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-slate-600 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold">Lapor Penyalahgunaan KTP</h1>
            <p className="text-sm mt-1">Pemilihan Gubernur Jakarta</p>
          </div>
          <nav>
            <Button variant="outline" asChild>
              <Link
                href="https://infopemilu.kpu.go.id/Pemilihan/cek_pendukung"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500"
              >
                Cek Penggunaan KTP di Situs KPU
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
