'use client'
import { saveRoom } from "@/lib/action";
import { Amenities } from "@/lib/generated/prisma";
import { type PutBlobResult } from "@vercel/blob";
import clsx from "clsx";
import Image from "next/image";
import { useActionState, useRef, useState, useTransition } from "react"
import { IoCloudUpload, IoTrashOutline } from "react-icons/io5"
import { BarLoader } from "react-spinners";



const CreateForm = ({ amenities }: { amenities: Amenities[] }) => {
    const InputFileRef = useRef<HTMLInputElement>(null); //"Ransel ini HANYA boleh diisi dengan elemen <input> HTML."
    const [image, SetImage] = useState("")
    const [message, SetMessage] = useState("")
    const [pending, startTransition] = useTransition()

    const HandleUploadImage = () => {
        if (!InputFileRef.current?.files) return null

        const file = InputFileRef.current.files[0]
        const formData = new FormData() //"kardus kargo" standar untuk mengepak file dan data lain agar bisa dikirim lewat HTTP.
        formData.set("file", file) //"file itu namanya"


        startTransition(async () => {
            try {
                const responses = await fetch("/api/upload", {
                    method: "PUT",
                    body: formData //paket yang udh dikemas, lalu diberikan nama file dari file
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

    const deleteImage = (image: string) => {
        startTransition(async () => {
            try {
                await fetch(`/api/upload/?imageURL=${image}`, { method: "DELETE" })
                SetImage('')
            } catch (error) {
                console.log(error)
            }
        })
    }

    const [Output, FormAction, process] = useActionState(saveRoom.bind(null, image), null)

    return <>
        <form action={FormAction}>
            <div className="grid md:grid-cols-12 gap-5">
                <div className=" col-span-8 bg-white p-4">
                    <div className="mb-4">
                        <input type="text" name="name" className="py-2 px-4 rounded-sm border border-gray-400 w-full" placeholder="Room name" />
                        <div aria-live="polite" aria-atomic="true">
                            <span className="text-sm text-red-500 mt-2">{Output?.error?.name}</span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <textarea name="description" rows={8} className="py-2 px-4 rounded-sm border border-gray-400 w-full" placeholder="Deksripsi"></textarea>
                        <div aria-live="polite" aria-atomic="true">
                            <span className="text-sm text-red-500 mt-2">{Output?.error?.description}</span>
                        </div>
                    </div>
                    <div className="mb-4 grid md:grid-cols-3">

                        {amenities.map((item) => (
                            <div className="flex items-center mb-4" key={item.id}>
                                <input
                                    type="checkbox"
                                    name="amenities"
                                    defaultValue={item.id}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                                <label className="ms-2 text-sm font-md text-gray-900 capitalize">
                                    {item.name}
                                </label>
                            </div>
                        ))}

                        <div aria-live="polite" aria-atomic="true">
                            <span className="text-sm text-red-500 mt-2">{Output?.error?.amenities}</span>
                        </div>
                    </div>
                </div>
                <div className=" col-span-4 bg-white p-4">
                    <label htmlFor="input-file" className="flex flex-col mb-4 items-center justify-center aspect-video border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 relative">
                        <div className="flex flex-col items-center justify-center text-gray-500 pt-5 pb-6 z-10">
                            {pending ? <BarLoader /> : null}
                            {image ? (
                                <button type="button" onClick={() => deleteImage(image)} className="flex items-center justify-center bg-red-400 size-6 rounded-sm absolute right-1 top-1 text-white hover:bg-red-200">
                                    <IoTrashOutline className="size-4 text-white hover:text-white"></IoTrashOutline>
                                </button>
                            ) : (
                                <div className="flex flex-col items-center justify-center">
                                    <IoCloudUpload className="size-8"></IoCloudUpload>
                                    <p className="mb-1 text-sm font-bold">Select image</p>
                                    {
                                        message ? (
                                            <p className="text-xs text-red-500">{message}</p>) : (<p className="text-xs">SVG, PNG, JPG, GIF or others (max: 4MB)</p>)}
                                </div>
                            )}
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
                            <span className="text-sm text-red-500 mt-2">{Output?.error?.capacity}</span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <input type="text" name="price" className="py-2 px-4 rounded-sm border border-gray-400 w-full" placeholder="Price" />
                        <div aria-live="polite" aria-atomic="true">
                            <span className="text-sm text-red-500 mt-2">{Output?.error?.price}</span>
                        </div>
                    </div>
                    {/* General message */}
                    {
                        Output?.message ? (<>
                            <div className="mb-4 bg-red-200 p-2">
                                <span className="text-sm text-gray-700 mt-2">{Output.message}</span>
                            </div>
                        </>) : null
                    }
                    <button
                        type="submit"
                        className={clsx("bg-blue-600 text-white w-full hover:bg-blue-700 py-2.5 px-6 md:px-10 text-lg font-semibold cursor-pointer",
                            {
                                'opacity-50 cursor-progress': process
                            })}
                        disabled={process}
                    >
                        {process ? 'Save...' : 'Save'}
                    </button>
                </div>
            </div>
        </form>
    </>
}

export default CreateForm