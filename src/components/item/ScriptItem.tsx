import { ScriptData } from "@/types/script-type";
import { ScriptAction, ScriptActionType } from "@/types/scriptaction-type";
import { Dispatch, FC } from "react";
import { AiFillDelete } from "react-icons/ai";

interface ScriptItemProps extends ScriptData {
	dispatchScripts: Dispatch<ScriptAction>;
}

const ScriptItem: FC<ScriptItemProps> = (props: ScriptItemProps) => {
	function handleDelete() {
		props.dispatchScripts({
			type: ScriptActionType.DELETE,
			payload: { title: props.title },
		});
	}

	function handleEdit() {
		props.dispatchScripts({
			type: ScriptActionType.EDIT,
			payload: { title: props.title },
		});
	}

	return (
		<div key={props.title} className="rounded-lg bg-black bg-opacity-50">
			{/* Top */}
			<div className="flex items-center justify-between px-4 py-2 ">
				<h1 className="overflow-hidden font-vt text-2xl text-clay">
					{props.title}
				</h1>

				<div className="flex items-center gap-4">
					{/* <MdOutlineDriveFileRenameOutline className="h-6 w-6 cursor-pointer fill-lime hover:fill-clay" /> */}
					<AiFillDelete
						className="h-6 w-6 cursor-pointer fill-red-500 hover:fill-red-400"
						onClick={handleDelete}
					/>
				</div>
			</div>

			<div className="border-b-2 border-slate-800"></div>

			{/* Bottom */}
			<div className="relative h-36">
				<button
					className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-lime px-6 py-2 font-vt text-xl hover:bg-electric hover:text-clay"
					onClick={handleEdit}
				>
					Edit
				</button>
			</div>
		</div>
	);
};

export default ScriptItem;
