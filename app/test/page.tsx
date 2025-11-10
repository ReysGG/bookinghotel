'use client'

import { METHODS } from "http"
import { stringify } from "querystring"
import { FormEvent, useState, useTransition } from "react"

const MyForm = () => {
    const [pending, Transisi] = useTransition()

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const DataMentahForm = e.currentTarget
        console.log('Data mentah di olah :',DataMentahForm)
        const DataOlahForm = new FormData(DataMentahForm)
        console.log('Data di olah :',DataOlahForm)

        const ObjectData = Object.fromEntries(DataOlahForm) //ngubah dari data mentah ke json
        console.log('Data dibuat denan ObjectFromEnteris :',ObjectData)

        Transisi(async () => {
            try {
                const response= await fetch('/api/david/test/', {
                    method: "POST",
                    headers: {'Content-type' : 'application/json'},
                    body: JSON.stringify(ObjectData)
                })
                const data = await response.json()
                console.log(data.message)
            } catch (error) {
                console.error(error);
            }
        })
    }
    return <>
        <div className="mx-auto px-4 py-16 mt-10 max-w-screen-xl">
            <form onSubmit={onSubmit} className="grid grid-cols gap-4">
                <label>Nama</label>
                <input type="text" name="nama" placeholder="Masukan nama"/>
                <label>Email</label>
                <input type="email" name="email" placeholder="Masukan email"/>
                <button type="submit" className="bg-green-500" disabled={pending}>
                    {pending? ('Mengirim....') : ('Kirim')}
                </button>
            </form>
        </div>
    </>
}

export default MyForm