import {
	CommandType,
	Line,
	parseLines,
	Visibility,
} from "@/interpreter/parse-code";
import { ChangeEvent, FC, KeyboardEventHandler, useState } from "react";

function replaceAll(string: string, substring: string, replacement: string) {
	const escapedSubstring = substring.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const regex = new RegExp(escapedSubstring, "g");
	return string.replace(regex, replacement);
}

function getReplacedString(
	string: string,
	variables: { [key: string]: string }
) {
	let replacedString = string;
	for (const key in variables) {
		const value = variables[key];
		replacedString = replaceAll(replacedString, "[" + key + "]", value);
	}
	return replacedString;
}

function moveOutputForward(
	index: number,
	lines: Line[],
	variables: { [key: string]: string }
) {
	const trueIfs: number[] = [];

	for (let i = index; i < lines.length; i++) {
		const line = lines[i];

		console.log(trueIfs);

		if (!line.ifStack.every((ifId) => trueIfs.includes(ifId))) {
			line.visible = Visibility.FALSE;
			continue;
		}

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
			}
		} else if (line.commandType === CommandType.IF && line.variable) {
			line.visible = Visibility.FALSE;
			if (
				variables[line.variable] ===
				(line.compareTo
					? getReplacedString(line.compareTo, variables)
					: line.compareTo)
			) {
				trueIfs.push(line.ifId ? line.ifId : -1);
			}
		} else if (line.commandType === CommandType.END) {
			line.visible = Visibility.FALSE;
		} else {
			line.visible = Visibility.TRUE;
		}
	}
	return lines;
}

interface OutputProps {
	errors: string[];
	code: string;
	stopPlaying: () => void;
}

const Output: FC<OutputProps> = (props: OutputProps) => {
	const [variables, setVariables] = useState({});
	const [inputHistory, setInputHistory] = useState<string[]>([]);
	const [input, setInput] = useState<string>("");

	const [lines, setLines] = useState<Line[]>(
		moveOutputForward(0, parseLines(props.code.split("\n")), variables)
	);

	console.log(lines);

	function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
		setInput(event.target.value);
	}

	const handlePauseSubmit: KeyboardEventHandler<HTMLInputElement> = (
		event
	) => {
		if (event.key === "Enter") {
			event.preventDefault();

			setLines((prev) => moveOutputForward(0, prev, variables));

			setInputHistory((prev) => [...prev, input]);
			setInput("");
		}
	};

	const handleExitSubmit: KeyboardEventHandler<HTMLInputElement> = (
		event
	) => {
		if (event.key === "Enter") {
			event.preventDefault();
			props.stopPlaying();
		}
	};

	let prevInputIndex = 0;

	const codeOutput = lines.map((line, index) => {
		if (line.visible === Visibility.FALSE) {
			return "";
		}

		switch (line.commandType) {
			case CommandType.SAY:
				if (line.say) {
					return getReplacedString(line.say, variables);
				}
			case CommandType.PAUSE:
				if (line.visible === Visibility.DONE) {
					return (
						<div key={index} className="py-4">
							Press enter to continue...
						</div>
					);
				}
				return (
					<div key={index} className="py-4">
						Press enter to continue...
						<div className="flex items-center gap-4 py-2">
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
			case CommandType.EXIT:
				return (
					<div key={"end"} className="py-4">
						<p className="flex justify-center">[The End]</p>
						<div className="flex items-center gap-4 py-2">
							&gt;&gt;
							<input
								type="text"
								name="input"
								className="w-full rounded-lg border-none bg-dark px-2 py-1 text-clay outline-none active:border-none active:outline-none"
								onChange={handleInputChange}
								onKeyDown={handleExitSubmit}
								autoFocus
							/>
						</div>
					</div>
				);
			case CommandType.READ:
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

				const handleReadSubmit: KeyboardEventHandler<
					HTMLInputElement
				> = (event) => {
					if (event.key === "Enter") {
						event.preventDefault();

						setVariables((prev) => ({
							...prev,
							[line.variable ? line.variable : ""]: input,
						}));

						// This must be done due to variables won't be updated immidiately
						const newVariables = {
							...variables,
							[line.variable ? line.variable : ""]: input,
						};

						setLines((prev) =>
							moveOutputForward(0, prev, newVariables)
						);

						setInputHistory((prev) => [...prev, input]);
						setInput("");
					}
				};

				return (
					<div key={index} className="flex items-center gap-4 py-4">
						&gt;&gt;
						<input
							type="text"
							name="input"
							className="w-full rounded-lg border-none bg-dark px-2 py-1 text-clay outline-none active:border-none active:outline-none"
							onChange={handleInputChange}
							onKeyDown={handleReadSubmit}
							autoFocus
						/>
					</div>
				);
			default:
				return "";
		}
	});

	return <pre className="font-vt text-2xl text-clay">{codeOutput}</pre>;
};

export default Output;
