import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"

export default {
    providers: [Google],
    pages: {
        signIn: '/signin',
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) token.role = user.role // ngasih tau kalau token.role itu dari user.role
            return token;
        },
        session({ session, token }) { // ini jatuhnya client
            if (session.user && token.sub) {
                session.user.id = token.sub //(ID pengguna dari database).
            }
            if (session.user && token.role) {
                session.user.role = token.role //(Role pengguna dari database).
            }
            
            return session;
        },
        signIn({ user, account, profile }) {
            // 1. Cek dulu apakah object 'user' nya ada
            if (!user) {
                return false
            }

            // 2. SEKARANG kita aman untuk mengecek 'user.role'
            if (user.role === 'BANNED') {
                console.log("Login ditolak: User BANNED");
                return false // <-- Tolak login karena BANNED
            }

            // 3. Jika user ada DAN role-nya BUKAN 'BANNED'
            return true // <-- Izinkan login
        }
    }
} satisfies NextAuthConfig
