import Image from "next/image";
import { FC } from "react";

interface WelcomePageProps {}

const WelcomePage: FC<WelcomePageProps> = (props: WelcomePageProps) => {
	return (
		<div className="min-h-screen">
			{/* Hero */}
			<div className="pt-8 h-screen bg-dark paper-grid flex flex-col mid:flex-row gap-16 mid:gap-0 justify-center px-8 md:px-16 items-center">
				<div className="w-full px-0 sm:px-12 flex flex-col gap-10 md:w-6/7 mid:w-full">
					<p className="text-electric text-xl md:text-2xl font-bold underline text-center sm:text-left w-full">
						LET&apos;S LEARN HOW TO
					</p>
					<div className="font-press text-3xl sm:text-5xl mid:text-6xl flex flex-col gap-8">
						<div className="flex flex-col sm:flex-row items-center justify-center sm:justify-normal gap-8">
							<button className="bg-lime text-dark p-6 rounded-md min-w-min -skew-y-2 hover:bg-electric hover:text-clay">
								SCRIPT
							</button>
							<h1 className="text-clay">A</h1>
						</div>
						<h1 className="text-clay text-center sm:text-left leading-normal">
							TEXT-BASED GAME
						</h1>
					</div>
				</div>

				<Image
					src="/hero-image.png"
					width={650}
					height={650}
					alt="hero"
				/>
			</div>
		</div>
	);
};

export default WelcomePage;
