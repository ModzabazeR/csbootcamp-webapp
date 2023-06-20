import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Modal from "react-modal";

// import { Kanit } from "next/font/google";
import Head from "next/head";

// const kanit = Kanit({
//   subsets: ["thai", "latin"],
//   weight: ["100", "400", "700"], // Thin, Regular, Bold
//   style: ["normal", "italic"],
//   display: "swap",
// });

export default function App({ Component, pageProps }: AppProps) {
  Modal.setAppElement("#__next");
  return (
    <>
      <Head>
        <title>CS Bootcamp 2023 | 29 Ways to Survive</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
