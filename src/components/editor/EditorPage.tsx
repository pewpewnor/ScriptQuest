import { ScriptAction } from "@/types/scriptaction-type";
import { Dispatch, FC } from "react";
import ScriptNavbar from "../navbar/ScriptNavbar";
import Editor from "./Editor";

interface EditorPageProps {
	dispatchScripts: Dispatch<ScriptAction>;
}

const EditorPage: FC<EditorPageProps> = (props: EditorPageProps) => {
	return (
		<>
			<ScriptNavbar />
			<div className="pt-12">
				{/* Ribbon */}
				<div className="absolute top-0 flex  w-full items-center justify-around bg-black px-14 text-center font-vt text-2xl text-red-400 sm:h-12 sm:px-0 sm:text-left">
					<h1></h1>
					<button>Save</button>
					<button>Export</button>
				</div>

				{/* Code Editor */}
				<Editor />
			</div>
		</>
	);
};

export default EditorPage;
