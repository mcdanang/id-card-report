import prisma from "../../lib/prisma";
import crypto from "crypto";

// Use a secret key for HMAC
const SECRET_KEY = process.env.HMAC_SECRET_KEY || "your-secret-key";

// Function to hash the ID number using HMAC
function hashIdNumber(idNumber) {
  return crypto.createHmac("sha256", SECRET_KEY).update(idNumber).digest("hex");
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { idNumber, name, details } = req.body;
    const hashedIdNumber = hashIdNumber(idNumber);

    try {
      const existingReport = await prisma.report.findUnique({
        where: { hashedIdNumber },
      });

      if (existingReport) {
        return res
          .status(400)
          .json({ error: "Nomor KTP ini sudah dilaporkan sebelumnya" });
      }

      const report = await prisma.report.create({
        data: { hashedIdNumber, name, details },
      });
      res.status(200).json(report);
    } catch (error) {
      res.status(500).json({ error: "Gagal mengirim laporan" });
    }
  } else {
    res.status(405).json({ error: "Metode tidak diizinkan" });
  }
}
