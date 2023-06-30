import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Kanit } from "next/font/google";

import Modal from "react-modal";
import { AnimatePresence } from "framer-motion";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["100", "400", "700"], // Thin, Regular, Bold
  style: ["normal", "italic"],
  display: "swap",
});

function App({ Component, pageProps }: AppProps) {
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
      <AnimatePresence mode="wait" initial={false}>
        <Component {...pageProps} />
      </AnimatePresence>
    </>
  );
}

export default App;
