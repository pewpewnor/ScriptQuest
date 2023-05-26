"use client";
import { ChangeEvent, FC, useState } from "react";

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

interface EditorProps {}

const Editor: FC<EditorProps> = (props: EditorProps) => {
	const [code, setCode] = useState("");

	const handleCodeChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
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
	};

	const lineNumbers = code.split("\n").map((_, index) => (
		<div key={index} className="px-2 text-white">
			{index + 1}
		</div>
	));

	return (
		<div className="flex">
			<div className="">{lineNumbers}</div>
			<textarea
				className="flex-grow resize-none rounded-none bg-black bg-opacity-25 text-white outline-none"
				value={code}
				onChange={handleCodeChange}
				placeholder={"Enter your code..." + "\n\n\n\n\n"}
			/>
		</div>
	);
};

export default Editor;
