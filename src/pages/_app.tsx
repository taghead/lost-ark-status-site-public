import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SupportMe } from "../components/Lists";
import { NavBar } from "../components/NavBar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <html className="min-h-screen max-h-screen min-w-screen max-w-screen flex flex-col">
      <NavBar />
      <div className="relative flex flex-grow h-96">
        {/* <nav className="bg-white shadow-sm p-6 space-y-6 w-64"> Navbar </nav> */}
        <main className="bg-gray-100 flex-1 p-6">
          <Component {...pageProps} />
        </main>
      </div>
    </html>
  );
}

export default MyApp;
