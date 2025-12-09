# NextAuth: Memahami Callbacks, JWT, dan Session

Pertanyaan: *"Apakah callback itu nama session di database?"*
**Jawabannya: BUKAN.**

*   **Callback** adalah istilah programming untuk "Fungsi yang dipanggil otomatis ketika sesuatu terjadi".
*   Di NextAuth, `callbacks` adalah fungsi yang kita tulis agar NextAuth menjalankannya setiap kali user Login atau membuka halaman.

---

## 1. Analogi Sederhana: "Kartu Member Hotel"

Bayangkan NextAuth adalah resepsionis hotel.

1.  **Database (Prisma)** = **"Buku Induk Kependudukan"**. Berisi data lengkap semua orang (Nama, Email, Role, Alamat, dll).
2.  **JWT (Token)** = **"Stiker Kecil di Kartu Member"**. Kapasitasnya kecil, cuma bisa ditulis sedikit info penting.
3.  **Session (Client)** = **"Layar Monitor Resepsionis"**. Apa yang bisa dilihat oleh petugas (Front End) saat kartu discan.

---

## 2. Alur Kerja Kode Anda

Berikut adalah penjelasan baris demi baris dari kode `auth.ts` Anda:

### Tahap 1: User Login (Mengisi Stiker/JWT)
Saat user login, NextAuth mengambil data user dari Database. Tapi secara default, NextAuth cuma simpan Nama & Email di token (stiker). Bagaimana kalau kita butuh `role` (Admin/User)? Kita harus tulis manual.

```typescript
jwt({ token, user }) {
  // Fungsi ini jalan SAAT LOGIN BERHASIL.
  // 'user' berisi data lengkap dari database (Hanya tersedia saat pertama login)
  // 'token' adalah stiker yang bakal ditempel di browser user.
  
  if (user) { 
      // "Eh, mumpung lagi pegang data User lengkap,
      // tolong salin info 'role' ke stiker (token) ya."
      token.role = user.role 
  }
  return token;
}
```

### Tahap 2: User Buka Website (Membaca Session)
Saat user pindah halaman, browser menunjukkan stiker (Token) tadi. NextAuth membaca stiker itu dan menyajikannya ke React (Session).

```typescript
session({ session, token }) { 
  // Fungsi ini jalan SETIAP KALI User buka halaman / refresh.
  // 'token' adalah stiker yang tadi sudah kita tulisi role.
  // 'session' adalah objek yang bakal dikirim ke React (useSession).

  // "Tolong salin info dari stiker (token) ke layar monitor (session)"
  session.user.id = token.sub   // Ambil ID
  session.user.role = token.role // Ambil Role yang tadi kita simpan di Tahap 1
  
  return session;
}
```

---

## 3. Kenapa Harus Dua Kali Kerja? (JWT -> Session)

Kenapa tidak langsung dari Database ke Session?
Karena NextAuth dirancang agar **MANDIRI (Stateless)**.

Untuk menghemat server, NextAuth tidak mau bolak-balik cek Database setiap kali user klik tombol. Sebagai gantinya:
1.  Saat Login: Ambil data DB -> Simpan di Token Terenkripsi (di Cookies Browser).
2.  Saat Browsing: Baca Token Cookies saja (Cepat, tidak perlu koneksi Database).

Itulah kenapa kita perlu:
1.  **JWT Callback**: Untuk menyelipkan data tambahan (`role`) ke dalam Token saat login.
2.  **Session Callback**: Untuk mengeluarkan data tambahan tadi dari Token agar bisa dibaca oleh komponen React (`auth().user.role`).

Jika Anda tidak melakukan ini, maka `session.user.role` akan `undefined` di frontend, meskipun di database kolom `role` itu ada.
