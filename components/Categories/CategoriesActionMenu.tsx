"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import deleteCategory from "@/actions/delete-category";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { EditCategoryDialogContent } from "./EditCategoryDialogContent";
import editCategory from "@/actions/edit-category";

export default function CategoriesActionMenu({
	id,
	name,
}: {
	id: string;
	name: string;
}) {
	const [category, setCategory] = useState(name);
	const [modalOpen, setModalOpen] = useState(false);
	const [displayWarning, setDisplayWarning] = useState(false);

	const router = useRouter();

	const handleDelete = async () => {
		await deleteCategory(id);
		router.refresh();
	};

	const handleEditCategory = async () => {
		const res = await editCategory(id, category);
		if (res.exist) {
			setDisplayWarning(true);
		} else {
			router.refresh();
			setModalOpen(false);
		}
	};

	return (
		<Dialog open={modalOpen} onOpenChange={setModalOpen}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DialogTrigger className="w-full">
						<DropdownMenuItem>Edit</DropdownMenuItem>
					</DialogTrigger>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={handleDelete}>
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<EditCategoryDialogContent
				category={category}
				setCategory={setCategory}
				handleEditCategory={handleEditCategory}
				displayWarning={displayWarning}
			/>
		</Dialog>
	);
}
