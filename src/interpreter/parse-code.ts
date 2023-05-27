enum CommandType {
	NOTHING,
	SAY,
	READ,
	PAUSE,
	EXIT,
	IF,
	END,
}

interface Line {
	commandType: CommandType;
	visible: boolean;
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
			visible: false,
			say: rest.join(" ") + "\n",
		};
	} else if (first === "read") {
		const second = tokens[1];
		return {
			commandType: CommandType.READ,
			visible: false,
			variable: second,
		};
	} else if (first === "pause") {
		return {
			commandType: CommandType.PAUSE,
			visible: false,
		};
	} else if (first === "exit") {
		return {
			commandType: CommandType.EXIT,
			visible: false,
		};
	} else {
		return {
			commandType: CommandType.NOTHING,
			visible: false,
		};
	}
}

export { parseLine, CommandType };
export type { Line };
