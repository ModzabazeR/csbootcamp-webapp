import { useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

import { motion } from "framer-motion";

import { IUserCredentials } from "@/typings";
import { getAppCookies, getUserJson } from "@/utils/validateAdmin";
import BootcampLogo from "@/assets/images/logo.png";

import LogInPanel from "@/components/loginPanel";

const LogIn: NextPage<{ profile: IUserCredentials | null }> = ({ profile }) => {
  const router = useRouter();

  useEffect(() => {
    if (profile === null) {
      router.push("/login");
    } else if (profile.admin === false) {
      router.push("/dashboard");
    } else if (profile.admin === true) {
      router.push("/admin");
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-hidden"
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
          priority={true}
        />
        <LogInPanel />
      </div>
      <footer className="overflow-hidden text-white	">
        version 01/07/23 13/28
      </footer>
    </motion.div>
  );
};

export default LogIn;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token } = getAppCookies(req);
  const profile = getUserJson(token);

  return {
    props: {
      profile,
    },
  };
};
