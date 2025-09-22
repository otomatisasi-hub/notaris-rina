import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface AddWorksheetModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddWorksheetModal({ open, onOpenChange }: AddWorksheetModalProps) {
  const [formData, setFormData] = useState({
    judul: '',
    klien: '',
    jenisAkad: '',
    deadline: '',
    deskripsi: '',
    prioritas: ''
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.judul || !formData.klien || !formData.jenisAkad) {
      toast({
        title: "Error",
        description: "Judul, klien, dan jenis akad wajib diisi",
        variant: "destructive"
      })
      return
    }

    // Simulate API call
    console.log('Adding syariah worksheet:', formData)
    
    toast({
      title: "Berhasil",
      description: "Lembar kerja syariah berhasil dibuat",
    })
    
    // Reset form and close modal
    setFormData({
      judul: '',
      klien: '',
      jenisAkad: '',
      deadline: '',
      deskripsi: '',
      prioritas: ''
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
          <DialogTitle>Buat Lembar Kerja Syariah Baru</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="judul">Judul Lembar Kerja *</Label>
            <Input
              id="judul"
              value={formData.judul}
              onChange={(e) => handleInputChange('judul', e.target.value)}
              placeholder="Masukkan judul lembar kerja"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="klien">Klien *</Label>
              <Select value={formData.klien} onValueChange={(value) => handleInputChange('klien', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih klien" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PT. Halal Sejahtera">PT. Halal Sejahtera</SelectItem>
                  <SelectItem value="Ahmad Fauzi">Ahmad Fauzi</SelectItem>
                  <SelectItem value="CV. Berkah Syariah">CV. Berkah Syariah</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="jenisAkad">Jenis Akad *</Label>
              <Select value={formData.jenisAkad} onValueChange={(value) => handleInputChange('jenisAkad', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis akad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Akad Murabahah">Akad Murabahah</SelectItem>
                  <SelectItem value="Akad Mudharabah">Akad Mudharabah</SelectItem>
                  <SelectItem value="Akad Musyarakah">Akad Musyarakah</SelectItem>
                  <SelectItem value="Wakaf Properti">Wakaf Properti</SelectItem>
                  <SelectItem value="Hibah Syariah">Hibah Syariah</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => handleInputChange('deadline', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="prioritas">Prioritas</Label>
              <Select value={formData.prioritas} onValueChange={(value) => handleInputChange('prioritas', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih prioritas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Rendah">Rendah</SelectItem>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="Tinggi">Tinggi</SelectItem>
                  <SelectItem value="Mendesak">Mendesak</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deskripsi">Deskripsi</Label>
            <Textarea
              id="deskripsi"
              value={formData.deskripsi}
              onChange={(e) => handleInputChange('deskripsi', e.target.value)}
              placeholder="Masukkan deskripsi lembar kerja"
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
              Buat Lembar Kerja
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}