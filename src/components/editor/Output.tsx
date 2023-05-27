import {
	CommandType,
	Line,
	parseLine,
	Visibility,
} from "@/interpreter/parse-code";
import { ChangeEvent, FC, KeyboardEventHandler, useState } from "react";

function moveOutputForward(lines: Line[]) {
	for (const line of lines) {
		if (
			line.commandType === CommandType.PAUSE ||
			line.commandType === CommandType.READ ||
			line.commandType === CommandType.EXIT
		) {
			if (line.visible === Visibility.FALSE) {
				line.visible = Visibility.TRUE;
				break;
			} else {
				line.visible = Visibility.DONE;
				continue;
			}
		}
		line.visible = Visibility.TRUE;
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

	const [inputHistory, setInputHistory] = useState<string[]>([]);
	const [input, setInput] = useState<string>("");

	function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
		setInput(event.target.value);
	}

	const handlePauseSubmit: KeyboardEventHandler<HTMLInputElement> = (
		event
	) => {
		if (event.key === "Enter") {
			console.log(event.key);
			event.preventDefault();
			setLines((prev) => moveOutputForward(prev));
			setInputHistory((prev) => [...prev, input]);
			setInput("");
		}
	};

	console.log(lines);

	let prevInputIndex = 0;

	const codeOutput = lines.map((line, index) => {
		if (line.visible === Visibility.FALSE) {
			return "";
		}

		switch (line.commandType) {
			case CommandType.SAY:
				return line.say;
			case CommandType.PAUSE:
				if (line.visible === Visibility.DONE) {
					return (
						<div
							key={index}
							className="flex items-center gap-4 py-4"
						>
							&gt;&gt;
							<p>{inputHistory[prevInputIndex++]}</p>
						</div>
					);
				}
				return (
					<div key={index} className="flex items-center gap-4 py-4">
						&gt;&gt;
						<input
							type="text"
							name="input"
							className="w-full rounded-lg border-none bg-dark px-2 py-1 text-clay outline-none active:border-none active:outline-none"
							onChange={handleInputChange}
							onKeyDown={handlePauseSubmit}
							autoFocus
						/>
					</div>
				);
			default:
				return "";
		}
	});

	if (codeOutput[codeOutput.length - 1] !== "") {
		codeOutput.push(<p className="flex justify-center pt-4">[The End]</p>);
	}

	return <pre className="font-vt text-2xl text-clay">{codeOutput}</pre>;
};

export default Output;
