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

const LogIn: NextPage = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
      <Head>
        <title>Login | CS Bootcamp 2023</title>
      </Head>
      <Image src={BootcampLogo} width={300} height={300} alt="bootcamp logo" />
      <LogInPanel />
    </div>
  );
};

export default LogIn;
