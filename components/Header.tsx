import React from "react";
import { ModeToggle } from "@/components/ModeToggle";

export default function Header() {
	return (
		<div className="flex justify-between mb-6">
			<div className="text-4xl font-semibold tracking-tight">
				Budget Tracker
			</div>
			<ModeToggle />
		</div>
	);
}
