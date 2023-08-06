"use client";

import React from "react";
import { Icon } from "@iconify/react";

export default function CategoryName({
	name,
	icon,
}: {
	name: string;
	icon: string;
}) {
	return (
		<div className="flex gap-2 items-center">
			<Icon icon={icon} width={25} height={25} />
			<div>{name}</div>
		</div>
	);
}
