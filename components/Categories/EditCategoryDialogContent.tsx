"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EditCategoryDialogContent({
	category,
	handleEditCategory,
	setCategory,
	displayWarning,
}: {
	category: string;
	handleEditCategory: () => void;
	setCategory: (e: string) => void;
	displayWarning: boolean;
}) {
	return (
		<DialogContent className="sm:max-w-[425px]">
			<DialogHeader>
				<DialogTitle>Edit category</DialogTitle>
			</DialogHeader>
			<div className="grid gap-4 py-4">
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="name" className="text-right">
						Name
					</Label>
					<Input
						id="name"
						value={category}
						onChange={e => setCategory(e.target.value)}
						className="col-span-3"
						placeholder="eg. Food, Bills, Travel"
					/>
				</div>
				{displayWarning && (
					<div className="grid grid-cols-4">
						<div className="text-sm text-red-500 col-start-2 col-end-4">
							Category already exist
						</div>
					</div>
				)}
			</div>
			<DialogFooter>
				<Button type="submit" onClick={handleEditCategory}>
					Save
				</Button>
			</DialogFooter>
		</DialogContent>
	);
}
