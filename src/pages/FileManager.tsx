import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Folder, Eye, Edit, MoreHorizontal, Bell } from "lucide-react";
import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const tableData = [
	{
		id: 1,
		pelanggan: "Ahmad Rizki",
		layanan: "Akta Jual Beli Tanah",
		subLayanan: "PPAT",
		jenis: "Dokumen Tanah",
		lokasiSimpan: "No. Rak 001 - Minuta Notaris 2022 Desember 01 No. 1-50",
	},
	{
		id: 2,
		pelanggan: "Siti Nurhaliza",
		layanan: "Akta Pendirian PT",
		subLayanan: "Notaril",
		jenis: "Dokumen Perusahaan",
		lokasiSimpan: "No. Rak 002 - Minuta Notaris 2023 Januari 15 No. 51-100",
	},
	{
		id: 3,
		pelanggan: "Muhammad Fadli",
		layanan: "Sertifikat Wakaf",
		subLayanan: "Syariah",
		jenis: "Dokumen Wakaf",
		lokasiSimpan: "No. Rak 003 - Minuta Notaris 2023 Februari 20 No. 101-150",
	},
];

export default function FileManager() {
	const [search, setSearch] = useState("");
	const filteredData = tableData.filter((row) =>
		row.pelanggan.toLowerCase().includes(search.toLowerCase()) ||
		row.layanan.toLowerCase().includes(search.toLowerCase()) ||
		row.subLayanan.toLowerCase().includes(search.toLowerCase())
	);

	const handleNotify = (id) => {
		// Implementasi logika notifikasi di sini
		alert(`Notifikasi untuk ID: ${id}`);
	};

	return (
		<div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
			<h1 className="text-3xl font-bold tracking-tight mb-2">File Manager</h1>
			<Card>
				<CardHeader>
					<div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
						<div className="relative">
							<Input
								placeholder="Cari pelanggan, layanan, atau sub layanan..."
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
								<TableHead>Nama Pelanggan</TableHead>
								<TableHead>Layanan</TableHead>
								<TableHead>Sub Layanan</TableHead>
								<TableHead>Jenis</TableHead>
								<TableHead>Lokasi Simpan</TableHead>
								<TableHead className="w-32">Aksi</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredData.map((row, index) => (
								<TableRow key={index}>
									<TableCell>{row.pelanggan}</TableCell>
									<TableCell>{row.layanan}</TableCell>
									<TableCell>{row.subLayanan}</TableCell>
									<TableCell>{row.jenis}</TableCell>
									<TableCell>{row.lokasiSimpan}</TableCell>
									<TableCell>
										<div className="flex items-center space-x-1">
											<Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
											<Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
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
