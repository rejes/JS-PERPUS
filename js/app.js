// =============================================
// DATA KOLEKSI BUKU BWAPERPUS
// =============================================

const KOLEKSI_BUKU = [
  {
    id: 1,
    judul: "Laskar Pelangi",
    penulis: "Andrea Hirata",
    kategori: "Fiksi",
    stok: 3,
    rating: 4.8,
  },
  {
    id: 2,
    judul: "Bumi Manusia",
    penulis: "Pramoedya Ananta Toer",
    kategori: "Fiksi",
    stok: 0,
    rating: 4.9,
  },
  {
    id: 3,
    judul: "Sapiens",
    penulis: "Yuval Noah Harari",
    kategori: "Sains",
    stok: 2,
    rating: 4.7,
  },
  {
    id: 4,
    judul: "Atomic Habits",
    penulis: "James Clear",
    kategori: "Non-fiksi",
    stok: 5,
    rating: 4.6,
  },
  {
    id: 5,
    judul: "Negeri 5 Menara",
    penulis: "Ahmad Fuadi",
    kategori: "Fiksi",
    stok: 1,
    rating: 4.5,
  },
  {
    id: 6,
    judul: "Deep Work",
    penulis: "Cal Newport",
    kategori: "Non-fiksi",
    stok: 0,
    rating: 4.4,
  },
  {
    id: 7,
    judul: "A Brief History of Time",
    penulis: "Stephen Hawking",
    kategori: "Sains",
    stok: 3,
    rating: 4.6,
  },
  {
    id: 8,
    judul: "Pulang",
    penulis: "Tere Liye",
    kategori: "Fiksi",
    stok: 2,
    rating: 4.3,
  },
];

// =============================================
// UTILITY FUNCTIONS
// =============================================

// Ambil semua kategori unik dari koleksi
function ambilKategori(koleksi) {
  const kategoriSet = new Set(koleksi.map((b) => b.kategori));
  return ["Semua", ...kategoriSet];
}

// Filter buku berdasarkan kategori
function filterBukuByKategori(koleksi, kategori) {
  if (kategori === "Semua") return koleksi;
  return koleksi.filter((b) => b.kategori === kategori);
}

// =============================================
// RENDER FUNCTIONS
// =============================================

function renderKartuBuku(buku) {
  const badgeStokKelas =
    buku.stok > 0 ? "badge-stok-tersedia" : "badge-stok-habis";
  const badgeStokTeks = buku.stok > 0 ? `${buku.stok} tersisa` : "Habis";

  return `
    <div class="kartu-buku">
      <h3 class="kartu-judul-buku">${buku.judul}</h3>
      <p class="kartu-penulis-buku">${buku.penulis}</p>
      <div class="kartu-meta">
        <span class="badge-kategori">${buku.kategori}</span>
        <span class="${badgeStokKelas}">${badgeStokTeks}</span>
        <span class="kartu-rating">★ ${buku.rating}</span>
      </div>
    </div>
  `;
}

function renderDaftarBuku(koleksi) {
  const kontainer = document.getElementById("kontainer-buku");
  const infoJumlah = document.getElementById("info-jumlah");

  if (koleksi.length === 0) {
    kontainer.innerHTML = `
      <div class="pesan-kosong">
        <span class="pesan-kosong-ikon">📭</span>
        <p>Tidak ada buku di kategori ini</p>
      </div>
    `;
    infoJumlah.textContent = "0 buku ditemukan";
    return;
  }

  kontainer.innerHTML = koleksi.map(renderKartuBuku).join("");
  infoJumlah.textContent = `Menampilkan ${koleksi.length} buku`;
}

function renderTombolFilter(kategori, aktif) {
  const kontainer = document.getElementById("tombol-filter");

  kontainer.innerHTML = kategori
    .map(
      (kat) => `
    <button
      class="tombol-filter ${kat === aktif ? "aktif" : ""}"
      data-kategori="${kat}"
    >
      ${kat}
    </button>
  `
    )
    .join("");
}

// =============================================
// EVENT HANDLING
// =============================================

function setupFilterEvents(kategoriList) {
  const kontainer = document.getElementById("tombol-filter");
  let kategoriAktif = "Semua";

  kontainer.addEventListener("click", function (event) {
    // Event delegation — tangkap klik dari tombol manapun di dalam kontainer
    const tombol = event.target.closest(".tombol-filter");
    if (!tombol) return;

    // Update kategori aktif
    kategoriAktif = tombol.dataset.kategori;

    // Re-render tombol dengan state aktif yang baru
    renderTombolFilter(kategoriList, kategoriAktif);

    // Re-render daftar buku sesuai filter
    const bukuFiltered = filterBukuByKategori(KOLEKSI_BUKU, kategoriAktif);
    renderDaftarBuku(bukuFiltered);

    // Re-setup events karena tombol di-render ulang
    setupFilterEvents(kategoriList);
  });
}

// =============================================
// INISIALISASI
// =============================================

function inisialisasi() {
  const kategoriList = ambilKategori(KOLEKSI_BUKU);

  // Render awal — semua buku
  renderTombolFilter(kategoriList, "Semua");
  renderDaftarBuku(KOLEKSI_BUKU);
  setupFilterEvents(kategoriList);

  console.log("BWAPerpus Filter siap");
  console.log(
    `${KOLEKSI_BUKU.length} buku, ${kategoriList.length - 1} kategori`
  );
}

inisialisasi();
