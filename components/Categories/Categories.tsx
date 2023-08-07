import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import AddCategoriesButton from "./AddCategoriesButton";
import CategoriesActionMenu from "./CategoriesActionMenu";
import { CategoryType } from "@/lib/types";
import CategoryName from "../CategoryName";

export default async function Categories({
	categories,
}: {
	categories: CategoryType[];
}) {
	return (
		<div>
			<div className="flex justify-between items-center my-4">
				<div className="text-xl font-semibold">Categories</div>
				<AddCategoriesButton />
			</div>
			<Table>
				<TableBody>
					{categories.map(category => (
						<TableRow key={category._id}>
							<TableCell className="px-4 py-2 ">
								<CategoryName
									name={category.name}
									icon={category.icon}
								/>
							</TableCell>
							<TableCell className="w-10 text-center py-2">
								<CategoriesActionMenu
									id={category._id}
									name={category.name}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
