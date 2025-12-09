# Panduan Lengkap: Server Actions & useActionState di Next.js
(Studi Kasus: Form Pendaftaran Kamar / `CreateRoom`)

Next.js terbaru menggunakan pola **Server Actions** yang memungkinkan kita memproses form tanpa perlu membuat API route (`/api/...`) secara manual untuk setiap aksi.

## 1. Konsep Dasar

Dulu (React Biasa):
1.  Buat Form.
2.  Saat submit, cegah reload (`e.preventDefault()`).
3.  Ambil data form.
4.  Kirim pakai `fetch('/api/register')`.
5.  Tunggu loading.
6.  Terima respon.

Sekarang (Next.js Server Actions):
1.  Buat Form.
2.  Atribut `action` pada form langsung menunjuk ke sebuah **Fungsi Server**.
3.  Fungsi itu jalan di server, urus database, dan balikin hasil ke komponen.
4.  Hook `useActionState` mengurus loading, error, dan hasil balikan tersebut secara otomatis.

---

## 2. Bedah Kode: `CreateForm.tsx` (Frontend)

Mari kita lihat bagaimana `useActionState` bekerja di komponen Anda.

### A. Persiapan Hook
```typescript
// components/admin/room/CreateForm.tsx

import { useActionState } from "react";
import { saveRoom } from "@/lib/action"; // Fungsi server (Server Action)

// ...

// SYNTAX:
// const [state, formAction, isPending] = useActionState(serverFunction, initialState);

// IMPLEMENTASI ANDA:
const [Output, FormAction, process] = useActionState(
    saveRoom.bind(null, image), // Fungsi server (di-bind dengan data tambahan 'image')
    null                        // Nilai awal state (Output) adalah null
);
```

**Penjelasan Variabel:**
1.  **`Output` (state)**: Ini adalah "Kotak Surat Balasan" dari server. Awalnya `null`. Setelah tombol save ditekan dan server selesai kerja, `Output` akan berisi balasan dari server (misalnya: `{ error: ... }` atau `{ message: "Sukses" }`).
2.  **`FormAction`**: Ini adalah "Kurir". Kita pasang ini di tag `<form action={FormAction}>`. Saat form disubmit, kurir ini yang membawa data ke server.
3.  **`process` (isPending)**: Ini adalah "Status Lampu". `true` kalau server sedang sibuk kerja, `false` kalau sudah selesai. Dipakai untuk mematikan tombol "Save" biar gak diklik berkali-kali.

### B. Pemasangan di Form
```tsx
<form action={FormAction}> {/* <-- Pasang Kurir disini */}
    
    {/* Input Biasa */}
    <input name="name" ... />
    
    {/* Menampilkan Error dari Server (Isi Kotak Surat) */}
    <span className="text-red-500">{Output?.error?.name}</span>

    {/* Tombol Submit dengan Indikator Loading */}
    <button disabled={process}>
        {process ? 'Save...' : 'Save'}
    </button>
</form>
```

---

## 3. Bedah Kode: `lib/action.ts` (Backend)

Ini adalah tempat logika berjalan. Fungsi ini berjalan di SERVER, bukan di browser user.

### A. Menerima Data
```typescript
// lib/action.ts
"use server" // Wajib ada ini di baris pertama file!

// Fungsi ini dipanggil oleh 'FormAction' tadi
export const saveRoom = async (image: string, prevState: unknown, formData: FormData) => {
    
    // 1. TERIMA DATA
    // 'formData' adalah paket yang dibawa kurir dari form HTML.
    // Kita bongkar paketnya:
    const rawData = {
        name: formData.get('name'),         // Ambil input name="name"
        price: formData.get('price'),       // Ambil input name="price"
        amenities: formData.getAll('amenities') // Ambil semua checkbox amenities
    };

    // ...Validasi...
```
**Catatan Penting:** Parameter `image` ada di depan karena di frontend tadi kita melakukan `.bind(null, image)`. Jadi `image` dikirim terpisah, sisanya (`prevState`, `formData`) dikirim otomatis oleh React.

### B. Validasi (Zod)
Sebelum masuk database, kita cek dulu datanya.
```typescript
    // Gunakan Zod Schema untuk cek aturan (harus angka, harus diisi, dll)
    const ValidateFields = RoomSchema.safeParse(rawData);

    // KALAU GAGAL:
    if (!ValidateFields.success) {
        // Kembalikan daftar error ke Frontend.
        // Inilah yang nanti masuk ke variabel 'Output' di React!
        return { 
            error: ValidateFields.error.flatten().fieldErrors 
        };
    }
```

### C. Simpan ke Database (Prisma)
Jika lolos validasi, baru kita simpan.
```typescript
    // Ambil data yang sudah bersih/valid
    const { name, price, ... } = ValidateFields.data;

    await prisma.room.create({
        data: {
            name,
            price,
            image,
            // ...
        }
    });

    // Setelah sukses, pindahkan user ke halaman lain
    redirect("/admin/room/");
}
```

---

## Rangkuman Alur (Flow)

