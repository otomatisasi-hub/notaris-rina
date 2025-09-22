// src/pages/WorksheetDetail.tsx
import { useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/custom-button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft } from "lucide-react"
import { worksheetData } from "../lib/worksheetData"

const stepsByService: Record<string, { step: string; files?: string[]; actions?: string[] }[]> = {
  "Akta Pendirian PT": [
    { step: "Cek nama PT", files: ["Nama_PT_Checklist.pdf"] },
    { step: "Pembelian Voucher PNBP", actions: ["Beli voucher di website PNBP"] },
    { step: "Kumpulkan KTP & NPWP Direksi/Komisaris", files: ["KTP_Direksi.pdf", "NPWP_Direksi.pdf"] },
    { step: "Penyusunan & TTD Akta" },
    { step: "SK Kemenkumham terbit", files: ["SK_Kemenkumham.pdf"] },
    { step: "NIB diterbitkan (OSS)", actions: ["Ajukan NIB di OSS"] },
    { step: "Salinan Akta disiapkan" },
    { step: "Invoice & tanda terima dokumen" }
  ],
  "Akta Jual Beli": [
    { step: "Kumpulkan dokumen penjual & pembeli", files: ["Dokumen_Penjual.pdf", "Dokumen_Pembeli.pdf"] },
    { step: "Cek sertifikat & pajak (SPPT PBB, bukti lunas)", files: ["SPPT_PBB.pdf", "Bukti_Lunas.pdf"] },
    { step: "Penyusunan & TTD AJB" },
    { step: "Proses balik nama ke BPN", actions: ["Ajukan balik nama di BPN"] },
    { step: "Serahkan salinan & arsip" }
  ],
  "Surat Kuasa": [
    { step: "Kumpulkan KTP/KK/Surat Nikah (bila perlu)", files: ["KTP.pdf", "KK.pdf"] },
    { step: "Penyusunan draf & review" },
    { step: "Tanda tangan & legalisasi" },
    { step: "Serahkan salinan & arsip" }
  ]
}

export default function WorksheetDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const item = useMemo(() => worksheetData.find(w => w.id === id), [id])
  const steps = useMemo(() => {
    if (!item) return []
    return stepsByService[item.jenisLayanan] ?? [
      "Pengumpulan dokumen",
      "Penyusunan draf",
      "Review & perbaikan",
      "Tanda tangan",
      "Penyerahan salinan & arsip"
    ]
  }, [item])

  const [done, setDone] = useState<Record<number, boolean>>({})
  const completed = Object.values(done).filter(Boolean).length
  const progress = steps.length ? Math.round((completed / steps.length) * 100) : 0

  if (!item) {
    return (
      <div className="p-6">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />Kembali
        </Button>
        <p className="mt-4">Data tidak ditemukan.</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />Kembali
        </Button>
        <div className="text-sm text-muted-foreground">ID: {item.id}</div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{item.judul}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Klien: <span className="text-foreground">{item.klien}</span> · Jenis Layanan: <span className="text-foreground">{item.jenisLayanan}</span>
          </div>

          <div className="space-y-2">
            <p className="font-medium">Progress</p>
            <div className="flex items-center gap-4">
              <div className="flex-1 w-full bg-muted h-2 rounded-full relative">
                <div className="h-2 bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
                <div className="absolute top-1/2 left-0 w-full flex justify-between" style={{ transform: 'translateY(-50%)' }}>
                  {steps.map((_, idx) => (
                    <span
                      key={idx}
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer ${done[idx] ? 'bg-primary border-primary' : 'bg-white border-muted'} transition-all`}
                      onClick={() => setDone(prev => ({ ...prev, [idx]: !prev[idx] }))}
                      title={steps[idx]}
                    >
                      {done[idx] ? <span className="w-2 h-2 bg-white rounded-full" /> : null}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-sm text-muted-foreground">{progress}% selesai</span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-medium">Checklist Langkah</p>
            <ul className="space-y-2">
              {steps.map((s, idx) => (
                <li key={idx} className="flex flex-col gap-2">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={!!done[idx]}
                      onCheckedChange={(v: boolean) => setDone((prev) => ({ ...prev, [idx]: v }))}
                    />
                    <span>{s.step}</span>
                  </div>
                  {s.files && (
                    <div className="ml-8">
                      <p className="text-sm font-medium">Files:</p>
                      <ul className="list-disc pl-4">
                        {s.files.map((file, fileIdx) => (
                          <li key={fileIdx} className="text-sm text-muted-foreground">
                            <a href="#" className="text-primary underline">{file}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {s.actions && (
                    <div className="ml-8">
                      <p className="text-sm font-medium">Actions:</p>
                      <ul className="list-disc pl-4">
                        {s.actions.map((action, actionIdx) => (
                          <li key={actionIdx} className="text-sm text-muted-foreground">{action}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-2 pt-2">
            <Button onClick={() => navigate(`/worksheet/${item.id}/edit`)}>Edit</Button>
            <Button variant="outline" onClick={() => navigate("/worksheet")}>Kembali ke daftar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
