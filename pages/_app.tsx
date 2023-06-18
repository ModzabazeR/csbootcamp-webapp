import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Modal from 'react-modal';

export default function App({ Component, pageProps }: AppProps) {
  Modal.setAppElement("#__next");
  return <Component {...pageProps} />
}
