import type {Metadata} from "next";
import localFont from "next/font/local";
import "../../../globals.css";
import Header from "@/app/(admin)/dashboard/(index)/_components/header";
import Sidebar from "@/app/(admin)/dashboard/(index)/_components/sidebar";
import {getUser} from "@/lib/auth";
import {redirect} from "next/navigation";

const geistSans = localFont({
    src: "../../../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "../../../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Generated by create next app",
};

export default async function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const {session} = await getUser();

    if  (!session) {
        return redirect('/dashboard/sign-in')
    }

    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <Sidebar />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <Header />
                <main
                    className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                    {children}
                </main>
            </div>
        </div>
        </body>
        </html>
    );
}
