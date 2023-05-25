import Navbar from "@/components/navbar/Navbar";
import { FC } from "react";

interface HowToUseProps {}

const HowToUse: FC<HowToUseProps> = (props: HowToUseProps) => {
	return (
		<>
			<Navbar leaveWarning={false} /> <div></div>
		</>
	);
};

export default HowToUse;
