"use client";
import Navbar from "@/components/navbar/Navbar";
import { FC, useEffect } from "react";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = (props: DashboardProps) => {
	return (
		<>
			<Navbar leaveWarning={true} /> <div></div>
		</>
	);
};

export default Dashboard;
