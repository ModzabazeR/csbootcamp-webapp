import Image from "next/image";
import BootcampLogo from "@/assets/images/logo.png";
import { FaHome, FaPersonBooth, FaShoppingBag } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import Link from "next/link";
import { NextPage } from "next";
import { motion } from "framer-motion";
import { useEffect } from "react";
import jwt, { JwtPayload } from "jsonwebtoken";
import { useRouter } from "next/router";
import { varlidateToken } from "@/utils/validateAdmin";

const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    const tokenString = localStorage.getItem("token");
    let validate: boolean = varlidateToken(tokenString);
    if (validate === null) {
      router.push('/login')
    }
    else if (validate === false) {
      router.push('/dashboard')
    }
    else if(validate === true) {
      router.push('/admin')
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col h-screen justify-center items-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
        <Image
          src={BootcampLogo}
          width={300}
          height={300}
          alt="bootcamp logo"
        />
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
    </motion.div>
  );
};

export default Home;
