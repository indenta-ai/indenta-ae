import { useEffect } from "react";
import "../../style/style.css";
import "../../public/assets/css/style.css";
import useMagneticHover from "../hooks/useMagneticHover";
import useButtonHover from "../hooks/useButtonHover";
import SmoothPageScroll from "../utils/SmoothPageScroll";
import ScrollTopBtn from "../components/common/ScrollTopBtn";
import Head from "next/head";
import { ScrollProvider } from "../components/Home2/ScrollContext";
export default function App({ Component, pageProps }) {
  useButtonHover();
  useMagneticHover();
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return (
    <>
      <Head>
        <title>Indenta Solution</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="icon"
          href="favicon.ico"
          type="image/gif"
          sizes="20x20"
        />
      </Head>
      <ScrollProvider>
        <Component {...pageProps} />
      </ScrollProvider>
      <ScrollTopBtn />
      <SmoothPageScroll />
    </>
  );
}
