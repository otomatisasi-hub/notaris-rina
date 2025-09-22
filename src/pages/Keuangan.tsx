import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, CreditCard, Trash2, Eye, Edit, MoreHorizontal, Bell } from "lucide-react";
import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const summaryBlocks = [
	{
		title: "Tagihan",
		icon: FileText,
		value: 12,
		description: "Tagihan aktif bulan ini",
	},
	{
		title: "Pembayaran",
		icon: CreditCard,
		value: 8,
		description: "Pembayaran diterima",
	},
	{
		title: "Hapus Piutang",
		icon: Trash2,
		value: 2,
		description: "Piutang dihapus",
	},
];

const tableData = [
	{
		no: 1,
		layanan: "Akta Jual Beli Tanah",
		pelanggan: "Ahmad Rizki",
		jenis: "PPAT",
		tindakLanjut: "Pembelian Voucher PNBP",
		tanggalDibuat: "2025-09-01",
		tenggatWaktu: "2025-09-20",
	},
	{
		no: 2,
		layanan: "Akta Pendirian PT",
		pelanggan: "Siti Nurhaliza",
		jenis: "Notaril",
		tindakLanjut: "Pembuatan Invoice",
		tanggalDibuat: "2025-09-05",
		tenggatWaktu: "2025-09-22",
	},
	{
		no: 3,
		layanan: "Sertifikat Wakaf",
		pelanggan: "Muhammad Fadli",
		jenis: "Syariah",
		tindakLanjut: "Pembelian Voucher PNBP",
		tanggalDibuat: "2025-09-10",
		tenggatWaktu: "2025-09-25",
	},
];

export default function Keuangan() {
	const [search, setSearch] = useState("");
	const filteredData = tableData.filter((row) =>
		row.layanan.toLowerCase().includes(search.toLowerCase()) ||
		row.pelanggan.toLowerCase().includes(search.toLowerCase())
	);

	const handleNotify = (id) => {
		// Implementasi logika notifikasi di sini
		console.log(`Notifikasi untuk ID: ${id}`);
	};

	return (
		<div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
			<h1 className="text-3xl font-bold tracking-tight mb-2">Keuangan</h1>
			<div className="grid gap-4 md:grid-cols-3 mb-6">
				{summaryBlocks.map((block) => (
					<Card key={block.title} className="relative overflow-hidden">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">{block.title}</CardTitle>
							<block.icon className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-primary">{block.value}</div>
							<p className="text-xs text-muted-foreground">{block.description}</p>
						</CardContent>
					</Card>
				))}
			</div>
			<Card>
				<CardHeader>
					<div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
						<div className="relative">
							<Input
								placeholder="Cari layanan atau pelanggan..."
								value={search}
								onChange={e => setSearch(e.target.value)}
								className="pl-8 w-64"
							/>
						</div>
					</div>
				</CardHeader>
				<CardContent>
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
								<TableHead>No</TableHead>
								<TableHead>Layanan</TableHead>
								<TableHead>Pelanggan</TableHead>
								<TableHead>Jenis</TableHead>
								<TableHead>Tindak Lanjut</TableHead>
								<TableHead>Tanggal Dibuat</TableHead>
								<TableHead>Tenggat Waktu</TableHead>
								<TableHead className="w-32">Aksi</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredData.map((row) => (
								<TableRow key={row.no}>
									<TableCell>{row.no}</TableCell>
									<TableCell>{row.layanan}</TableCell>
									<TableCell>{row.pelanggan}</TableCell>
									<TableCell>{row.jenis}</TableCell>
									<TableCell>{row.tindakLanjut}</TableCell>
									<TableCell>{row.tanggalDibuat}</TableCell>
									<TableCell>{row.tenggatWaktu}</TableCell>
									<TableCell>
										<div className="flex items-center space-x-1">
											<Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
											<Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
											<Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button>
											<Button variant="ghost" size="sm" onClick={() => handleNotify(row.id)}><Bell className="h-4 w-4" /></Button>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
