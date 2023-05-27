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
										fill the game title then click{" "}
										<span className="text-lime">
											create
										</span>
										. the game will shown in the box bellow.
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
									<h2 className="my-10 text-3xl">gamelist</h2>
									<p className="">
										list of created game will be shown
										bellow. click{" "}
										<span className="text-lime">edit</span>{" "}
										button from any project that you want.
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
										from left side, then the output will be
										shown on the right side.
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
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default HowToUse;
