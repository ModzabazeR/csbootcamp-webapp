import { useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";

import { motion } from "framer-motion";

import { IUserCredentials } from "@/typings";
import {
  getAppCookies,
  getUserJson,
} from "@/utils/validateAdmin";
import BootcampLogo from "@/assets/images/logo.png";

const Home: NextPage<{ profile: IUserCredentials | null }> = ({ profile }) => {
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token }: any = getAppCookies(req);
  const profile = getUserJson(token);
  return {
    props: {
      profile,
    },
  };
};
