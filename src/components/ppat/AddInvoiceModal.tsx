import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface AddInvoiceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddInvoiceModal({ open, onOpenChange }: AddInvoiceModalProps) {
  const [formData, setFormData] = useState({
    klien: '',
    layanan: '',
    jumlah: '',
    tanggalJatuhTempo: '',
    catatan: '',
    status: ''
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.klien || !formData.layanan || !formData.jumlah) {
      toast({
        title: "Error",
        description: "Klien, layanan, dan jumlah wajib diisi",
        variant: "destructive"
      })
      return
    }

    // Simulate API call
    console.log('Adding PPAT invoice:', formData)
    
    toast({
      title: "Berhasil",
      description: "Invoice PPAT berhasil dibuat",
    })
    
    // Reset form and close modal
    setFormData({
      klien: '',
      layanan: '',
      jumlah: '',
      tanggalJatuhTempo: '',
      catatan: '',
      status: ''
    })
    onOpenChange(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '')
    if (!numericValue) return ''
    
    return new Intl.NumberFormat('id-ID').format(parseInt(numericValue))
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '')
    setFormData(prev => ({
      ...prev,
      jumlah: rawValue
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Tambah Invoice PPAT Baru</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="klien">Klien *</Label>
              <Select value={formData.klien} onValueChange={(value) => handleInputChange('klien', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih klien" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PT. Properti Prima">PT. Properti Prima</SelectItem>
                  <SelectItem value="Siti Aminah">Siti Aminah</SelectItem>
                  <SelectItem value="CV. Tanah Investama">CV. Tanah Investama</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="layanan">Layanan *</Label>
              <Select value={formData.layanan} onValueChange={(value) => handleInputChange('layanan', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih layanan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Jual Beli Tanah">Jual Beli Tanah</SelectItem>
                  <SelectItem value="Balik Nama Sertifikat">Balik Nama Sertifikat</SelectItem>
                  <SelectItem value="Hibah Tanah">Hibah Tanah</SelectItem>
                  <SelectItem value="Pengikatan Jual Beli">Pengikatan Jual Beli</SelectItem>
                  <SelectItem value="Roya">Roya</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jumlah">Jumlah (IDR) *</Label>
              <Input
                id="jumlah"
                value={formatCurrency(formData.jumlah)}
                onChange={handleAmountChange}
                placeholder="0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tanggalJatuhTempo">Tanggal Jatuh Tempo</Label>
              <Input
                id="tanggalJatuhTempo"
                type="date"
                value={formData.tanggalJatuhTempo}
                onChange={(e) => handleInputChange('tanggalJatuhTempo', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="catatan">Catatan</Label>
            <Textarea
              id="catatan"
              value={formData.catatan}
              onChange={(e) => handleInputChange('catatan', e.target.value)}
              placeholder="Masukkan catatan tambahan"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
            <Button type="submit">
              Tambah Invoice
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}