# Alur Pembayaran Midtrans di Next.js

Dokumen ini menjelaskan bagaimana data bergerak dari aplikasi React Anda, ke Server API Next.js, hingga ke sistem pembayaran Midtrans.

## 1. Frontend (React) - Mengirim Data
**File:** `components/PaymentButton.tsx`

Di sini, user menekan tombol bayar. Aplikasi harus mengirim data pesanan ke server.

### Kode Penting:
```typescript
const handlepayment = async () => {
    // 1. Persiapkan Data (Object)
    // Variabel 'reservation' berisi data booking dari database/state
    
    // 2. Kirim ke API (Fetch)
    const response = await fetch("/api/payment", {
        method: "POST",
        // 3. BUNGKUS DATA (PENTING!)
        // Data Object harus diubah menjadi String JSON agar bisa dikirim
        body: JSON.stringify(reservation), 
    })
    
    // 4. Terima Balasan (Token)
    const {token} = await response.json();
    
    // 5. Munculkan Popup
    window.snap.pay(token);
}
```

---

## 2. Backend API - Membuat Token
**File:** `app/api/payment/route.ts`

API ini menerima data dari React dan menukarnya dengan Token Midtrans.

### Kode Penting:
```typescript
export const POST = async (request: Request) => {
    // 1. TANGKAP DATA (PENTING!)
    // Membaca String JSON dari React dan mengubahnya kembali jadi Object
    const reservation = await request.json(); 

    // 2. Mapping Parameter (Menyalin Data)
    // Midtrans butuh struktur khusus. Kita salin data dari 'reservation'
    const parameter = {
        transaction_details: {
            order_id: reservation.id,         // Ambil ID
            gross_amount: reservation.Payment.amount, // Ambil Harga
        },
        customer_details: {
            first_name: reservation.User.name, // Ambil Nama
            email: reservation.User.email,    // Ambil Email
        }
    }

    // 3. Minta Token ke Midtrans
    const token = await snap.createTransactionToken(parameter);

    // 4. Kirim Token balik ke React
    return NextResponse.json({ token })
}
```

---

## 3. Webhook - Konfirmasi Pembayaran
**File:** `app/api/payment/notification/route.ts`

Ini dijalankan OTOMATIS oleh Server Midtrans setelah user bayar. React tidak terlibat.

### Kode Penting:
```typescript
export const POST = async (request: Request) => {
    // 1. TANGKAP DATA NOTIFIKASI
    // Data ini dikirim oleh Server Midtrans, bukan React
    const data = await request.json(); 
    
    // data.order_id --> ID Booking kita
    // data.transaction_status --> "settlement" (Lunas) / "pending" / "expire"

    // 2. VALIDASI KEAMANAN (Signature Key)
    // Membuat kode rahasia (Hash) untuk dicocokkan dengan milik Midtrans
    const hash = crypto.createHash('sha512').update(...).digest('hex')

    if (keyDariMidtrans !== hash) {
        return error // Tolak jika tidak cocok (Indikasi Hacker)
    }

    // 3. UPDATE DATABASE
    if (data.transaction_status === 'settlement') {
        // Cari booking di database dan set status = PAID
        await prisma.payment.update(...) 
    }
}
```

## Ringkasan Konsep "Tangkap & Kirim"

| Aksi | Di Frontend (React) | Di Backend (API) |
| :--- | :--- | :--- |
| **MENGIRIM** | `body: JSON.stringify(data)` | `return NextResponse.json(data)` |
| **MENANGKAP** | `await response.json()` | `await request.json()` |

*   **JSON.stringify**: Bungkus Object jadi Paket Teks (amplop).
*   **json()**: Buka Paket Teks jadi Object kembali.
