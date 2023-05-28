enum CommandType {
	NOTHING,
	SAY,
	READ,
	PAUSE,
	EXIT,
	IF,
	END,
}

enum Visibility {
	FALSE,
	TRUE,
	DONE,
}

interface Line {
	commandType: CommandType;
	visible: Visibility;
	ifStack: number[];
	ifId?: number;
	say?: string;
	variable?: string;
	compareTo?: string;
}

function parseLine(index: number, ifStack: number[], line: string): Line {
	const tokens = line.trim().split(" ");
	const first = tokens[0];

	if (first === "say") {
		const say = tokens.slice(1, tokens.length).join(" ") + "\n";

		return {
			commandType: CommandType.SAY,
			visible: Visibility.FALSE,
			ifStack: [...ifStack],
			say: say,
		};
	} else if (first === "read") {
		const variable = tokens[1];

		return {
			commandType: CommandType.READ,
			visible: Visibility.FALSE,
			ifStack: [...ifStack],
			variable: variable,
		};
	} else if (first === "pause") {
		return {
			commandType: CommandType.PAUSE,
			visible: Visibility.FALSE,
			ifStack: [...ifStack],
		};
	} else if (first === "exit") {
		return {
			commandType: CommandType.EXIT,
			visible: Visibility.FALSE,
			ifStack: [...ifStack],
		};
	} else if (first === "if") {
		const variable = tokens[1];
		const compareTo = tokens.slice(3, tokens.length).join(" ");

		const oldIfStack = [...ifStack];
		ifStack.push(index);
		return {
			commandType: CommandType.IF,
			visible: Visibility.FALSE,
			ifStack: [...oldIfStack],
			ifId: index,
			variable: variable,
			compareTo: compareTo,
		};
	} else if (first === "end") {
		const lastIf = ifStack.pop();
		return {
			commandType: CommandType.END,
			visible: Visibility.FALSE,
			ifStack: [...ifStack],
			ifId: lastIf,
		};
	} else {
		return {
			commandType: CommandType.NOTHING,
			visible: Visibility.FALSE,
			ifStack: [...ifStack],
		};
	}
}

function parseLines(lines: string[]) {
	const ifStack: number[] = [];

	return lines.map((line, index) => parseLine(index, ifStack, line));
}

export { parseLines, CommandType, Visibility };
export type { Line };
