import Image from "next/image";
import BootcampLogo from "@/assets/images/logo.png";
import { FaHome, FaPersonBooth, FaShoppingBag } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5"
import Link from "next/link";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
      <Image src={BootcampLogo} width={300} height={300} alt="bootcamp logo" />
      <div className="text-2xl md:text-5xl font-bold text-white drop-shadow-lg mb-8">
        CS29 Bootcamp | ยินดีต้อนรับ
      </div>
      
      {/* ปุ่มชั่วคราว */}
      <div className="flex gap-8">
        <Link
          href="/login"
          className="bg-yellow-300 hover:bg-white p-4 rounded-xl drop-shadow-lg text-white hover:text-yellow-300 text-5xl transition-all duration-300"
          >
            <IoLogIn className="drop-shadow-lg" />
        </Link>
        <Link
          href="/dashboard"
          className="bg-yellow-300 hover:bg-white p-4 rounded-xl drop-shadow-lg text-white hover:text-yellow-300 text-5xl transition-all duration-300"
        >
          <FaHome className="drop-shadow-lg" />
        </Link>
        <Link
          href="/admin"
          className="bg-yellow-300 hover:bg-white p-4 rounded-xl drop-shadow-lg text-white hover:text-yellow-300 text-5xl transition-all duration-300"
        >
          <FaPersonBooth className="drop-shadow-lg" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
