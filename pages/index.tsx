// import { Kanit } from 'next/font/google'

// const kanit = Kanit({
//   subsets: ['thai'],
//   weight: '400'
// })

import Image from "next/image";
import BootcampLogo from "@/assets/images/logo.png";
import { FaShoppingBag } from "react-icons/fa";
import Link from "next/link";
import Head from "next/head";

export default function Home() {
  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
      <Head>
        <title>CS Bootcamp 2023 | 29 Ways to Survive</title>
      </Head>
      <Image src={BootcampLogo} width={500} height={500} alt="bootcamp logo" />
      <div className="text-2xl md:text-5xl font-bold text-white drop-shadow-lg mb-8">
        CS29 Bootcamp | ยินดีต้อนรับ
      </div>

      {/* ปุ่มชั่วคราว */}
      <Link
        href="/store"
        className="bg-yellow-300 hover:bg-white p-4 rounded-xl drop-shadow-lg text-white hover:text-yellow-300 text-5xl transition-all duration-300"
      >
        <FaShoppingBag className="drop-shadow-lg" />
      </Link>
    </div>
  );
}
