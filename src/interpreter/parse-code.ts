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
	TRUE,
	FALSE,
	DONE,
}

interface Line {
	commandType: CommandType;
	visible: Visibility;
	say?: string;
	variable?: string;
}

function parseLine(line: string): Line {
	const tokens = line.trim().split(" ");
	const first = tokens[0];

	if (first === "say") {
		const rest = tokens.slice(1, tokens.length);
		return {
			commandType: CommandType.SAY,
			visible: Visibility.FALSE,
			say: rest.join(" ") + "\n",
		};
	} else if (first === "read") {
		const second = tokens[1];
		return {
			commandType: CommandType.READ,
			visible: Visibility.FALSE,
			variable: second,
		};
	} else if (first === "pause") {
		return {
			commandType: CommandType.PAUSE,
			visible: Visibility.FALSE,
		};
	} else if (first === "exit") {
		return {
			commandType: CommandType.EXIT,
			visible: Visibility.FALSE,
		};
	} else {
		return {
			commandType: CommandType.NOTHING,
			visible: Visibility.FALSE,
		};
	}
}

export { parseLine, CommandType, Visibility };
export type { Line };
