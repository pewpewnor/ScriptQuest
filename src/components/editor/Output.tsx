import { CommandType, Line, parseLine } from "@/interpreter/parse-code";
import detectError from "@/interpreter/syntax-validation";
import { FC, useState } from "react";

function moveOutputForward(lines: Line[]) {
	for (const line of lines) {
		line.visible = true;
		if (
			line.commandType === CommandType.PAUSE ||
			line.commandType === CommandType.READ ||
			line.commandType === CommandType.EXIT
		) {
			break;
		}
	}
	return lines;
}

interface OutputProps {
	errors: string[];
	code: string;
}

const Output: FC<OutputProps> = (props: OutputProps) => {
	const [lines, setLines] = useState<Line[]>(
		moveOutputForward(props.code.split("\n").map((line) => parseLine(line)))
	);

	console.log(lines);

	// function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
	// 	setRead(event.target.value);
	// }

	function handlePauseSubmit() {
		moveOutputForward;
	}

	const codeOutput = lines.map((line, index) => {
		if (!line.visible) {
			return "";
		}
		switch (line.commandType) {
			case CommandType.SAY:
				return line.say;
			case CommandType.PAUSE:
				return;
			default:
				return "";
		}
	});

	return <pre className="font-vt text-2xl text-clay">{codeOutput}</pre>;
};

export default Output;
