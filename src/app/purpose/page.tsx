import Navbar from "@/components/navbar/Navbar";
import { FC } from "react";

interface PurposeProps {}

const Purpose: FC<PurposeProps> = (props: PurposeProps) => {
	return (
		<>
			<Navbar leaveWarning={false} /> <div></div>
		</>
	);
};

export default Purpose;
