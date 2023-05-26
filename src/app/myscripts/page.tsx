"use client";
import Editor from "@/components/editor/Editor";
import ScriptItem from "@/components/item/ScriptItem";
import Navbar from "@/components/navbar/Navbar";
import { DEFAULT_SCRIPTDATA_VALUE, ScriptData } from "@/types/script-type";
import { ChangeEvent, FC, useState } from "react";

const MAX_TITLE_LENGTH = 30;

interface MyScriptsProps {}

const MyScripts: FC<MyScriptsProps> = (props: MyScriptsProps) => {
	const [scripts, setScripts] = useState<ScriptData[]>([]);
	const [inputData, setInputData] = useState<ScriptData>(
		DEFAULT_SCRIPTDATA_VALUE
	);

	function addScript() {
		if (inputData.title.length > MAX_TITLE_LENGTH) {
			alert(
				`Script title cannot be more than ${MAX_TITLE_LENGTH} characters`
			);
			return;
		} else if (inputData.title.length === 0) {
			alert("Script title cannot be empty");
			return;
		} else if (scripts.some((script) => script.title === inputData.title)) {
			alert("Script title must be unique");
			return;
		}

		setScripts((prev) => [
			{ ...DEFAULT_SCRIPTDATA_VALUE, title: inputData.title },
			...prev,
		]);
		setInputData(DEFAULT_SCRIPTDATA_VALUE);
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
			<div className="flex w-full flex-col justify-around gap-16 px-10 pb-14 pt-44 sm:px-24 lg:px-96">
				<h1 className="text-center font-vt text-4xl text-clay">
					Create a new script to begin!
				</h1>
				<div className="flex flex-col items-center justify-center gap-x-4 gap-y-8 sm:flex-row sm:gap-10">
					<input
						type="text"
						name="title"
						value={inputData.title}
						onChange={handleChange}
						placeholder="Script title..."
						className="w-full rounded-3xl bg-slate-900 px-6 py-2 font-vt text-2xl text-clay outline-none"
					/>
					<button
						className="w-40 rounded-3xl bg-lime p-2 font-vt text-2xl text-dark hover:bg-electric hover:text-clay sm:w-72"
						onClick={addScript}
					>
						Create
					</button>
				</div>
				<div className="flex flex-col gap-14">
					{scripts.map((script) => (
						<ScriptItem key={script.title} {...script} />
					))}
				</div>
			</div>
		</>
	);
};

export default MyScripts;
