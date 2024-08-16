import { useEffect, useState } from "react";

export default function ReportCounter() {
  const [count, setCount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch("/api/report-count");
        if (!response.ok) {
          throw new Error("Gagal mengambil data");
        }
        const data = await response.json();
        if (data.count !== count) {
          setCount(data.count);
        }
        setError(null);
      } catch (error) {
        console.error("Gagal mengambil jumlah laporan:", error);
        setError("Gagal memuat jumlah laporan");
      }
    };

    fetchCount();
    const intervalId = setInterval(fetchCount, 5000);

    return () => clearInterval(intervalId);
  }, [count]);

  if (error) {
    return <div className="mt-8 text-center text-red-600">{error}</div>;
  }

  if (count === null) {
    return <div className="mt-8 text-center">Memuat jumlah laporan...</div>;
  }

  return (
    <div className="mt-8 text-center">
      <h2 className="text-2xl font-bold">Total Laporan</h2>
      <p className="text-4xl font-bold text-blue-600">{count}</p>
    </div>
  );
}
