"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "./DatePicker";
import { CategorySelection } from "./CategorySelection";
import { useState } from "react";
import { CategoryType } from "@/lib/types";
import addExpense from "@/actions/add-expense";
import { useRouter } from "next/navigation";
import { preventCharInput } from "../../lib/helpers";

export function AddExpenseButton({
	categories,
}: {
	categories: CategoryType[];
}) {
	const [modalOpen, setModalOpen] = useState(false);
	const [name, setName] = useState("");
	const [category, setCategory] = useState("");
	const [amount, setAmount] = useState<number>();

	const [days, setDays] = useState<Date[] | undefined>();

	const router = useRouter();

	const submitHandler = async () => {
		if (!name || !days || !category || !amount) return;

		for (const day of days) {
			const dateString = day.toLocaleDateString();
			await addExpense({
				name,
				date: dateString,
				category,
				amount,
			});
		}
		router.refresh();
		onOpenChange();
	};

	const onOpenChange = () => {
		setName("");
		setDays(undefined);
		setCategory("");
		setAmount(0);
		setModalOpen(!modalOpen);
	};

	return (
		<Dialog onOpenChange={onOpenChange} open={modalOpen}>
			<DialogTrigger asChild>
				<Button size="sm">Add expense</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add expense</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name
						</Label>
						<Input
							id="name"
							value={name}
							onChange={e => setName(e.target.value)}
							className="col-span-3"
							placeholder=""
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="dueDate" className="text-right">
							Due Date
						</Label>
						<DatePicker
							days={days}
							setDays={setDays}
							mode="multiple"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="category" className="text-right">
							Category
						</Label>
						<CategorySelection
							categories={categories}
							category={category}
							setCategory={e => setCategory(e)}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="amount" className="text-right">
							Amount
						</Label>
						<Input
							id="amount"
							value={amount}
							onChange={e =>
								setAmount(parseFloat(e.target.value))
							}
							onKeyDown={e => preventCharInput(e)}
							className="col-span-3"
							type="number"
						/>
					</div>
				</div>
				<DialogFooter>
					<Button type="submit" onClick={submitHandler}>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
