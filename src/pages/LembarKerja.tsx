// src/pages/LembarKerja.tsx
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/custom-button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Search, Plus, Eye, Edit, Trash2, Download, Calendar, User, Bell } from "lucide-react"
import { worksheetData } from "../lib/worksheetData"

export default function LembarKerja() {
  const navigate = useNavigate()
  const [data, setData] = useState(worksheetData)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"judul" | "klien" | "deadline" | "tanggalDibuat">("tanggalDibuat")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const getProgressColor = (progress: number) => {
    if (progress < 30) return "bg-red-500"
    if (progress < 70) return "bg-yellow-500"
    return "bg-green-500"
  }

  const handleSort = (field: "judul" | "klien" | "deadline" | "tanggalDibuat") => {
    if (sortBy === field) setSortOrder(prev => (prev === "asc" ? "desc" : "asc"))
    else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  const filteredData = useMemo(() => {
    const q = searchTerm.toLowerCase()
    return data
      .filter(item =>
        item.judul.toLowerCase().includes(q) ||
        item.klien.toLowerCase().includes(q) ||
        item.jenisLayanan.toLowerCase().includes(q)
      )
      .sort((a: any, b: any) => {
        const aValue = a[sortBy]
        const bValue = b[sortBy]
        if (sortOrder === "asc") return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      })
  }, [data, searchTerm, sortBy, sortOrder])

  const handleView = (id: string) => navigate(`/worksheet/${id}`)
  const handleEdit = (id: string) => {
    navigate(`/worksheet/edit/${id}`)
  }
  const handleAskDelete = (id: string) => {
    setSelectedId(id)
    setConfirmOpen(true)
  }
  const handleConfirmDelete = () => {
    if (selectedId) setData(prev => prev.filter(w => w.id !== selectedId))
    setConfirmOpen(false)
    setSelectedId(null)
  }
  const handleNotify = (id: string) => {
    // Implementasi logika notifikasi di sini
    console.log(`Notifikasi untuk worksheet ID: ${id}`)
  }

  // Summary non-status agar selaras dengan UI yang ringkas
  const total = data.length
  const selesai = data.filter(w => w.progress === 100).length
  const rata2Progress = Math.round(data.reduce((acc, w) => acc + w.progress, 0) / Math.max(1, data.length))
  const mendekatiDeadline = data.filter(w => {
    const now = new Date()
    const d = new Date(w.deadline)
    const diff = (d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    return diff >= 0 && diff <= 7
  }).length

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">Master Lembar Kerja</CardTitle>
              <p className="text-muted-foreground mt-1">
                Kelola seluruh lembar kerja notaris secara terpusat
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button onClick={() => navigate("/worksheet/new")}>
                <Plus className="h-4 w-4 mr-2" />
                Buat Lembar Kerja
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Pencarian */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari berdasarkan judul, klien, atau jenis layanan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Summary non-status */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm font-medium">Total Lembar Kerja</p>
                <p className="text-2xl font-bold">{total}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm font-medium">Selesai</p>
                <p className="text-2xl font-bold">{selesai}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm font-medium">Rata-rata Progress</p>
                <p className="text-2xl font-bold">{rata2Progress}%</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm font-medium">Mendekati Deadline (≤7 hari)</p>
                <p className="text-2xl font-bold">{mendekatiDeadline}</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabel utama */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50 min-w-[200px]"
                    onClick={() => handleSort("judul")}
                  >
                    Judul
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort("klien")}
                  >
                    <User className="h-4 w-4 inline mr-1" />
                    Klien
                  </TableHead>
                  <TableHead>Jenis Layanan</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort("deadline")}
                  >
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Deadline
                  </TableHead>
                  <TableHead className="w-[120px]">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((worksheet) => (
                  <TableRow key={worksheet.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div>
                        <p className="font-medium">{worksheet.judul}</p>
                        <p className="text-xs text-muted-foreground">
                          Dibuat: {new Date(worksheet.tanggalDibuat).toLocaleDateString("id-ID")}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{worksheet.klien}</TableCell>
                    <TableCell>{worksheet.jenisLayanan}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getProgressColor(worksheet.progress)}`}
                            style={{ width: `${worksheet.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{worksheet.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {new Date(worksheet.deadline).toLocaleDateString("id-ID")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Est: {new Date(worksheet.estimasiSelesai).toLocaleDateString("id-ID")}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleView(worksheet.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleEdit(worksheet.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleNotify(worksheet.id)}>
                          <Bell className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Info bawah */}
          <div className="flex items-center justify-between pt-4">
            <p className="text-sm text-muted-foreground">
              Menampilkan {filteredData.length} dari {data.length} lembar kerja
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Konfirmasi Hapus */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus lembar kerja?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan dan akan menghapus data dari daftar.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
