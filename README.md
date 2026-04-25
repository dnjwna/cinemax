# CINEMAX — Mini Project React

Aplikasi movie discovery yang dibangun dengan React, dilengkapi fitur user authentication dan manajemen user.

---

## 📦 Libraries yang Digunakan

| Library | Versi | Kegunaan |
|---|---|---|
| `react` | ^19.2.5 | Core framework UI |
| `react-dom` | ^19.2.5 | DOM rendering untuk React |
| `react-router-dom` | ^7.6.0 | Client-side routing & protected routes |
| `react-icons` | ^5.6.0 | Icon set untuk sidebar & UI elements |
| `axios` | ^1.15.1 | HTTP client (tersedia untuk fetch data film) |
| `vite` | ^8.0.9 | Build tool & dev server |

---

## ✅ Fitur Utama (Requirement)

### Milestone 1 — API Integration

- **REGISTER — Successful**: Menyimpan data user (email & password) ke `localStorage`
- **REGISTER — Unsuccessful**: Menampilkan pesan error jika email sudah terdaftar atau password tidak cocok
- **LOGIN — Successful**: Memvalidasi kredensial dari `localStorage`, menyimpan token & session
- **LOGIN — Unsuccessful**: Menampilkan pesan error jika email/password salah
- **LIST USERS**: Menampilkan daftar 12 user dengan data dari ReqRes (avatar, nama, email)
- **SINGLE USER**: Menampilkan halaman detail tiap user berdasarkan ID

### Milestone 2 — React Application

- **Register User**: Halaman `/register` dengan form validasi (email, password, confirm password)
- **Login User**: Halaman `/login` dengan autentikasi berbasis `localStorage`
- **Daftar User**: Halaman `/users` menampilkan grid user cards
- **Detail User**: Halaman `/users/:id` menampilkan profil lengkap user
- **Pagination**: Navigasi halaman di `/users`, 6 user per halaman
- **Protected Routes**: Redirect otomatis ke `/login` jika belum authenticated
- **Responsive Design**: Layout fleksibel menggunakan CSS Grid dan Flexbox

---

## ✨ Fitur Tambahan (di luar requirement utama)

1. **Persistent Session** — Token & data user disimpan di `localStorage`, session tetap aktif setelah refresh halaman
2. **Context API** — `AuthContext` untuk global state management tanpa library tambahan
3. **Mock Authentication** — Register & login menggunakan `localStorage` tanpa ketergantungan API eksternal
4. **Hover Animations** — Efek animasi pada movie cards dan user cards saat hover
5. **Active Route Highlighting** — Sidebar menandai halaman aktif secara otomatis
6. **Error Handling** — Setiap aksi form memiliki pesan error yang jelas dan styled
7. **Consistent Dark Theme** — Seluruh halaman mengikuti tema dark Cinemax yang konsisten

---

## 🗂️ Struktur Project

```
src/
├── context/
│   └── AuthContext.jsx       # Global auth state (Context API)
├── components/
│   ├── Hero.jsx              # Hero banner section
│   ├── MovieCard.jsx         # Individual movie card
│   ├── MovieList.jsx         # Horizontal scrollable movie list
│   ├── ProtectedRoute.jsx    # Route guard component
│   └── Sidebar.jsx           # Navigation sidebar
├── pages/
│   ├── HomePage.jsx          # Browse movies (protected)
│   ├── LoginPage.jsx         # Login form
│   ├── RegisterPage.jsx      # Register form
│   ├── UsersPage.jsx         # User list + pagination (protected)
│   └── UserDetailPage.jsx    # Single user detail (protected)
├── App.jsx                   # Router & provider setup
└── main.jsx                  # Entry point
```

---

## 🚀 Cara Menjalankan

```bash
# Install dependencies
npm install

# Jalankan dev server
npm run dev
```

Buka `http://localhost:5173` di browser.

**Langkah pertama:**
1. Buka `/register` dan buat akun baru
2. Login dengan akun yang baru dibuat
3. Explore halaman Browse (film) dan Members (user)
