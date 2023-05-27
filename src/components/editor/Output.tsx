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
	stopPlaying: () => void;
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
			event.preventDefault();
			setLines((prev) => moveOutputForward(prev));
			setInputHistory((prev) => [...prev, input]);
			setInput("");
		}
	};

	const handlePauseExit: KeyboardEventHandler<HTMLInputElement> = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			props.stopPlaying();
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
						<div className="py-4">Press enter to continue...</div>
					);
				}
				return (
					<div className="py-4">
						Press enter to continue...
						<div
							key={index}
							className="flex items-center gap-4 py-2"
						>
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
					</div>
				);
			default:
				return "";
		}
	});

	/*
	<div className="py-4">
							Press enter to continue...
							<div
								key={index}
								className="flex items-center gap-4 py-2"
							>
								&gt;&gt;
								<p>{inputHistory[prevInputIndex++]}</p>
							</div>
						</div>
	*/

	if (codeOutput[codeOutput.length - 1] !== "") {
		codeOutput.push(
			<div className="py-4">
				<p className="flex justify-center">[The End]</p>
				<div className="flex items-center gap-4 py-2">
					&gt;&gt;
					<input
						type="text"
						name="input"
						className="w-full rounded-lg border-none bg-dark px-2 py-1 text-clay outline-none active:border-none active:outline-none"
						onChange={handleInputChange}
						onKeyDown={handlePauseExit}
						autoFocus
					/>
				</div>
			</div>
		);
	}

	return <pre className="font-vt text-2xl text-clay">{codeOutput}</pre>;
};

export default Output;