1.  **User** isi form -> Klik "Save".
2.  **`FormAction`** (di React) membawa semua input ke fungsi `saveRoom` (di Server).
3.  **`saveRoom`** validasi data.
    *   **Jika ERROR**: `saveRoom` `return { error: ... }`. React otomatis update variabel `Output` dengan error tersebut. Tulisan merah muncul di form.
    *   **Jika SUKSES**: `saveRoom` simpan ke DB lalu `redirect`. User pindah halaman.
4.  Selama proses nomor 2 & 3, variabel `process` di React bernilai `true` (tombol disable).

Inilah cara modern Next.js menyambungkan Form (Frontend) ke API/Database (Backend) tanpa perlu `fetch`, `useEffect`, atau state manual yang rumit.

---
## 4. Contoh Sederhana (Minimum)

Jika contoh Room di atas terlalu kompleks, berikut adalah versi paling sederhananya. Bayangkan form untuk "Ubah Nama User".

### A. Kode Backend (`action.ts`)
```typescript
"use server"

// Syarat Server Action:
// 1. Harus async
// 2. Menerima prevState dan formData
export async function ubahNama(prevState: any, formData: FormData) {
  const namaBaru = formData.get("username");
  
  if (namaBaru === "admin") {
    return { pesan: "Nama admin dilarang!" }; // Gagal
  }

  // Simpan ke DB (ceritanya)
  await db.user.update(..., { name: namaBaru });
  
  return { pesan: "Sukses ganti nama!" }; // Sukses
}
```

### B. Kode Frontend (`Profile.tsx`)
```tsx
"use client"
import { useActionState } from "react";
import { ubahNama } from "./action";

export default function Profile() {
  // RUMUS:
  // [KotakSurat, Kurir, SedangKirim] = useActionState(FungsiTujuan, IsiAwalKotakSurat)
  const [state, formAction, isPending] = useActionState(ubahNama, null);

  return (
    <form action={formAction}>
      <input name="username" placeholder="Nama Baru" />
      
      <button disabled={isPending}>
        {isPending ? "Sedang Mengganti..." : "Ganti Nama"}
      </button>

      {/* Tampilkan balasan surat dari server */}
      <p>Status: {state?.pesan}</p>
    </form>
  )
}
```

---

## 5. Hook Tambahan: `useTransition`

Anda mungkin melihat kode ini di `CreateForm.tsx`:
```typescript
const [pending, startTransition] = useTransition()
```

### Apa Bedanya dengan `useActionState`?
*   **`useActionState`**: Khusus untuk **FORM**. Dia otomatis jalan saat form di-submit.
*   **`useTransition`**: Untuk aksi **NON-FORM** (misalnya klik tombol biasa, upload gambar otomatis, tombol delete).

### Analogi useTransition
Bayangkan Anda sedang menonton TV (UI tidak boleh macet). Lalu Anda menyuruh pembantu untuk memasak (Proses berat di background).
*   **`startTransition`**: "Tolong masak nasi, tapi jangan ganggu saya nonton TV. Lakukan di background aja."
*   **`pending`**: Lampu indikator "Sedang Memasak" menyala.

### Kapan Pakai Yang Mana?
| Situasi | Pakai Hook Apa? | Rumus |
| :--- | :--- | :--- |
| **Submit Form Besar** (Register, Login, Input Data) | `useActionState` | `form action={dispatch}` |
| **Klik Tombol Kecil** (Delete item, Like, Upload Gambar saat dipilih) | `useTransition` | `onClick={() => startTransition(() => { aksiServer() })}` |


### Syarat Wajib
1.  **Client Component**: Kedua hook ini (`useActionState`, `useTransition`) hanya bisa dipakai di file yang paling atasnya ada `'use client'`.
2.  **Async Function**: Fungsi yang dipanggil di dalam `startTransition` atau `action` sebaiknya `async` (Server Action).

---

### Contoh Koding `useTransition` (Fitur Delete)

Berikut adalah contoh nyata untuk tombol "Delete" yang tidak perlu form lengkap.

**Backend (`action.ts`)**
```typescript
"use server"
import { revalidatePath } from "next/cache";

export async function deleteRoom(id: string) {
    // Proses berat di server
    await db.room.delete({ where: { id } });
    
    // Refresh halaman agar data hilang dari list
    revalidatePath("/admin/room");
}
```

**Frontend (`RoomList.tsx`)**
```tsx
"use client"
import { useTransition } from "react";
import { deleteRoom } from "./action";

export default function RoomButton({ id }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        // RUMUS: startTransition( () => { PanggilFungsiServer() } )
        startTransition(async () => {
            await deleteRoom(id);
            alert("Terhapus!");
        });
    }

    return (
        <button onClick={handleDelete} disabled={isPending}>
            {/* Tampilkan Loading kalau lagi proses */}
            {isPending ? "Menghapus..." : "Delete Room"}
        </button>
    )
}
```
Inilah bedanya. Kalau `useFormState` menempel di `<form>`, kalau `useTransition` menempel di `onClick` atau event handler lainnya.


