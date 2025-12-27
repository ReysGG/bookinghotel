import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { prisma } from "./lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma), //mengembalikkan data user dari database
  providers: [Google],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role // ngasih tau kalau token.role itu dari user.role
      return token;
    },
    session({ session, token }) { // ini jatuhnya client
      session.user.id = token.sub //(ID pengguna dari database).
      session.user.role = token.role //(Role pengguna dari database).
      return session;
    },
  }
})

// angkah 1: (Otomatis oleh PrismaAdapter)
// Pengguna login via Google.
// NextAuth menerima profil Google (nama, email).
// NextAuth memberikan profil ini ke PrismaAdapter.
// PrismaAdapter otomatis berbicara ke database Anda:
// "Cari user dengan email budi@google.com."
// Jika tidak ada: "Buat user baru di tabel User." (Di sinilah role default Anda mungkin diatur di skema Prisma).
// Jika ada: "Ambil data user itu."
// PrismaAdapter kemudian mengembalikan data LENGKAP user dari database Anda.
// Langkah 2: (Mulai Callback jwt)
// NextAuth sekarang memiliki 2 objek penting:
// user: Objek yang baru saja dikembalikan oleh PrismaAdapter dari database Anda. (misal: { id: '123', name: 'Budi', email: '...', role: 'ADMIN' })
// token: Objek JWT baru yang masih KOSONG yang akan segera dibuat. (misal: {})
// Langkah 3: (Kode Anda Dijalankan)
// Sekarang, kode Anda dipanggil: jwt({ token, user })
// Kita lihat barisnya: if(user) token.role = user.role
// Mari kita ganti variabelnya dengan datanya:
// if( { id: '123', ..., role: 'ADMIN' } ) ... (Cek, user-nya ada, jadi if dieksekusi)
// {}.role = { id: '123', ..., role: 'ADMIN' }.role
// Maksud dari baris itu adalah:
// "Tolong AMBIL nilai role ('ADMIN') dari objek user (database), dan COPY-PASTE nilai tersebut ke dalam properti role di objek token (JWT) yang baru."
// Langkah 4: (Hasil Akhir Callback)
// Objek token yang tadinya {} sekarang menjadi { role: 'ADMIN' }.
// return token;
// NextAuth mengambil objek { role: 'ADMIN' } ini, menambah info lain (seperti ID user (sub) dan waktu kedaluwarsa), lalu men-enkripsinya menjadi string JWT yang panjang, dan menyimpannya di cookie.
// Kesimpulan
// user = Objek data dari database Anda.
// token = Objek JWT (Stempel Tangan) yang sedang dibuat.
// Kode Anda adalah perintah untuk "menyalin" data role dari database ke dalam JWT, sehingga JWT itu bisa "mengingat" role Anda tanpa harus mengecek database lagi setiap pindah ha