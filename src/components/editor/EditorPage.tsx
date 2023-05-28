"use client";
import detectError from "@/interpreter/syntax-validation";
import { ScriptData } from "@/types/script-type";
import { ScriptAction, ScriptActionType } from "@/types/scriptaction-type";
import { ChangeEvent, Dispatch, FC, KeyboardEvent, useState } from "react";
import { AiFillSave, AiOutlineDownload } from "react-icons/ai";
import { BsFillSquareFill, BsPlayFill } from "react-icons/bs";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import Output from "./Output";

const MAX_NUMBER_OF_LINES = 300;
const MAX_CHARACTERS_PER_LINE = 500;

function exceedMaxNumberOfLines(lines: string[]) {
	return lines.length > MAX_NUMBER_OF_LINES;
}

function exceedMaxCharactersPerLine(lines: string[]) {
	for (const line of lines) {
		if (line.length > MAX_CHARACTERS_PER_LINE) {
			return true;
		}
	}
	return false;
}

interface EditorPageProps extends ScriptData {
	dispatchScripts: Dispatch<ScriptAction>;
	closeEditor: () => void;
}

const EditorPage: FC<EditorPageProps> = (props: EditorPageProps) => {
	const [title, setTitle] = useState(props.title);
	const [code, setCode] = useState(props.code);

	const [showRename, setShowRename] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [hideButton, setHideButton] = useState(true);

	function handleCodeChange(event: ChangeEvent<HTMLTextAreaElement>) {
		const input = event.target.value;
		const lines = input.split("\n");

		if (exceedMaxNumberOfLines(lines)) {
			alert(`Code cannot be longer than ${MAX_NUMBER_OF_LINES} lines!`);
			return;
		} else if (exceedMaxCharactersPerLine(lines)) {
			alert(
				`Each line cannot be exceed ${MAX_CHARACTERS_PER_LINE} characters!`
			);
			return;
		}

		setCode(input);
		setIsPlaying(false);
	}

	function handleCloseAndSave() {
		props.dispatchScripts({
			type: ScriptActionType.SAVECODE,
			payload: { title: props.title, code: code },
		});
		props.dispatchScripts({
			type: ScriptActionType.RENAME,
			payload: { title: props.title, newTitle: title },
		});
		props.closeEditor();
	}

	function handleTabKey(event: KeyboardEvent<HTMLTextAreaElement>) {
		if (event.key === "Tab") {
			event.preventDefault();
			const { selectionStart, selectionEnd } = event.currentTarget;
			const textarea = event.currentTarget as HTMLTextAreaElement;
			const value = textarea.value;
			const newValue =
				value.substring(0, selectionStart) +
				"    " +
				value.substring(selectionEnd);
			textarea.value = newValue;
			textarea.setSelectionRange(selectionStart + 4, selectionStart + 4);
		}
	}

	function handlePlayClicked() {
		setIsPlaying((prev) => !prev);
	}

	const errors = detectError(code);

	return (
		<div className="paper-grid flex flex-col md:flex-row">
			{/* Navbar */}
			<div className="flex flex-col md:w-4/6">
				<div className="absolute top-0 flex w-full items-center justify-around gap-14 bg-black px-10 text-center font-vt text-2xl text-clay sm:h-16 sm:px-10 sm:text-left md:w-4/6">
					<h1 className="group flex items-center justify-center gap-2 rounded-lg p-2 font-press text-lg text-clay">
						{showRename ? (
							<input
								type="text"
								name="title"
								value={title}
								placeholder="Enter new title..."
								onChange={(event) => {
									setTitle(event.target.value);
								}}
								className="bg-black px-2"
								spellCheck={false}
							/>
						) : (
							title
						)}
						<MdOutlineDriveFileRenameOutline
							className="h-6 w-6 cursor-pointer fill-clay group-hover:fill-electric"
							onClick={() => {
								setShowRename((prev) => !prev);
								setHideButton(!hideButton);
							}}
						/>
					</h1>

					{hideButton && (
						<div className="flex flex-row gap-10 md:gap-20">
							<button className="group flex items-center gap-2 rounded-lg border-2 px-4 hover:border-electric hover:text-electric">
								Export
								<AiOutlineDownload className="fill-clay group-hover:fill-electric" />
							</button>
							<button
								className="group flex items-center gap-2 rounded-lg border-2 px-4 hover:border-electric hover:text-electric"
								onClick={handleCloseAndSave}
							>
								exit
								<AiFillSave className="fill-clay group-hover:fill-electric" />
							</button>
							{isPlaying ? (
								<button
									className="group flex items-center justify-center gap-1 rounded-lg bg-red-500 px-2 font-vt text-2xl font-bold text-slate-900 hover:bg-electric"
									onClick={handlePlayClicked}
								>
									STOP
									<BsFillSquareFill className="h-4 w-4 fill-slate-900 " />
								</button>
							) : (
								<button
									className="group flex items-center justify-center gap-1 rounded-lg bg-lime px-2 font-vt text-2xl font-bold text-slate-900 hover:bg-electric"
									onClick={handlePlayClicked}
								>
									PLAY
									<BsPlayFill className="h-5 w-5 fill-slate-900 " />
								</button>
							)}
						</div>
					)}
				</div>

				{/* Code Editor */}
				<div className="w-full bg-black bg-opacity-10 pt-16 md:min-h-screen">
					<div className="flex h-full overflow-x-auto">
						<div className="">
							{code.split("\n").map((_, index) => (
								<div
									key={index}
									className="px-3 font-mono text-lg text-clay"
								>
									{index + 1}
								</div>
							))}
						</div>
						<textarea
							className="flex-grow resize-none overflow-x-auto whitespace-pre rounded-none bg-black bg-opacity-50 px-2 font-mono text-lg text-white outline-none"
							spellCheck={false}
							value={code}
							onChange={handleCodeChange}
							onKeyDown={handleTabKey}
							placeholder={"Enter your code..."}
						/>
					</div>
				</div>
			</div>

			{/* Output */}

			<div className="fixed right-0 top-0 h-60 w-full overflow-y-auto  border-2 border-electric bg-slate-900 p-4 text-left md:h-screen md:w-2/6">
				{errors.length ? (
					<pre className="font-mono text-lg text-red-500">
						{errors.join("\n\n")}
					</pre>
				) : isPlaying ? (
					<Output
						errors={detectError(code)}
						code={code}
						stopPlaying={() => setIsPlaying(false)}
					/>
				) : (
					<h1 className="mt-4 text-center font-vt text-3xl text-clay">
						Click play to start the game
					</h1>
				)}
			</div>
		</div>
	);
};

export default EditorPage;
