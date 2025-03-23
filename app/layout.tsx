import type { Metadata } from "next";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header";

export const metadata: Metadata = {
  title: 'Assignment Help',
  description: 'Get expert help with your assignments',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
