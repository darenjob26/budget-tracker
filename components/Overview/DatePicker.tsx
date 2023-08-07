"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
	days,
	setDays,
	mode,
}: {
	days: Date[] | undefined;
	setDays: (e: Date[] | undefined) => void;
	mode: "single" | "multiple";
}) {
	const today = new Date();
	const defaultMonth = days
		? new Date(
				days[days.length - 1].getFullYear(),
				days[days.length - 1].getMonth()
		  )
		: new Date(today.getFullYear(), today.getMonth());

	let label = days ? days.map(day => format(day, "PPP")).join(", ") : "";

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-[280px] justify-start text-left font-normal truncate ",
						!days && "text-muted-foreground"
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{label}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				{mode === "multiple" ? (
					<Calendar
						defaultMonth={defaultMonth}
						mode="multiple"
						min={1}
						selected={days}
						onSelect={e => setDays(e)}
					/>
				) : (
					<Calendar
						defaultMonth={defaultMonth}
						mode="single"
						// @ts-ignore
						selected={days[0]}
						// @ts-ignore
						onSelect={e => setDays([e])}
					/>
				)}
			</PopoverContent>
		</Popover>
	);
}
