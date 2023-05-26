import { FC } from "react";

interface ScriptNavbarProps {}

const ScriptNavbar: FC<ScriptNavbarProps> = (props: ScriptNavbarProps) => {
	return (
		<div className="absolute top-0 flex  w-full items-center justify-around bg-black px-14 text-center font-vt text-2xl text-red-400 sm:h-12 sm:px-0 sm:text-left">
			<p>WARNING: LEAVING THIS PAGE WILL RESULT IN LOSS OF DATA</p>
		</div>
	);
};

export default ScriptNavbar;
