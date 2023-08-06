import * as React from "react";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CategoryType } from "@/lib/types";
import { Icon } from "@iconify/react";

export function CategorySelection({
	categories,
	category,
	setCategory,
}: {
	categories: CategoryType[];
	category: string;
	setCategory: (e: string) => void;
}) {
	return (
		<Select value={category} onValueChange={e => setCategory(e)}>
			<SelectTrigger className="col-span-3">
				<SelectValue placeholder="Select a category" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{categories.map(category => (
						<SelectItem key={category._id} value={category._id}>
							<div className="flex gap-2 items-center">
								<Icon
									icon={category.icon}
									width={23}
									height={23}
								/>
								<span>{category.name}</span>
							</div>
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
