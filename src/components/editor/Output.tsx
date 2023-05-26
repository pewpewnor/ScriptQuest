import detectError from "@/interpreter/syntax-validation";
import { FC, useState } from "react";

interface OutputProps {
	code: string;
}

const Output: FC<OutputProps> = (props: OutputProps) => {
	let output = "";

	const errors = detectError(props.code);
	if (errors) {
		output = errors.join("\n\n");
	}

	return (
		<div className="relative h-screen w-2/6 overflow-y-auto border-2 border-electric bg-slate-900 p-4 text-left font-vt text-2xl text-clay">
			<pre
				className={
					errors.length ? "font-mono text-lg text-red-500" : ""
				}
			>
				{output}
			</pre>
		</div>
	);
};

export default Output;
