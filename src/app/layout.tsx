import Navbar from "@/components/navbar/Navbar";
import { Inter } from "next/font/google";
import { FC, ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "ScriptQuest",
	description:
		"A website designed for programming aspirants to script and create text-based adventure games",
};

interface RootLayoutProps {
	children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = (props: RootLayoutProps) => {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="min-h-screen bg-dark">{props.children}</div>
			</body>
		</html>
	);
};

export default RootLayout;
