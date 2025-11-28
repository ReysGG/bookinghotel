"use client"
import { createReserve } from '@/lib/action';
import { addDays } from 'date-fns';
import { useActionState, useState } from 'react';
import { DatePicker } from 'react-datepicker'

const ReserveForm = () => {
    const Startdate = new Date();
    const EndDate = addDays(Startdate, 1) // Menambahkan 1 hari dari tanggal mulai

    const [startDate, setStartDate] = useState(Startdate)
    const [endDate, setEndDate] = useState(EndDate)

    const handleDateChange = (dates: any) => {
        const [start, end] = dates;
        setStartDate(start)
        setEndDate(end)
        console.log(start, end);
    }

    // const [output,formAction, pending  ] = useActionState(createReserve.bind(null, roomID), null)
    return (
        <div>
            <form action="">
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Arival - Departure</label>
                    <DatePicker
                        selected={startDate}
                        startDate={startDate}
                        endDate={endDate}
                        minDate={new Date()}
                        onChange={handleDateChange}
                        selectsRange={true}
                        dateFormat={"dd-MM-YYYY"}
                        wrapperClassName='w-full'
                        className='py-2 px-4 rounded-md border border-gray-300 w-full'
                    ></DatePicker>
                    <div aria-live='polite' aria-atomic="true">
                        <p className='text-sm text-red-500 mt-2'>message</p>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Your name</label>
                    <input type="text" name="name" className='py-2 px-4 rounded-md border border-gray-300 w-full' placeholder='Full name' />
                    <div aria-live='polite' aria-atomic="true">
                        <p className='text-sm text-red-500 mt-2'>message</p>
                    </div>
                </div>
                 <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
                    <input type="text" name="phone" className='py-2 px-4 rounded-md border border-gray-300 w-full' placeholder='Phone number'/>
                    <div aria-live='polite' aria-atomic="true">
                        <p className='text-sm text-red-500 mt-2'>message</p>
                    </div>
                </div>
                <button className='px-10 py-3 text-center font-semibold text-white w-full bg-blue-600 rounded-sm cursor-pointer hover:bg-blue-500' type='submit'>Reserve</button>
            </form>
        </div>
    );
};

export default ReserveForm;