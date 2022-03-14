import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NavBar } from "../components/NavBar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <html lang="en">
      <div className="min-h-screen max-h-screen min-w-screen max-w-screen flex flex-col">
        <NavBar />
        <div className="relative flex flex-grow h-96">
          <main className="bg-gray-100 flex-1 p-6">
            <Component {...pageProps} />
          </main>
        </div>
      </div>
    </html>
  );
}

export default MyApp;
