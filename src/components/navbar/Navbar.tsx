import Link from "next/link";
import { FC } from "react";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = (props: NavbarProps) => {
	return (
		<div className="absolute top-0 flex h-12 w-full items-center justify-around bg-black font-vt text-2xl text-clay">
			<Link
				href="/"
				className="hover:text-white hover:underline active:text-white active:underline"
			>
				HOME
			</Link>
			<Link
				href="/myscripts"
				rel="noopener noreferrer"
				target="_blank"
				className="hover:text-white hover:underline active:text-white active:underline"
			>
				MY GAMES
			</Link>
			<Link
				href="/howtouse"
				className="hover:text-white hover:underline active:text-white active:underline"
			>
				HOW TO USE
			</Link>
		</div>
	);
};

export default Navbar;
