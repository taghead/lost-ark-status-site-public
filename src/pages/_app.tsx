import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NavBar } from "../components/NavBar";
import Head from "next/head";
import { Footer } from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <html lang="en">
      <Head>
        <title>Lost Ark Status | Is Lost Ark down?</title>
        <meta
          name="description"
          content="Unofficial Lost Ark status tracker. View server uptime, trends and more."
        />
        <meta
          name="keywords"
          content="Lost, Ark, Down, Up, Server, Status"
        ></meta>
        <meta
          property="og:title"
          content="Lost Ark Status | Is Lost Ark down?"
        />
        <meta
          property="og:description"
          content="Unofficial Lost Ark status tracker. View server uptime, trends and more."
        />
        <meta property="og:url" content="https://lostarkstatus.xyz/" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="min-h-screen max-h-screen min-w-screen max-w-screen flex flex-col">
        <NavBar />
        <div className="relative flex flex-grow h-96">
          <main className="bg-gray-100 flex-1 p-6">
            <Component {...pageProps} />
          </main>
        </div>
        <Footer />
      </div>
    </html>
  );
}

export default MyApp;
