import { ScriptData } from "@/types/script-type";
import { ScriptAction, ScriptActionType } from "@/types/scriptaction-type";
import { ChangeEvent, Dispatch, FC, useState } from "react";
import { AiFillSave, AiOutlineDownload } from "react-icons/ai";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

const MAX_NUMBER_OF_LINES = 300;
const MAX_CHARACTERS_PER_LINE = 300;

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

	return (
		<div className="paper-grid flex">
			{/* Navbar */}
			<div className="flex w-4/6 flex-col">
				<div className="absolute top-0 flex w-4/6 items-center justify-center gap-14 bg-black px-10 text-center font-vt text-2xl text-clay sm:h-16 sm:px-10 sm:text-left">
					<button className="group flex items-center gap-2 rounded-lg border-2 px-4 hover:border-electric hover:text-electric">
						Export
						<AiOutlineDownload className="fill-clay group-hover:fill-electric" />
					</button>
					<button
						className="group flex items-center gap-2 rounded-lg border-2 px-4 hover:border-electric hover:text-electric"
						onClick={handleCloseAndSave}
					>
						Save & exit
						<AiFillSave className="fill-clay group-hover:fill-electric" />
					</button>
				</div>

				{/* Code Editor */}
				<div className="min-h-screen w-full bg-black bg-opacity-10 pt-16">
					<div className="flex">
						<div className="">
							{code.split("\n").map((_, index) => (
								<div
									key={index}
									className="px-3 font-vt text-2xl text-clay"
								>
									{index + 1}
								</div>
							))}
						</div>
						<textarea
							className="flex-grow resize-none rounded-none bg-black bg-opacity-50 px-2 font-vt text-2xl text-white outline-none"
							spellCheck={false}
							value={code}
							onChange={handleCodeChange}
							placeholder={"Enter your code..." + "\n\n\n\n\n"}
						/>
					</div>
				</div>
			</div>

			{/* Output */}
			<div className="h-screen w-2/6 border-2 border-electric bg-slate-900 p-4">
				a
			</div>
		</div>
	);
};

export default EditorPage;
