import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Search,
  Filter,
  Eye,
  Edit,
  MoreHorizontal
} from "lucide-react"

interface ServiceSummary {
  category: string
  active: number
  completed: number
  pending: number
  total: number
}

interface WorkStatus {
  id: string
  serviceName: string
  serviceType: "Notaril" | "PPAT" | "Syariah"
  currentStatus: string
  pic: string
  itemCount: number
}

const serviceSummaryData: ServiceSummary[] = [
  { category: "Notaril", active: 12, completed: 45, pending: 8, total: 65 },
  { category: "Syariah", active: 5, completed: 23, pending: 3, total: 31 },
  { category: "PPAT", active: 8, completed: 18, pending: 4, total: 30 }
]

const workStatusData: WorkStatus[] = [
  {
    id: "1",
    serviceName: "Akta Jual Beli Tanah",
    serviceType: "PPAT",
    currentStatus: "Pengumpulan Dokumen",
    pic: "Ahmad Rizki",
    itemCount: 3
  },
  {
    id: "2", 
    serviceName: "Akta Pendirian PT",
    serviceType: "Notaril",
    currentStatus: "Penyusunan Draf",
    pic: "Siti Nurhaliza",
    itemCount: 5
  },
  {
    id: "3",
    serviceName: "Sertifikat Wakaf",
    serviceType: "Syariah", 
    currentStatus: "Ditandatangani",
    pic: "Muhammad Fadli",
    itemCount: 2
  },
  {
    id: "4",
    serviceName: "Akta Hibah",
    serviceType: "Notaril",
    currentStatus: "Diajukan ke Kemenkumham",
    pic: "Indira Sari",
    itemCount: 1
  }
]

export function BerandaSimanis() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredWork = workStatusData.filter(work => {
    const matchesSearch = work.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         work.pic.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || work.serviceType === filterType
    const matchesStatus = filterStatus === "all" || work.currentStatus === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Penyusunan Draf": return "bg-warning/20 text-warning-foreground"
      case "Pengumpulan Dokumen": return "bg-info/20 text-info-foreground" 
      case "Ditandatangani": return "bg-success/20 text-success-foreground"
      case "Diajukan ke Kemenkumham": return "bg-primary/20 text-primary-foreground"
      case "Diajukan ke BPN": return "bg-primary/20 text-primary-foreground"
      case "Selesai": return "bg-success/20 text-success-foreground"
      default: return "bg-muted/20 text-muted-foreground"
    }
  }


  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 beranda-simanis-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Beranda SIMANIS</h1>
          <p className="text-muted-foreground">Ringkasan layanan dan pekerjaan sistem notaris</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Super Admin</span>
        </div>
      </div>

      {/* Layanan Aktif Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Layanan Aktif</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {serviceSummaryData.map((service) => (
            <Card key={service.category} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {service.category}
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{service.active}</div>
                <p className="text-xs text-muted-foreground">
                  Aktif dari {service.total} total layanan
                </p>
                <div className="mt-3 flex justify-between text-xs">
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-3 w-3 text-success" />
                    <span>Selesai: {service.completed}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-3 w-3 text-warning" />
                    <span>Pending: {service.pending}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Status Pekerjaan per Layanan Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Status Pekerjaan per Layanan</h2>
          <Button variant="outline" size="sm">
            Lihat Semua
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari layanan atau PIC..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Jenis Layanan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Jenis</SelectItem>
                  <SelectItem value="Notaril">Notaril</SelectItem>
                  <SelectItem value="PPAT">PPAT</SelectItem>
                  <SelectItem value="Syariah">Syariah</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="Penyusunan Draf">Penyusunan Draf</SelectItem>
                  <SelectItem value="Pengumpulan Dokumen">Pengumpulan Dokumen</SelectItem>
                  <SelectItem value="Ditandatangani">Ditandatangani</SelectItem>
                  <SelectItem value="Diajukan ke Kemenkumham">Diajukan ke Kemenkumham</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Layanan</TableHead>
                  <TableHead>Jenis</TableHead>
                  <TableHead>PIC</TableHead>
                  <TableHead>Jumlah Item</TableHead>
                  <TableHead className="w-32">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWork.map((work) => (
                  <TableRow key={work.id}>
                    <TableCell>{work.serviceName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {work.serviceType}
                      </Badge>
                    </TableCell>
                    <TableCell>{work.pic}</TableCell>
                    <TableCell className="text-center">{work.itemCount}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}