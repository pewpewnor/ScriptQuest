import Image from "next/image";
import { FC } from "react";

interface WelcomePageProps {}

const WelcomePage: FC<WelcomePageProps> = (props: WelcomePageProps) => {
	return (
		<div className="">
			{/* Hero */}
			<div className="flex h-screen flex-col items-center justify-center gap-24 px-8 pt-8 md:px-16 mid:flex-row mid:gap-0">
				<div className="md:w-6/7 flex w-full flex-col gap-10 px-0 sm:px-12 mid:w-full">
					<p className="w-full text-center text-xl font-bold text-electric underline sm:text-left md:text-2xl">
						LET&apos;S LEARN HOW TO
					</p>
					<div className="flex flex-col gap-8 font-press text-3xl sm:text-5xl mid:text-6xl">
						<div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:justify-normal">
							<button className="min-w-min -skew-y-2 rounded-md bg-lime p-6 text-dark hover:bg-electric hover:text-clay active:bg-electric">
								SCRIPT
							</button>
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
					width={650}
					height={650}
					alt="hero"
				/>
			</div>
		</div>
	);
};

export default WelcomePage;
