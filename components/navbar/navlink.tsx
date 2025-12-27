"use client";

import clsx from "clsx"; //Buat bikin class dinamis
import Link from "next/link";
import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5"; // icon menu dan close
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

const NavLink = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession(); // ubah nama 'data' menjadi 'session' untuk kemudahan pemahaman

  //setOpen(!open) Artinya, jika open bernilai true, maka akan diubah menjadi false, dan sebaliknya.
  return (
    <>
      {session?.user ? (
        <div className="flex justify-end items-center md:order-2 ">
          <div className="hidden text-sm bg-gray-50 border rounded-full md:me-0 md:block focus:ring-4 focus:ring-gray-300">
            <Image
              src={session.user.image || "/Frontendimage/avatar.svg"}
              width={64}
              height={64}
              alt="avatar"
              className="size-8 rounded-full"
            ></Image>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => signOut()}
              className="md:block hidden py-2 px-4 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-sm cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : null}

      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center p-2 justify-center text-sm text-gray-500 rounded-md md:hidden hover:bg-gray-100"
      >
        {!open ? (
          <IoMenu className="size-8"></IoMenu>
        ) : (
          <IoClose className="size-8"></IoClose>
        )}
      </button>
      <div
        className={clsx("w-full md:block md:w-auto", {
          hidden: !open,
        })}
      >
        <ul
          className="
    flex flex-col          ← MOBILE FIRST (vertikal)
    font-semibold 
    text-sm uppercase
    p-4 mt-4               ← MOBILE: ada padding & margin
    rounded-sm 
    bg-gray-50             ← MOBILE: background abu
    
    md:flex-row            ← DESKTOP: horizontal
    md:items-center        ← DESKTOP: center alignment
    md:space-x-10          ← DESKTOP: jarak horizontal
    md:p-0 md:mt-0         ← DESKTOP: hilangkan padding/margin
    md:border-0
    md:bg-white            ← DESKTOP: background putih
"
        >
          <li>
            <Link
              href="/"
              className="block py-2 px-3 text-gray-800 hover:bg-gray-200 rounded-sm md:hover:bg-transparent md:p-0"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="block py-2 px-3 text-gray-800 hover:bg-gray-200 rounded-sm md:hover:bg-transparent md:p-0"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/room"
              className="block py-2 px-3 text-gray-800 hover:bg-gray-200 rounded-sm md:hover:bg-transparent md:p-0"
            >
              Room
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="block py-2 px-3 text-gray-800 hover:bg-gray-200 rounded-sm md:hover:bg-transparent md:p-0"
            >
              Contact
            </Link>
          </li>
          {session && (
            <>
              <li>
                <Link
                  href="/myreservation"
                  className="block py-2 px-3 text-gray-800 hover:bg-gray-200 rounded-sm md:hover:bg-transparent md:p-0"
                >
                  My Reservation
                </Link>
              </li>
              {session.user.role === "admin" && (
                <>
                  <li>
                    <Link
                      href="/admin/dashboard"
                      className="block py-2 px-3 text-gray-800 hover:bg-gray-200 rounded-sm md:hover:bg-transparent md:p-0"
                    >
                      Admin Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/room"
                      className="block py-2 px-3 text-gray-800 hover:bg-gray-200 rounded-sm md:hover:bg-transparent md:p-0"
                    >
                      Manage Room
                    </Link>
                  </li>
                </>
              )}
            </>
          )}
          {!session ? (
            <>
              <li className="pt-4 md:pt-0">
                <Link
                  href="/signin"
                  className={`py-3 px-12 bg-blue-400 text-white hover:bg-blue-600 rounded-sm`}
                >
                  Sign in
                </Link>
              </li>
            </>
          ) : (
            <li className="pt-4 md:pt-0">
              <button
                onClick={() => signOut}
                className={`md:hidden py-3 px-10 bg-red-400 text-white hover:bg-red-600 rounded-sm cursor-pointer `}
              >
                Log Out
              </button>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default NavLink;
