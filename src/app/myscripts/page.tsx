"use client";
import Editor from "@/components/editor/Editor";
import Navbar from "@/components/navbar/Navbar";
import { ChangeEvent, FC, useState } from "react";

const MAX_TITLE_LENGTH = 50;

interface ScriptData {
	title: string;
	code: string;
}

interface MyScriptsProps {}

const MyScripts: FC<MyScriptsProps> = (props: MyScriptsProps) => {
	const [scripts, setScripts] = useState<ScriptData[]>([
		{
			title: "script1",
			code: "",
		},
	]);
	const [inputData, setInputData] = useState<ScriptData>({
		title: "",
		code: "",
	});

	function addScript() {
		if (inputData.title.length > MAX_TITLE_LENGTH) {
			alert(
				`Script title cannot be more than ${MAX_TITLE_LENGTH} characters`
			);
			return;
		}
		setScripts((prev) => [...prev, { title: inputData.title, code: "" }]);
	}

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		if (
			event.target.name === "title" &&
			event.target.value.length > MAX_TITLE_LENGTH
		) {
			alert(
				`Script title cannot be more than ${MAX_TITLE_LENGTH} characters`
			);
			return;
		}
		setInputData((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	}

	return (
		<>
			<Navbar leaveWarning={true} />
			<div className="flex w-full flex-col justify-around gap-16 px-10 pb-14 pt-44 sm:px-24 lg:px-56">
				<h1 className="mb-4 w-full text-center font-press text-4xl leading-normal text-electric underline sm:text-5xl md:text-6xl">
					MY SCRIPTS
				</h1>
				<div className="flex gap-4 sm:gap-10">
					<input
						type="text"
						name="title"
						onChange={handleChange}
						placeholder="script title..."
						className="w-full rounded-lg px-4 py-2 outline-none"
					/>
					<button
						className="w-40 rounded-lg bg-lime p-2 font-vt text-2xl text-dark hover:bg-electric sm:w-72"
						onClick={addScript}
					>
						Create Script
					</button>
				</div>
				<div className="flex flex-col gap-14">
					{scripts.map((script) => (
						<div
							key={script.title}
							className="h-36 rounded-lg bg-black bg-opacity-50"
						>
							<h1 className="px-4 py-2 font-vt text-2xl text-clay">
								{script.title}
							</h1>
							<hr />
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default MyScripts;
