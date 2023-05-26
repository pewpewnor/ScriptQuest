import { ScriptData } from "./script-type";

enum ScriptActionType {
	ADD,
	DELETE,
	RENAME,
	EDIT,
	SAVECODE,
}

interface ScriptActionPayload {
	title?: string;
	newTitle?: string;
	newScript?: ScriptData;
	code?: string;
}

interface ScriptAction {
	type: ScriptActionType;
	payload: ScriptActionPayload;
}

export type { ScriptAction, ScriptActionPayload };
export { ScriptActionType };
