import { useState, useEffect } from 'react'
import { Header } from "@/components/layout/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/custom-button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, FileText, DollarSign, Search, Plus, Eye, Edit, Bell } from "lucide-react"
import { AddClientModal } from "@/components/notary/AddClientModal"
import { AddWorksheetModal } from "@/components/notary/AddWorksheetModal"
import { AddInvoiceModal } from "@/components/notary/AddInvoiceModal"
import { useNavigate } from "react-router-dom"

// Sample data untuk klien notaris
const notaryClients = [
  {
    id: "1",
    nama: "PT. Maju Jaya",
    tipe: "Badan Hukum",
    email: "info@majujaya.com",
    telepon: "021-123456",
    status: "Active",
    layanan: "Akta Pendirian PT"
  },
  {
    id: "2", 
    nama: "John Doe",
    tipe: "Individu",
    email: "john.doe@email.com",
    telepon: "0812-3456789",
    status: "Active",
    layanan: "Surat Kuasa"
  },
  {
    id: "3",
    nama: "CV. Berkah Abadi",
    tipe: "Badan Hukum", 
    email: "cv.berkah@email.com",
    telepon: "021-987654",
    status: "Inactive",
    layanan: "Akta Jual Beli"
  }
]

// Sample data untuk lembar kerja
const worksheets = [
  {
    id: "LK-001",
    judul: "Akta Pendirian PT Maju Jaya",
    klien: "PT. Maju Jaya",
    jenisLayanan: "Akta Pendirian PT",
    status: "In Progress",
    deadline: "2024-02-15",
    progress: 65
  },
  {
    id: "LK-002",
    judul: "Surat Kuasa John Doe",
    klien: "John Doe",
    jenisLayanan: "Surat Kuasa",
    status: "Completed",
    deadline: "2024-01-30",
    progress: 100
  },
  {
    id: "LK-003",
    judul: "Akta Jual Beli CV Berkah",
    klien: "CV. Berkah Abadi",
    jenisLayanan: "Akta Jual Beli",
    status: "Review",
    deadline: "2024-02-20",
    progress: 85
  }
]

// Sample data untuk keuangan
const finances = [
  {
    id: "1",
    invoice: "INV-001",
    klien: "PT. Maju Jaya",
    layanan: "Akta Pendirian PT",
    jumlah: 5000000,
    status: "Paid",
    tanggal: "2024-01-15"
  },
  {
    id: "2",
    invoice: "INV-002", 
    klien: "John Doe",
    layanan: "Surat Kuasa",
    jumlah: 500000,
    status: "Pending",
    tanggal: "2024-01-20"
  },
  {
    id: "3",
    invoice: "INV-003",
    klien: "CV. Berkah Abadi", 
    layanan: "Akta Jual Beli",
    jumlah: 3000000,
    status: "Overdue",
    tanggal: "2024-01-10"
  }
]

