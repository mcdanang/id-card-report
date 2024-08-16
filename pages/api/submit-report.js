import prisma from "../../lib/prisma";
import crypto from "crypto";
import sanitizeHtml from "sanitize-html";

// Use a secret key for HMAC
const SECRET_KEY = process.env.HMAC_SECRET_KEY || "your-secret-key";

// Function to hash the ID number using HMAC
function hashIdNumber(idNumber) {
  return crypto.createHmac("sha256", SECRET_KEY).update(idNumber).digest("hex");
}

// Simple in-memory rate limiter
const rateLimit = {};
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;

function rateLimiter(ip) {
  const now = Date.now();

  if (!rateLimit[ip]) {
    rateLimit[ip] = {
      count: 1,
      startTime: now,
    };
  } else {
    const { count, startTime } = rateLimit[ip];

    if (now - startTime < RATE_LIMIT_WINDOW) {
      if (count >= RATE_LIMIT_MAX_REQUESTS) {
        return false; // Rate limit exceeded
      }
      rateLimit[ip].count += 1;
    } else {
      // Reset rate limit window
      rateLimit[ip] = {
        count: 1,
        startTime: now,
      };
    }
  }

  return true;
}

export default async function handler(req, res) {
  const clientIp =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  if (!rateLimiter(clientIp)) {
    return res.status(429).json({
      error:
        "Terlalu banyak percobaan dalam waktu singkat. Silakan coba lagi nanti.",
    });
  }

  if (req.method === "POST") {
    const { idNumber, name, details } = req.body;

    if (!/^\d{16}$/.test(idNumber)) {
      return res
        .status(400)
        .json({ error: "Nomor KTP harus terdiri dari 16 digit angka" });
    }

    if (!name || !details) {
      return res
        .status(400)
        .json({ error: "Nama dan detail laporan tidak boleh kosong" });
    }

    // Sanitize input to prevent XSS and other injection attacks
    const sanitizedDetails = sanitizeHtml(details, {
      allowedTags: [],
      allowedAttributes: {},
    });

    const sanitizedName = sanitizeHtml(name, {
      allowedTags: [],
      allowedAttributes: {},
    });

    const hashedIdNumber = hashIdNumber(idNumber);

    try {
      const existingReport = await prisma.report.findUnique({
        where: { hashedIdNumber },
      });

      if (existingReport) {
        return res.status(400).json({ error: "Gagal mengirim laporan" });
      }

      const report = await prisma.report.create({
        data: {
          hashedIdNumber,
          name: sanitizedName,
          details: sanitizedDetails,
        },
      });
      res.status(200).json(report);
    } catch (error) {
      console.error("Error creating report:", error);
      res.status(500).json({
        error:
          "Terjadi kesalahan saat mengirim laporan. Silakan coba lagi nanti.",
      });
    }
  } else {
    res.status(405).json({ error: "Metode tidak diizinkan" });
  }
}
