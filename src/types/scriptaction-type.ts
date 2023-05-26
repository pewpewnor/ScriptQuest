import { ScriptData } from "./script-type";

enum ScriptActionType {
	ADD,
	DELETE,
	RENAME,
	EDIT,
}

interface ScriptActionPayload {
	title?: string;
	newTitle?: string;
	newScript?: ScriptData;
}

interface ScriptAction {
	type: ScriptActionType;
	payload: ScriptActionPayload;
}

export type { ScriptAction, ScriptActionPayload };
export { ScriptActionType };
