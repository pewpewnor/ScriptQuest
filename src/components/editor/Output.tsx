import {
	CommandType,
	Line,
	parseLine,
	Visibility,
} from "@/interpreter/parse-code";
import { ChangeEvent, FC, KeyboardEventHandler, useState } from "react";

function replaceAll(string: string, substring: string, replacement: string) {
	const escapedSubstring = substring.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const regex = new RegExp(escapedSubstring, "g");
	return string.replace(regex, replacement);
}

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

	const [variables, setVariables] = useState({});
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
					let replacedSay = line.say;
					for (const key in variables) {
						// @ts-expect-error
						const value = variables[key];
						replacedSay = replaceAll(
							replacedSay,
							"[" + key + "]",
							value
						);
					}
					return replacedSay;
				}
				return "";
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

						setLines((prev) => moveOutputForward(prev));

						setVariables((prev) => ({
							...prev,
							[line.variable ? line.variable : ""]: input,
						}));

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

	if (codeOutput[codeOutput.length - 1] !== "") {
		// codeOutput.push(
		// 	<div key={"end"} className="py-4">
		// 		<p className="flex justify-center">[The End]</p>
		// 		<div className="flex items-center gap-4 py-2">
		// 			&gt;&gt;
		// 			<input
		// 				type="text"
		// 				name="input"
		// 				className="w-full rounded-lg border-none bg-dark px-2 py-1 text-clay outline-none active:border-none active:outline-none"
		// 				onChange={handleInputChange}
		// 				onKeyDown={handleExitSubmit}
		// 				autoFocus
		// 			/>
		// 		</div>
		// 	</div>
		// );
	}

	return <pre className="font-vt text-2xl text-clay">{codeOutput}</pre>;
};

export default Output;
