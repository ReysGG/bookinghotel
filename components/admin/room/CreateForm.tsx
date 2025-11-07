'use client'
import { type PutBlobResult } from "@vercel/blob";
import Image from "next/image";
import { useRef, useState, useTransition } from "react"
import { IoCloudUpload } from "react-icons/io5"
import { BarLoader } from "react-spinners";



const CreateForm = () => {
    const InputFileRef = useRef<HTMLInputElement>(null); //"Ransel ini HANYA boleh diisi dengan elemen <input> HTML."
    const [image, SetImage] = useState("")
    const [message, SetMessage] = useState("")
    const [pending, setTransition] = useTransition()

    const HandleUploadImage = () => {
        if (!InputFileRef.current?.files) return null

        const file = InputFileRef.current.files[0]
        const formData = new FormData() //"kardus kargo" standar untuk mengepak file dan data lain agar bisa dikirim lewat HTTP.
        formData.set("file", file)


        setTransition(async () => {
            try {
                const responses = await fetch("/api/upload", {
                    method: "PUT",
                    body: formData
                })
                const data = await responses.json()
                if (responses.status !== 200) {
                    SetMessage(data.message)
                }
                const img = data as PutBlobResult
                SetImage(img.url)
            } catch (error) {
                console.log(error)
            }
        })
    }

    return <>
        <form action="">
            <div className="grid md:grid-cols-12 gap-5">
                <div className=" col-span-8 bg-white p-4">
                    <div className="mb-4">
                        <input type="text" name="name" className="py-2 px-4 rounded-sm border border-gray-400 w-full" placeholder="Room name" />
                        <div aria-live="polite" aria-atomic="true">
                            <span className="text-sm text-red-500 mt-2">message</span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <textarea name="deskripsi" rows={8} className="py-2 px-4 rounded-sm border border-gray-400 w-full" placeholder="Deksripsi"></textarea>
                        <div aria-live="polite" aria-atomic="true">
                            <span className="text-sm text-red-500 mt-2">message</span>
                        </div>
                    </div>
                    <div className="mb-4 grid md:grid-cols-3">
                        <input type="checkbox" name="amenities" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" placeholder="Room name" />
                        <label className="ms-2 text-sm font-md text-gray-900 capitalize">
                            Spa
                        </label>
                        <div aria-live="polite" aria-atomic="true">
                            <span className="text-sm text-red-500 mt-2">message</span>
                        </div>
                    </div>
                </div>
                <div className=" col-span-4 bg-white p-4">
                    <label htmlFor="input-file" className="flex flex-col mb-4 items-center justify-center aspect-video border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 relative">
                        <div className="flex flex-col items-center justify-center text-gray-500 pt-5 pb-6 z-10">
                            <div className="flex flex-col items-center justify-center">
                                {pending ? <BarLoader /> : null}
                                <IoCloudUpload className="size-8"></IoCloudUpload>
                                <p className="mb-1 text-sm font-bold">Select image</p>
                                {
                                    message ? (
                                        <p className="text-xs text-red-500">{message}</p>) : (<p className="text-xs">SVG, PNG, JPG, GIF or others (max: 4MB)</p>)}
                            </div>
                        </div>
                        {!image ? (
                            <input
                                type="file"
                                id="input-file"
                                className="hidden"
                                ref={InputFileRef}
                                onChange={HandleUploadImage} />) : (
                            <Image src={image} alt="image" width={640} height={360} className="rounded-md absolute aspect-video object-cover"></Image>
                        )
                        }

                    </label>
                    <div className="mb-4">
                        <input type="text" name="capacity" className="py-2 px-4 rounded-sm border border-gray-400 w-full" placeholder="Capacity" />
                        <div aria-live="polite" aria-atomic="true">
                            <span className="text-sm text-red-500 mt-2">message</span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <input type="text" name="price" className="py-2 px-4 rounded-sm border border-gray-400 w-full" placeholder="Price" />
                        <div aria-live="polite" aria-atomic="true">
                            <span className="text-sm text-red-500 mt-2">message</span>
                        </div>
                    </div>
                    <button type="submit" className="bg-blue-600 text-white w-full hover:bg-blue-700 py-2.5 px-6 md:px-10 text-lg font-semibold cursor-pointer">Save</button>
                </div>
            </div>
        </form>
    </>
}

export default CreateForm