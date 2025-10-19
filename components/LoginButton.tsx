import { FaG } from "react-icons/fa6"
import { signIn } from "@/auth"

export const LoginGoogleButton = () => {
    return (
    <>
        <form action={async () => {
            'use server'
            await signIn("google")
        }}>
            <button className="flex items-center justify-center gap-2 w-full bg-blue-800 text-white font-medium py-3 px-6 text-base rounded-md hover:bg-blue-500 cursor-pointer">
                <FaG className="size-6"></FaG>
                Sign in with google
            </button>
        </form>
    </>
    )
}
