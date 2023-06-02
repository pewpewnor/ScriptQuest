import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import { FC } from "react";

interface HowToUseProps {}

const HowToUse: FC<HowToUseProps> = (props: HowToUseProps) => {
	return (
		<>
			<Navbar /> <div></div>
			<div className="paper-grid grid h-screen items-center pt-12">
				<div className="paper-grid grid h-screen items-center pt-12">
					<div className="paper-grid flex flex-col items-center justify-center gap-10 bg-dark px-8 py-28 md:px-28  lg:flex-row halfxl:flex-row halfxl:gap-0">
						<div className="md:w-7/8 flex w-full flex-col items-center justify-center gap-10 px-0 sm:px-6 halfxl:w-full">
							<h1 className="-mt-10 mb-20 font-press text-5xl text-clay">
								How to{" "}
								<span className="min-w-min -skew-y-2 rounded-md bg-lime p-6 text-dark active:bg-electric">
									Use
								</span>
							</h1>
							<div className="flex flex-col items-center justify-center font-press text-clay md:flex-row">
								<div className="p-5 text-center md:mr-20 md:text-left">
									<h2 className="my-10 text-3xl">starting</h2>
									<p className="">
										fill in the game title, then click{" "}
										<span className="text-lime">
											create
										</span>
										. The new game should appear in the
										section below it.
									</p>
								</div>
								<Image
									src="/howtostarting.png"
									className="mt-5 rounded-xl border-2 shadow-lg duration-200 ease-in hover:scale-105 hover:cursor-pointer hover:border-lime"
									width={500}
									height={500}
									alt="hero"
								/>
							</div>
							<div className="flex flex-col items-center justify-center font-press text-clay md:flex-row">
								<div className="p-5 text-center md:mr-20 md:text-left">
									<h2 className="my-10 text-3xl">opening</h2>
									<p className="">
										This is the list of created games. Click
										the{" "}
										<span className="text-lime">edit</span>{" "}
										button to open the editor for the game.
									</p>
								</div>
								<Image
									src="/howtousegamelist.png"
									className="mt-5 rounded-xl border-2 shadow-lg duration-200 ease-in hover:scale-105 hover:cursor-pointer hover:border-lime"
									width={500}
									height={500}
									alt="hero"
								/>
							</div>
							<div className="flex flex-col items-center justify-center font-press text-clay md:flex-row">
								<div className="p-5 text-center md:mr-20 md:text-left">
									<h2 className="my-10 text-3xl">creating</h2>
									<p className="">
										enter your{" "}
										<span className="text-lime">code</span>{" "}
										into the editor on the left side. If
										there are no errors, click{" "}
										<span className="text-lime">run</span>{" "}
										to see the results.
									</p>
								</div>
								<Image
									src="/howtousecreating.png"
									className="mt-5 rounded-xl border-2 shadow-lg duration-200 ease-in hover:scale-105 hover:cursor-pointer hover:border-lime"
									width={500}
									height={500}
									alt="hero"
								/>
							</div>
							{/* container */}
							<div className="flex flex-col">
								<h1 className="my-20 text-center font-press text-5xl text-clay">
									command
								</h1>
								{/* subcontainer 1 */}
								<div className="flex flex-col items-center justify-center gap-20 font-press text-clay lg:flex-row">
									<div className="md:items-left md:justify-left flex flex-col items-center justify-center lg:w-2/5">
										<h2 className="mb-10 text-center text-3xl md:text-left">
											say
										</h2>
										<p className="text-center">
											<span className="text-lime">
												display
											</span>{" "}
											any text into the player&apos;s
											screen
										</p>
										<Image
											src="/samplesay.png"
											className="mt-5 rounded-xl border-2 shadow-lg duration-200 ease-in hover:scale-105 hover:cursor-pointer hover:border-lime"
											width={500}
											height={500}
											alt="hero"
										/>
									</div>
									<div className="md:items-left justify-left flex flex-col items-center justify-center lg:w-2/5">
										<h2 className="mb-10 text-center text-3xl md:text-left">
											read
										</h2>
										<p className="text-center">
											takes{" "}
											<span className="text-lime">
												input
											</span>{" "}
											from what the player typed and
											stores it into a variable
										</p>
										<Image
											src="/sampleread.png"
											className="mt-5 rounded-xl border-2 shadow-lg duration-200 ease-in hover:scale-105 hover:cursor-pointer hover:border-lime"
											width={500}
											height={500}
											alt="hero"
										/>
									</div>
								</div>
								{/* subcontainer 2 */}
								<div className="mt-20 flex flex-col items-center justify-center gap-20 font-press text-clay lg:flex-row">
									<div className="md:items-left md:justify-left flex flex-col items-center justify-center lg:w-2/5">
										<h2 className="mb-10 text-center text-3xl md:text-left">
											if
										</h2>
										<p className="text-center">
											<span className="text-lime">
												decides
											</span>{" "}
											what the code should do according to
											the variable value
										</p>
										<Image
											src="/sampleif.png"
											className="mt-5 rounded-xl border-2 shadow-lg duration-200 ease-in hover:scale-105 hover:cursor-pointer hover:border-lime"
											width={500}
											height={500}
											alt="hero"
										/>
									</div>
									<div className="md:items-left justify-left flex flex-col items-center justify-center lg:w-2/5">
										<h2 className="mb-10 text-center text-3xl md:text-left">
											pause
										</h2>
										<p className="text-center">
											stops the code until the player
											inputs the{" "}
											<span className="text-lime">
												enter
											</span>{" "}
											key
										</p>
										<Image
											src="/samplepause.png"
											className="mt-5 rounded-xl border-2 shadow-lg duration-200 ease-in hover:scale-105 hover:cursor-pointer hover:border-lime"
											width={500}
											height={500}
											alt="hero"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default HowToUse;
