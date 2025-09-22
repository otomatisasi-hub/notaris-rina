import { useState, useEffect } from 'react'
import { Header } from "@/components/layout/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/custom-button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, FileText, DollarSign, Search, Plus, Eye, Edit, Trash2, Bell } from "lucide-react"
import { AddClientModal } from "@/components/syariah/AddClientModal"
import { AddWorksheetModal } from "@/components/syariah/AddWorksheetModal"
import { AddInvoiceModal } from "@/components/syariah/AddInvoiceModal"

// Sample data untuk klien syariah
const syariahClients = [
  {
    id: "1",
    nama: "PT. Halal Sejahtera",
    tipe: "Badan Hukum",
    email: "info@halalsejahtera.com",
    telepon: "021-234567",
    status: "Active",
    layanan: "Akad Murabahah"
  },
  {
    id: "2", 
    nama: "Ahmad Fauzi",
    tipe: "Individu",
    email: "ahmad.fauzi@email.com",
    telepon: "0813-4567890",
    status: "Active",
    layanan: "Wakaf Properti"
  },
  {
    id: "3",
    nama: "CV. Berkah Syariah",
    tipe: "Badan Hukum", 
    email: "cv.berkahsyariah@email.com",
    telepon: "021-876543",
    status: "Inactive",
    layanan: "Akad Mudharabah"
  }
]

// Sample data untuk lembar kerja
const worksheets = [
  {
    id: "1",
    judul: "Akad Murabahah PT Halal Sejahtera",
    klien: "PT. Halal Sejahtera",
    status: "In Progress",
    deadline: "2024-02-15",
    progress: 70
  },
  {
    id: "2",
    judul: "Wakaf Properti Ahmad Fauzi", 
    klien: "Ahmad Fauzi",
    status: "Completed",
    deadline: "2024-01-30",
    progress: 100
  },
  {
    id: "3",
    judul: "Akad Mudharabah CV Berkah",
    klien: "CV. Berkah Syariah",
    status: "Review",
    deadline: "2024-02-20",
    progress: 80
  }
]

// Sample data untuk keuangan
const finances = [
  {
    id: "1",
    invoice: "SYR-001",
    klien: "PT. Halal Sejahtera",
    layanan: "Akad Murabahah",
    jumlah: 7500000,
    status: "Paid",
    tanggal: "2024-01-15"
  },
  {
    id: "2",
    invoice: "SYR-002", 
    klien: "Ahmad Fauzi",
    layanan: "Wakaf Properti",
    jumlah: 2000000,
    status: "Pending",
    tanggal: "2024-01-20"
  },
  {
    id: "3",
    invoice: "SYR-003",
    klien: "CV. Berkah Syariah", 
    layanan: "Akad Mudharabah",
    jumlah: 5000000,
    status: "Overdue",
    tanggal: "2024-01-10"
  }
]

export function SyariahPage() {
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

  const handleNotify = (id: string) => {
    // Logic to handle notification
    alert(`Notifikasi untuk lembar kerja ID: ${id}`)
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Layanan Syariah
          </h2>
          <p className="text-muted-foreground">
            Kelola klien, lembar kerja, dan keuangan layanan syariah
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
                  <CardTitle>Daftar Klien Syariah</CardTitle>
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
                      onChange={(e) => setSearchTerm(e.target.value)}
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
                    {syariahClients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">{client.nama}</TableCell>
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
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
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
                  <CardTitle>Lembar Kerja Syariah</CardTitle>
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
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
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
                        <TableCell className="font-medium">{worksheet.judul}</TableCell>
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
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleNotify(worksheet.id)}>
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
                  <CardTitle>Keuangan Syariah</CardTitle>
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
                      onChange={(e) => setSearchTerm(e.target.value)}
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
                        <TableCell className="font-medium">{finance.invoice}</TableCell>
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
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
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