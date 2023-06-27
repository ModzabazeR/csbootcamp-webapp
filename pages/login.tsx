// import { Kanit } from 'next/font/google'

// const kanit = Kanit({
//   subsets: ['thai'],
//   weight: '400'
// })

import Image from "next/image";
import BootcampLogo from "@/assets/images/logo.png";
import Head from "next/head";
import { NextPage } from "next";
import LogInPanel from "@/components/loginPanel";
import { motion } from "framer-motion";

const LogIn: NextPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-hidden		"
    >
      <div className="overflow-y-hidden	 flex flex-col h-screen justify-center items-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
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
      version 27/6/44 20/22
    </footer>
    </motion.div>
  );
};

export default LogIn;
