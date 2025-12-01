import { LoginGoogleButton } from "@/components/LoginButton"
import { Metadata } from "next"

export const metadata:Metadata = {
    title: "Sign In - Hotel Hebat",
    description: "Sign in to your Hotel Hebat account to manage your reservations and access exclusive features.",
}

const SignInPage =async ({searchParams} : {searchParams?: Promise<{redirect_url?: string}>}) => {
    const params = (await searchParams)?.redirect_url
    let redirectUrl;

    if(!params){
        redirectUrl = '/'
    } else {
        redirectUrl = `/${params}`
    }
    return (
        <>
        <div className="min-h-screen flex items-center">
            <div className="bg-white w-96 mx-auto rounded-sm shadow p-8">
                <h1 className="text-4xl font-bold mb-1">Sign in</h1>
                <p className="font-md mb-5 text-gray-500">Sign in to your account</p>
                <div className="py-4 text-center">
                    <LoginGoogleButton redirectUrl={redirectUrl}></LoginGoogleButton>
                </div>
            </div>
        </div>
        </>
    )
}

export default SignInPage