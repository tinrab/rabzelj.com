import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Roboto as FontSans } from "next/font/google";

const fontSans = FontSans({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "Tin Rabzelj",
	description: "Tin Rabzelj's personal website",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable,
				)}
			>
				{children}
			</body>
		</html>
	);
}
