import Link from "next/link";
import { FC } from "react";

interface NavbarProps {
	leaveWarning: boolean;
}

const Navbar: FC<NavbarProps> = (props: NavbarProps) => {
	if (props.leaveWarning) {
		return (
			<div className="absolute top-0 flex h-12 w-full items-center justify-around bg-black font-vt text-2xl text-red-400">
				<p>WARNING: LEAVING THIS PAGE WILL RESULT IN LOSS OF DATA</p>
			</div>
		);
	}

	return (
		<div className="absolute top-0 flex h-12 w-full items-center justify-around bg-black font-vt text-2xl text-clay">
			<Link
				href="/"
				className="hover:text-white hover:underline active:text-white active:underline"
			>
				HOME
			</Link>
			<Link
				href="/dashboard"
				rel="noopener noreferrer"
				target="_blank"
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