export function NotaryPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('klien')
  const [showClientModal, setShowClientModal] = useState(false)
  const [showWorksheetModal, setShowWorksheetModal] = useState(false)
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      'Active': 'default',
      'Inactive': 'secondary',
      'In Progress': 'default', 
      'Completed': 'outline',
      'Review': 'secondary',
      'Paid': 'outline',
      'Pending': 'secondary',
      'Overdue': 'destructive'
    }
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>
  }

  const handleEyeClick = (id: string) => {
    console.log(`View worksheet with id: ${id}`)
    navigate(`/worksheet/${id}`);
  }

  const handleEditClick = (id: string) => {
    console.log(`Edit worksheet with id: ${id}`)
    navigate(`/worksheet/edit/${id}`);
  }

  const handleNotify = (id: string) => {
    console.log(`Notify for worksheet with id: ${id}`)
    // Implementasi logika notifikasi di sini
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Layanan Notaris
          </h2>
          <p className="text-muted-foreground">
            Kelola klien, lembar kerja, dan keuangan notaris
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="klien" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Klien
            </TabsTrigger>
            <TabsTrigger value="lembar-kerja" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Lembar Kerja
            </TabsTrigger>
            <TabsTrigger value="keuangan" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Keuangan
            </TabsTrigger>
          </TabsList>

          {/* Tab Klien */}
          <TabsContent value="klien" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Daftar Klien Notaris</CardTitle>
                  <Button onClick={() => setShowClientModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Klien
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Cari klien..."
                      value={searchTerm}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama</TableHead>
                      <TableHead>Tipe</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Telepon</TableHead>
                      <TableHead>Layanan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notaryClients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell>{client.nama}</TableCell>
                        <TableCell>{client.tipe}</TableCell>
                        <TableCell>{client.email}</TableCell>
                        <TableCell>{client.telepon}</TableCell>
                        <TableCell>{client.layanan}</TableCell>
                        <TableCell>{getStatusBadge(client.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Lembar Kerja */}
          <TabsContent value="lembar-kerja" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Lembar Kerja Notaris</CardTitle>
                  <Button onClick={() => setShowWorksheetModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Buat Lembar Kerja
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Cari lembar kerja..."
                      value={searchTerm}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Layanan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Layanan</SelectItem>
                      <SelectItem value="notaril">Notaril</SelectItem>
                      <SelectItem value="ppat">PPAT</SelectItem>
                      <SelectItem value="syariah">Syariah</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sub Layanan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Sub Layanan</SelectItem>
                      <SelectItem value="akta">Akta</SelectItem>
                      <SelectItem value="sertifikat">Sertifikat</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Jenis Pelanggan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Jenis</SelectItem>
                      <SelectItem value="individu">Individu</SelectItem>
                      <SelectItem value="perusahaan">Perusahaan</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tgl Dibuat" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Tanggal</SelectItem>
                      <SelectItem value="today">Hari Ini</SelectItem>
                      <SelectItem value="this-week">Minggu Ini</SelectItem>
                      <SelectItem value="this-month">Bulan Ini</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Judul</TableHead>
                      <TableHead>Klien</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {worksheets.map((worksheet) => (
                      <TableRow key={worksheet.id}>
                        <TableCell>{worksheet.judul}</TableCell>
                        <TableCell>{worksheet.klien}</TableCell>
                        <TableCell>{getStatusBadge(worksheet.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${worksheet.progress}%` }}
                              />
                            </div>
                            <span className="text-sm">{worksheet.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(worksheet.deadline).toLocaleDateString('id-ID')}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEyeClick(worksheet.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditClick(worksheet.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleNotify(worksheet.id)}
                            >
                              <Bell className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Keuangan */}
          <TabsContent value="keuangan" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Keuangan Notaris</CardTitle>
                  <Button onClick={() => setShowInvoiceModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Invoice
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Cari transaksi..."
                      value={searchTerm}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Klien</TableHead>
                      <TableHead>Layanan</TableHead>
                      <TableHead>Jumlah</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {finances.map((finance) => (
                      <TableRow key={finance.id}>
                        <TableCell>{finance.invoice}</TableCell>
                        <TableCell>{finance.klien}</TableCell>
                        <TableCell>{finance.layanan}</TableCell>
                        <TableCell>{formatCurrency(finance.jumlah)}</TableCell>
                        <TableCell>{getStatusBadge(finance.status)}</TableCell>
                        <TableCell>{new Date(finance.tanggal).toLocaleDateString('id-ID')}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Modals */}
      <AddClientModal 
        open={showClientModal} 
        onOpenChange={setShowClientModal} 
      />
      <AddWorksheetModal 
        open={showWorksheetModal} 
        onOpenChange={setShowWorksheetModal} 
      />
      <AddInvoiceModal 
        open={showInvoiceModal} 
        onOpenChange={setShowInvoiceModal} 
      />
    </div>
  )
}