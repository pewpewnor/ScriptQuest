import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface WelcomePageProps {}

const WelcomePage: FC<WelcomePageProps> = (props: WelcomePageProps) => {
	return (
		<>
			<Navbar />
			<div className="md: my-4 text-lg font-bold text-red-500 md:flex md:text-xl lg:text-3xl"></div>
			<div className="paper-grid grid h-screen items-center pt-12">
				{/* Hero */}
				<div className="paper-grid flex flex-col items-center justify-center gap-10 bg-dark px-8 py-28 md:px-16  lg:flex-row halfxl:flex-row halfxl:gap-0">
					<div className="flex w-full flex-col items-center justify-center gap-10 px-0 sm:px-6 md:w-2/3 halfxl:w-full">
						<p className="w-full text-center font-press text-lime sm:text-left">
							LET&apos;S LEARN HOW TO
						</p>
						<div className="flex flex-col gap-8 font-press text-3xl sm:text-4xl halfxl:text-5xl">
							<div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:justify-normal">
								<Link
									href="/mygames"
									rel="noopener noreferrer"
									target="_blank"
									className="min-w-min -skew-y-2 rounded-md bg-lime p-6 text-dark hover:bg-electric hover:text-clay active:bg-electric"
								>
									SCRIPT
								</Link>
								<h1 className="text-clay">A</h1>
							</div>
							<h1 className="text-center leading-normal text-clay sm:text-left">
								TEXT-BASED GAME
							</h1>
						</div>
					</div>
					<Image
						src="/hero-image.png"
						className="rounded-xl border-2 shadow-lg duration-200 ease-in hover:scale-105 hover:cursor-pointer hover:border-lime"
						width={600}
						height={600}
						alt="hero"
					/>
				</div>
				{/* Purpose */}
				<div className="paper-grid flex flex-col items-center justify-center gap-20 bg-dark px-8 py-14 md:px-16 halfxl:flex-row halfxl:gap-0">
					<h1 className="text-center font-press text-5xl leading-normal text-clay">
						PURPOSE
					</h1>
					<div className="-mt-10 flex flex-col gap-2">
						<div className="mb-10 flex flex-col items-center justify-center p-5 md:flex-row">
							<Image
								src="/profile.jpg"
								className="w-40 rounded-full border-2"
								width={600}
								height={600}
								alt="profile"
							/>
							<div className="items-center justify-center md:ml-10">
								<h2 className="my-5 text-center font-press text-2xl text-clay text-lime md:my-0 md:mb-5 md:text-left">
									Norbert Oliver
								</h2>
								<p className="text-center font-press text-clay md:pt-0 md:text-left">
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Iste sapiente aut porro in
									officiis ullam odit.
								</p>
							</div>
						</div>
						<div className="flex flex-col items-center justify-center p-5 md:flex-row">
							<Image
								src="/profile.jpg"
								className="w-40 rounded-full border-2"
								width={600}
								height={600}
								alt="profile"
							/>
							<div className="items-center justify-center md:ml-10">
								<h2 className="my-5 text-center font-press text-2xl text-clay text-lime md:my-0 md:mb-5 md:text-left">
									Steven
								</h2>
								<p className="text-center font-press text-clay md:pt-0 md:text-left">
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Iste sapiente aut porro in
									officiis ullam odit.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default WelcomePage;
