import Link from "next/link";
import { FC } from "react";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = (props: NavbarProps) => {
	return (
		<div className="absolute top-0 flex h-12 w-full items-center justify-around bg-black font-vt text-2xl text-clay">
			<Link
				href="/home"
				className="hover:text-white hover:underline active:text-white active:underline"
			>
				HOME
			</Link>
			<Link
				href="/dashboard"
				className="hover:text-white hover:underline active:text-white active:underline"
			>
				DASHBOARD
			</Link>
			<Link
				href="/purpose"
				className="hover:text-white hover:underline active:text-white active:underline"
			>
				PURPOSE
			</Link>
		</div>
	);
};

export default Navbar;
