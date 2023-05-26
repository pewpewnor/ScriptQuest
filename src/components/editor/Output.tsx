import { FC, useState } from "react";

interface OutputProps {
	code: string;
}

const Output: FC<OutputProps> = (props: OutputProps) => {
	const [error, setError] = useState(false);
	const [output, setOutput] = useState("");

	return (
		<div className="relative h-screen w-2/6 border-2 border-electric bg-slate-900 p-4 text-left font-vt text-2xl text-clay">
			<p className={error ? "font-mono text-lg text-red-500" : ""}>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis
				adipisci fugiat debitis soluta veritatis rerum error consequatur
				nam voluptatem perferendis.
			</p>
			{output}
		</div>
	);
};

export default Output;
