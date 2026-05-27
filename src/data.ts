/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Doctor, Service, HealthPackage, Article, Testimonial } from './types';

export const SERVICES: Service[] = [
  {
    id: 'poli-umum',
    title: 'Poli Umum',
    description: 'Pemeriksaan kesehatan menyeluruh, diagnosis dini, pengobatan penyakit umum, dan rujukan spesialis oleh dokter profesional.',
    iconName: 'Stethoscope',
    cost: 'Rp 100.000'
  },
  {
    id: 'poli-gigi',
    title: 'Poli Gigi & Mulut',
    description: 'Perawatan konservasi gigi, scaling karang gigi, penambalan, pencabutan, dan estetika dental dengan dokter spesialis berpengalaman.',
    iconName: 'Activity', // Will use Sparkles or Scissors or Smile as tooth
    cost: 'Rp 150.000'
  },
  {
    id: 'poli-anak',
    title: 'Poli Anak (Pediatri)',
    description: 'Pemantauan tumbuh kembang anak, imunisasi terjadwal, pengobatan infeksi, dan konsultasi gizi anak bersama spesialis anak ramah.',
    iconName: 'Baby',
    cost: 'Rp 200.000'
  },
  {
    id: 'poli-kandungan',
    title: 'Poli Kandungan & Kebidanan',
    description: 'Pemeriksaan kehamilan (USG 4D), konsultasi program hamil, KB, dan kesehatan reproduksi wanita dengan suasana nyaman.',
    iconName: 'HeartPulse',
    cost: 'Rp 250.000'
  },
  {
    id: 'laboratorium',
    title: 'Laboratorium Klinik',
    description: 'Fasilitas analisa darah, tes urine, skrining diabetes, profil kolesterol, fungsi hati, dan ginjal dengan teknologi otomatis presisi tinggi.',
    iconName: 'FlaskConical',
    cost: 'Rp 120.000 - Rp 850.000'
  },
  {
    id: 'vaksinasi',
    title: 'Layanan Vaksinasi',
    description: 'Penyediaan vaksinasi influenza, pneumonia, hepatitis B, HPV, meningitis, dan vaksinasi perjalanan internasional resmi bersertifikat.',
    iconName: 'Syringe',
    cost: 'Mulai Rp 150.000'
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-budi',
    name: 'dr. Budi Santoso, Sp.PD',
    specialty: 'Spesialis Penyakit Dalam (Poli Umum)',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop',
    experience: '12 Tahun Pengalaman',
    rating: 4.9,
    schedule: ['Senin (08:00 - 12:00)', 'Selasa (13:00 - 17:00)', 'Kamis (08:00 - 12:00)', 'Jumat (13:00 - 17:00)']
  },
  {
    id: 'dr-siti',
    name: 'drg. Siti Sarah, Sp.KGA',
    specialty: 'Spesialis Kedokteran Gigi Anak (Poli Gigi)',
    avatar: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?q=80&w=400&auto=format&fit=crop',
    experience: '8 Tahun Pengalaman',
    rating: 4.8,
    schedule: ['Senin (13:00 - 17:00)', 'Rabu (09:00 - 13:00)', 'Jumat (09:00 - 13:00)', 'Sabtu (09:00 - 12:00)']
  },
  {
    id: 'dr-aditya',
    name: 'dr. Aditya Nugraha, Sp.A',
    specialty: 'Spesialis Anak (Poli Anak)',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop',
    experience: '10 Tahun Pengalaman',
    rating: 4.9,
    schedule: ['Selasa (08:00 - 12:00)', 'Rabu (13:00 - 17:00)', 'Kamis (13:00 - 17:00)', 'Sabtu (08:00 - 12:00)']
  },
  {
    id: 'dr-rizka',
    name: 'dr. Rizka Amelia, Sp.OG',
    specialty: 'Spesialis Kebidanan & Kandungan (Poli Kandungan)',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop',
    experience: '15 Tahun Pengalaman',
    rating: 5.0,
    schedule: ['Senin (15:00 - 19:00)', 'Rabu (15:00 - 19:00)', 'Kamis (09:00 - 13:00)', 'Sabtu (13:00 - 17:00)']
  }
];

