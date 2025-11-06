import { type DefaultSession  } from "next-auth";
import { type JWT } from "next-auth/jwt";


//File authjs.d.ts Anda menggunakan fitur TypeScript yang disebut "Module Augmentation" (Augmentasi Modul) untuk "menyuntikkan" atau memperbarui tipe default dari NextAuth.

declare module "next-auth" {
    interface Session{
        user : User & DefaultSession["user"];
    }
    interface User {
        role: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        sub: string;
        role: string;
    }
}