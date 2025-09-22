import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { useToast } from "@/hooks/use-toast"

interface AddWorksheetModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddWorksheetModal({ open, onOpenChange }: AddWorksheetModalProps) {
  const [formData, setFormData] = useState({
    judul: '',
    klien: '',
    deskripsi: '',
    prioritas: '',
    deadline: undefined as Date | undefined
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.judul || !formData.klien) {
      toast({
        title: "Error",
        description: "Judul dan klien wajib diisi",
        variant: "destructive"
      })
      return
    }

    // Simulate API call
    console.log('Adding worksheet:', formData)
    
    toast({
      title: "Berhasil",
      description: "Lembar kerja berhasil dibuat",
    })
    
    // Reset form and close modal
    setFormData({
      judul: '',
      klien: '',
      deskripsi: '',
      prioritas: '',
      deadline: undefined
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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Buat Lembar Kerja Baru</DialogTitle>
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
                  <SelectItem value="PT. Maju Jaya">PT. Maju Jaya</SelectItem>
                  <SelectItem value="John Doe">John Doe</SelectItem>
                  <SelectItem value="CV. Berkah Abadi">CV. Berkah Abadi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="prioritas">Prioritas</Label>
              <Select value={formData.prioritas} onValueChange={(value) => handleInputChange('prioritas', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih prioritas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Rendah">Rendah</SelectItem>
                  <SelectItem value="Sedang">Sedang</SelectItem>
                  <SelectItem value="Tinggi">Tinggi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Deadline</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.deadline ? (
                    format(formData.deadline, "PPP", { locale: id })
                  ) : (
                    <span>Pilih tanggal deadline</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.deadline}
                  onSelect={(date) => setFormData(prev => ({ ...prev, deadline: date }))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deskripsi">Deskripsi</Label>
            <Textarea
              id="deskripsi"
              value={formData.deskripsi}
              onChange={(e) => handleInputChange('deskripsi', e.target.value)}
              placeholder="Masukkan deskripsi tugas atau catatan"
              rows={4}
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