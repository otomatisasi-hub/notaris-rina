import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface AddClientModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddClientModal({ open, onOpenChange }: AddClientModalProps) {
  const [formData, setFormData] = useState({
    nama: '',
    tipe: '',
    email: '',
    telepon: '',
    alamat: '',
    layanan: ''
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.nama || !formData.tipe || !formData.email) {
      toast({
        title: "Error",
        description: "Nama, tipe klien, dan email wajib diisi",
        variant: "destructive"
      })
      return
    }

    // Simulate API call
    console.log('Adding syariah client:', formData)
    
    toast({
      title: "Berhasil",
      description: "Klien syariah berhasil ditambahkan",
    })
    
    // Reset form and close modal
    setFormData({
      nama: '',
      tipe: '',
      email: '',
      telepon: '',
      alamat: '',
      layanan: ''
    })
    onOpenChange(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Tambah Klien Syariah Baru</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nama">Nama Klien *</Label>
              <Input
                id="nama"
                value={formData.nama}
                onChange={(e) => handleInputChange('nama', e.target.value)}
                placeholder="Masukkan nama klien"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tipe">Tipe Klien *</Label>
              <Select value={formData.tipe} onValueChange={(value) => handleInputChange('tipe', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tipe klien" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Individu">Individu</SelectItem>
                  <SelectItem value="Badan Hukum">Badan Hukum</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Masukkan email"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="telepon">Telepon</Label>
              <Input
                id="telepon"
                value={formData.telepon}
                onChange={(e) => handleInputChange('telepon', e.target.value)}
                placeholder="Masukkan nomor telepon"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="alamat">Alamat</Label>
            <Textarea
              id="alamat"
              value={formData.alamat}
              onChange={(e) => handleInputChange('alamat', e.target.value)}
              placeholder="Masukkan alamat lengkap"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="layanan">Layanan yang Diminta</Label>
            <Select value={formData.layanan} onValueChange={(value) => handleInputChange('layanan', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih jenis layanan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Akad Murabahah">Akad Murabahah</SelectItem>
                <SelectItem value="Akad Mudharabah">Akad Mudharabah</SelectItem>
                <SelectItem value="Akad Musyarakah">Akad Musyarakah</SelectItem>
                <SelectItem value="Wakaf Properti">Wakaf Properti</SelectItem>
                <SelectItem value="Hibah Syariah">Hibah Syariah</SelectItem>
                <SelectItem value="Lainnya">Lainnya</SelectItem>
              </SelectContent>
            </Select>
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
              Tambah Klien
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}