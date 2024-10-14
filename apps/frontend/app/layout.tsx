import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "./theme.config.css"
import "@radix-ui/themes/styles.css"
import { Theme } from "@radix-ui/themes"
import { Providers } from "./context"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TechDinner 2.0",
  description: "Techdinner, sistema de pedidos para pizzarias e lanchonetes.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme appearance="dark" accentColor="orange" scaling="90%">
          <Providers>{children}</Providers>
        </Theme>
        <ToastContainer
          position="top-right"
          className={"z-50"}
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </body>
    </html>
  )
}
