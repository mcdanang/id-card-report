import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

export default function ReportForm() {
  const [idNumber, setIdNumber] = useState("");
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [idNumberError, setIdNumberError] = useState("");
  const { toast } = useToast();

  const validateIdNumber = (value) => {
    if (!/^\d{16}$/.test(value)) {
      setIdNumberError("Nomor KTP harus terdiri dari 16 digit angka");
      return false;
    }
    setIdNumberError("");
    return true;
  };

  const handleIdNumberChange = (e) => {
    const value = e.target.value;
    setIdNumber(value);
    if (value.length === 16) {
      validateIdNumber(value);
    } else {
      setIdNumberError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateIdNumber(idNumber)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/submit-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idNumber, name, details }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Laporan Berhasil",
          description: "Laporan Anda telah berhasil disubmit.",
          variant: "success",
        });
        setIdNumber("");
        setName("");
        setDetails("");
      } else {
        throw new Error(data.error || "Terjadi kesalahan saat submit laporan");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="idNumber">Nomor KTP</Label>
        <p className="text-xs text-slate-500">
          Nomor KTP Anda akan diubah menjadi kode unik yang aman sebelum
          disimpan di sistem kami. Kami tidak menyimpan nomor KTP Anda secara
          langsung, sehingga privasi Anda tetap terjaga.
        </p>
        <Input
          id="idNumber"
          type="number"
          placeholder="Masukkan 16 digit Nomor KTP"
          value={idNumber}
          onChange={handleIdNumberChange}
          onInput={(e) => {
            if (e.target.value.length > 16) {
              e.target.value = e.target.value.slice(0, 16);
            }
          }}
          required
        />
        {idNumberError && (
          <p className="text-red-500 text-sm">{idNumberError}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Nama</Label>
        <Input
          id="name"
          type="text"
          placeholder="Masukkan nama lengkap"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="details">Detail Laporan</Label>
        <Textarea
          id="details"
          placeholder="Tuliskan detail laporan Anda"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          required
        />
      </div>

      <Button type="submit" disabled={isSubmitting || !!idNumberError}>
        {isSubmitting ? "Mengirim..." : "Kirim Laporan"}
      </Button>
    </form>
  );
}
