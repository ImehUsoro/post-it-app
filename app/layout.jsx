import Nav from "./auth/Nav";
import "./globals.css";
import { Roboto } from "@next/font/google";
import QueryWrapper from "./auth/QueryWrapper";

// import { Toaster } from "react-hot-toast";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body className={`mx-4 md:mx-48 xl:mx-96 ${roboto.variable} bg-gray-200`}>
        <QueryWrapper>
          {/* <Toaster /> */}
          <Nav />
          {children}
        </QueryWrapper>
      </body>
    </html>
  );
}