export const HEALTH_PACKAGES: HealthPackage[] = [
  {
    id: 'mcu-basic',
    name: 'Paket Medical Check Up Basic',
    description: 'Pemeriksaan dasar yang ideal untuk pemantauan kesehatan tahunan rutin bagi usia muda dan pekerja produktif.',
    price: 'Rp 350.000',
    discountPrice: 'Rp 275.000',
    features: [
      'Konsultasi Dokter Umum',
      'Pemeriksaan Fisik & Tanda Vital',
      'Pemeriksaan Gula Darah Puasa',
      'Tes Kolesterol Total',
      'Urine Lengkap',
      'Laporan Hasil Cetak & Digital'
    ],
    recommendedFor: 'Individu usia 18-35 tahun, screening berkala.'
  },
  {
    id: 'mcu-premium',
    name: 'Paket MCU Sehat Premium',
    description: 'Panel pemeriksaan komprehensif untuk mengevaluasi fungsi organ vital secara mendalam dan deteksi dini penyakit degeneratif.',
    price: 'Rp 1.250.000',
    discountPrice: 'Rp 899.000',
    features: [
      'Konsultasi Dokter Spesialis Penyakit Dalam',
      'Pemeriksaan Fisik & EKG (Rekam Jantung)',
      'Profil Lipid Lengkap (Kolesterol LDL, HDL, Trigliserida)',
      'Fungsi Ginjal (Ureum, Kreatinin, Asam Urat)',
      'Fungsi Hati (SGOT, SGPT)',
      'Hematologi Lengkap (Sel Darah Merah/Putih, Hemoglobin)',
      'Skrining Diabetes (HbA1c & Gula Darah Puasa)'
    ],
    recommendedFor: 'Individu usia di atas 35 tahun, riwayat penyakit keluarga.'
  },
  {
    id: 'mcu-children',
    name: 'Paket Tumbuh Kembang & Nutrisi Anak',
    description: 'Evaluasi tumbuh kembang fisik dan status nutrisi untuk memastikan tumbuh kembang buah hati berjalan optimal.',
    price: 'Rp 450.000',
    discountPrice: 'Rp 349.000',
    features: [
      'Konsultasi Dokter Spesialis Anak',
      'Pengukuran Tinggi, Berat & Lingkar Kepala',
      'Asesmen Capaian Perkembangan Motorik',
      'Konsultasi Gizi & Panduan MPASI',
      'Pemeriksaan Hemoglobin (Deteksi Anemia Defisiensi Besi)',
      'Free 1x Multivitamin Anak Premium'
    ],
    recommendedFor: 'Anak-anak usia 0-12 tahun.'
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'tips-daya-tahan',
    title: 'Tips Menjaga Daya Tahan Tubuh di Tengah Cuaca Tak Menentu',
    category: 'Gaya Hidup Sehat',
    summary: 'Suhu ekstrem dan perubahan cuaca mendadak sering membuat tubuh rentan sakit. Temukan tips praktis menjaga imunitas tubuh Anda.',
    content: 'Perubahan cuaca yang ekstrem (pancaroba) menuntut imunitas tubuh untuk selalu optimal. Beberapa langkah krusial untuk menjaga daya tahan tubuh Anda antara lain:\n\n1. **Konsumsi Makanan Bergizi Seimbang**: Pastikan asupan Anda kaya akan vitamin C (jeruk, buah beri) dan Zinc (daging, biji-bijian).\n2. **Tidur yang Cukup**: Tidur 7-8 jam per malam membantu sel-sel imun meregenerasi dan memperkuat proteksi tubuh.\n3. **Tetap Terhidrasi**: Air putih membantu menyalurkan nutrisi dan membuang zat sisa dari tubuh.\n4. **Kelola Stres**: Hormon kortisol akibat stres dapat melemahkan efektivitas sistem kekebalan tubuh.\n5. **Olahraga Ringan**: Aktivitas fisik seperti jalan cepat selama 30 menit sehari dapat merangsang pergerakan sel darah putih.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop',
    date: '25 Mei 2026',
    author: 'dr. Budi Santoso, Sp.PD',
    readTime: '4 menit baca'
  },
  {
    id: 'pentingnya-olahraga',
    title: 'Berapa Lama Durasi Olahraga yang Ideal untuk Kesehatan Jantung?',
    category: 'Kebugaran',
    summary: 'Aktivitas fisik sangat krusial bagi organ jantung. Mari ketahui panduan durasi dan jenis olahraga yang direkomendasikan dokter spesialis kami.',
    content: 'Kesehatan jantung dapat ditingkatkan secara signifikan melalui olahraga teratur. Menurut standar kesehatan internasional, durasi olahraga yang ideal adalah:\n\n- **150 Menit per Minggu** untuk olahraga intensitas sedang (seperti jalan cepat, bersepeda santai, atau berenang).\n- **Atau 75 Menit per Minggu** untuk olahraga intensitas tinggi (seperti jogging, aerobik, atau lari).\n\n**Mengapa olahraga penting bagi jantung?**\nOlahraga membantu melatih otot jantung agar memompa darah lebih efisien, menurunkan tekanan darah, meningkatkan kolesterol baik (HDL), dan membantu mengontrol berat badan untuk mengurangi risiko penyakit jantung koroner.',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=600&auto=format&fit=crop',
    date: '18 Mei 2026',
    author: 'dr. Budi Santoso, Sp.PD',
    readTime: '3 menit baca'
  },
  {
    id: 'polusi-udara-kesehatan',
    title: 'Dampak Polusi Udara & Cara Efektif Melindungi Sistem Pernapasan',
    category: 'Kesehatan Lingkungan',
    summary: 'Polusi udara kota besar kian mengkhawatirkan. Pahami risiko ISPA dan langkah preventif terbaik untuk menjaga paru-paru tetap bersih.',
    content: 'Paparan polusi udara jangka panjang mengandung partikel berbahaya PM2.5 yang dapat berpenetrasi ke dalam aliran darah dan memicu masalah kesehatan paru hingga jantung.\n\nBeberapa cara efektif melindungi kesehatan pernapasan Anda:\n1. **Gunakan Masker yang Tepat**: Gunakan masker standar N95 atau KN95 saat indeks kualitas udara berada di zona jingga atau merah.\n2. **Cek Kualitas Udara**: Gunakan aplikasi pemantau sebelum beraktivitas di luar.\n3. **Gunakan Air Purifier**: Taruh pembersih udara dengan filter HEPA di ruang tidur atau ruang keluarga.\n4. **Konsumsi Antioksidan**: Makanan tinggi vitamin A, C, dan E dapat mengompensasi stres oksidatif yang disebabkan oleh polutan udara.',
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=600&auto=format&fit=crop',
    date: '10 Mei 2026',
    author: 'dr. Aditya Nugraha, Sp.A',
    readTime: '5 menit baca'
  },
  {
    id: 'kesehatan-keluarga',
    title: 'Membangun Kebiasaan Hidup Bersih & Sehat (PHBS) di Rumah',
    category: 'Kesehatan Keluarga',
    summary: 'Langkah kecil dari rumah bisa mencegah berbagai penyakit menular. Ajarkan anak dan keluarga kebiasaan cuci tangan dan gizi terbaik.',
    content: 'Perilaku Hidup Bersih dan Sehat (PHBS) di tingkat rumah tangga adalah pilar utama pencegahan penyakit menular seperti diare, demam berdarah, dan infeksi saluran napas.\n\nMulailah kebiasaan sehat ini bersama anak dan pasangan:\n- **Membiasakan Cuci Tangan dengan Sabun**: Di air mengalir selama minimal 20 detik terutama sebelum makan dan setelah berkegiatan dari luar.\n- **Pemberantasan Jentik Nyamuk**: Menguras dan menutup tempat penampungan air seminggu sekali untuk mencegah demam berdarah.\n- **Makan Sayur & Buah Setiap Hari**: Sebagai sumber vitamin alami penegak imunitas.\n- **Olahraga Bersama**: Jadwalkan bersepeda santai di hari Minggu pagi bersama keluarga.',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop',
    date: '02 Mei 2026',
    author: 'drg. Siti Sarah, Sp.KGA',
    readTime: '4 menit baca'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Andi Wijaya',
    role: 'Wiraswasta, Jakarta',
    comment: 'Sangat puas dengan layanan poli umum di Klinik Sehat Sejahtera. Dokter Budi menjelaskannya sangat detail dan tidak buru-buru. Antrean juga tertib dan ruang tunggunya bersih sekali seperti di rumah sakit luar negeri.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    date: '15 Mei 2026'
  },
  {
    id: 't2',
    name: 'Dewi Lestari',
    role: 'Ibu Rumah Tangga, Tangerang',
    comment: 'Membawa anak saya ke Poli Anak dr. Aditya adalah pengalaman terbaik. Tempatnya ramah anak, dokternya sangat sabar menghadapi anak kecil yang takut disuntik. Sangat direkomendasikan untuk ibu-ibu!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    date: '20 Mei 2026'
  },
  {
    id: 't3',
    name: 'Rian Hidayat',
    role: 'Karyawan Swasta, Bekasi',
    comment: 'Layanan laboratoriumnya cepat sekali! Saya melakukan Medical Check Up di klinik ini, hasilnya dikirim langsung ke WhatsApp dan email dalam beberapa jam saja beserta penjelasan rangkumannya. Harganya pun sangat bersahabat.',
    rating: 4.8,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
    date: '24 Mei 2026'
  }
];
