// pages/api/report-count.js
import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const count = await prisma.report.count();
      res.status(200).json({ count });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Gagal mengambil jumlah laporan" });
    }
  } else {
    res.status(405).json({ error: "Metode tidak diizinkan" });
  }
}
