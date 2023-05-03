/* eslint-disable react/no-unescaped-entities */
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="/desktop_pc/scene.gltf"
          rel="preload"
          as="fetch"
          crossOrigin="anonymous"
        />
        <title>Portfolio | IshanSingla's Portfolio"</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
