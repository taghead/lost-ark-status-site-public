import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NavBar } from "../components/NavBar";
import Head from "next/head";
import { Footer } from "../components/Footer";
import { NextSeo } from "next-seo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="min-h-screen max-h-screen min-w-screen max-w-screen flex flex-col">
        <NavBar />
        <div className="relative flex flex-grow h-full">
          <main className="bg-gray-100 flex-1 p-6">
            <NextSeo
              title="Lost Ark Status"
              description="Is Lost Ark down? The unofficial Lost Ark status tracker. View server uptime, trends and more."
              canonical="https://lostarkstatus.xyz/"
              openGraph={{
                url: "https://lostarkstatus.xyz/",
                title: "Lost Ark Status",
                description:
                  "Is Lost Ark down? The unofficial Lost Ark status tracker. View server uptime, trends and more.",
                images: [
                  {
                    url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/preview.jpg`,
                    width: 900,
                    height: 400,
                    alt: "Lost Ark Status",
                    type: "image/jpeg",
                  },
                ],
                site_name: "Lost Ark Status",
              }}
              twitter={{
                handle: "@handle",
                site: "@site",
                cardType: "summary_large_image",
              }}
            />
            <Component {...pageProps} />
          </main>
        </div>
        <Footer />
      </div>
    </html>
  );
}

export default MyApp;
