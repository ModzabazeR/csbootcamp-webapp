import { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

import { motion } from "framer-motion";

import { validateToken } from "@/utils/validateAdmin";
import BootcampLogo from "@/assets/images/logo.png";

import LogInPanel from "@/components/loginPanel";

const LogIn: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    const tokenString = localStorage.getItem("token");
    let validate = validateToken(tokenString);

    if (validate === true) {
      router.push("/admin");
    } else if (validate === false) {
      router.push("/dashboard");
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-hidden		"
    >
      <div className="overflow-y-hidden flex flex-col h-screen justify-center items-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
        <Head>
          <title>Login | CS Bootcamp 2023</title>
        </Head>
        <Image
          src={BootcampLogo}
          width={300}
          height={300}
          alt="bootcamp logo"
        />
        <LogInPanel />
      </div>
      <footer className="overflow-hidden text-white	">
        version 30/06/23 05/25
      </footer>
    </motion.div>
  );
};

export default LogIn;
