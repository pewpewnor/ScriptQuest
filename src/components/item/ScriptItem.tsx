import { ScriptData } from "@/types/script-type";
import { FC } from "react";

interface ScriptItemProps extends ScriptData {}

const ScriptItem: FC<ScriptItemProps> = (props: ScriptItemProps) => {
	return (
		<div
			key={props.title}
			className="h-36 overflow-hidden rounded-lg bg-black bg-opacity-50"
		>
			<h1 className="border-b-2 border-slate-800 px-4 py-2 font-vt text-2xl text-clay">
				{props.title}
			</h1>
			<div className="w-full "></div>
		</div>
	);
};

export default ScriptItem;
