import { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";

import { motion } from "framer-motion";

import { validateToken } from "@/utils/validateAdmin";
import BootcampLogo from "@/assets/images/logo.png";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const tokenString = localStorage.getItem("token");
    let validate = validateToken(tokenString);
    
    if (validate === null) {
      router.push("/login");
    } else if (validate === false) {
      router.push("/dashboard");
    } else if (validate === true) {
      router.push("/admin");
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
          priority={true}
        />
        <div className="text-2xl md:text-5xl font-bold text-white drop-shadow-lg mb-8">
          CS29 Bootcamp | ยินดีต้อนรับ
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
