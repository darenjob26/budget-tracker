"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Icon } from "@iconify/react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function IconsSelect({
	icons,
	searchInput,
	searchHandler,
	iconSelected,
	iconBoxOpen,
	setIconBoxOpen,
}: {
	icons: React.ReactHTMLElement<HTMLDivElement>[];
	searchInput: string;
	searchHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	iconSelected: string;
	iconBoxOpen: boolean;
	setIconBoxOpen: () => void;
}) {
	return (
		<Popover open={iconBoxOpen} onOpenChange={setIconBoxOpen}>
			<PopoverTrigger asChild>
				<Button
					className="col-span-3 w-fit px-2"
					variant={"outline"}
					size={"sm"}
				>
					<Icon icon={iconSelected} width={25} height={25} />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80">
				<Input
					placeholder="Search"
					className=""
					value={searchInput}
					onChange={searchHandler}
				/>
				<ScrollArea className="h-72 w-full mt-4">
					<div className="flex flex-col items-center w-full">
						<div className="w-full flex flex-wrap">{icons}</div>
						<div className="text-gray-500">Search for more</div>
					</div>
				</ScrollArea>
			</PopoverContent>
		</Popover>
	);
}
