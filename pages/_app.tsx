import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Modal from "react-modal";

import { Kanit } from "next/font/google";
import Head from "next/head";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["100", "400", "700"], // Thin, Regular, Bold
  style: ["normal", "italic"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  Modal.setAppElement("#__next");
  return (
    <>
      <Head>
        <title>CS Bootcamp 2023 | 29 Ways to Survive</title>
      </Head>
      <style jsx global>{`
        html {
          font-family: ${kanit.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
