"use client";

import { Button } from "@/components/ui/button";
import {
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "./DatePicker";
import { CategoryType, ExpenseType } from "@/lib/types";
import { CategorySelection } from "./CategorySelection";
import { useState } from "react";
import { preventCharInput } from "@/lib/helpers";
import editExpenses from "@/actions/edit-expenses";
import { useRouter } from "next/navigation";
import addExpense from "@/actions/add-expense";
import { Loader2 } from "lucide-react";

export function EditExpenseDialogContent({
	data,
	categories,
	closeModal,
	forDuplicate,
}: {
	data: ExpenseType;
	categories: CategoryType[];
	closeModal: () => void;
	forDuplicate: boolean;
}) {
	const title = forDuplicate ? "Add expense" : "Edit Expense";
	const [name, setName] = useState(data.name);
	const initialDays: Date[] = [new Date(data.date)];
	const [days, setDays] = useState<Date[] | undefined>(initialDays);
	const [category, setCategory] = useState(data.category._id);
	const [amount, setAmount] = useState(data.amount);
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const submitHandler = async () => {
		if (!name || !days || !category || !amount) return;
		setLoading(true);
		if (forDuplicate) {
			for (const day of days) {
				const dateString = day.toLocaleDateString();
				await addExpense({
					name,
					date: dateString,
					category,
					amount,
				});
			}
		} else {
			await editExpenses({
				...data,
				name,
				date: days[0].toLocaleDateString(),
				amount,
				category,
			});
		}
		router.refresh();
		closeModal();
		setLoading(false);
	};

	return (
		<DialogContent className="sm:max-w-[425px]">
			<DialogHeader>
				<DialogTitle>{title}</DialogTitle>
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
						mode={forDuplicate ? "multiple" : "single"}
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
						onChange={e => setAmount(parseFloat(e.target.value))}
						onKeyDown={e => preventCharInput(e)}
						className="col-span-3"
						type="number"
					/>
				</div>
			</div>
			<DialogFooter>
				<Button
					type="submit"
					onClick={submitHandler}
					disabled={loading}
				>
					{loading && (
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					)}
					Save
				</Button>
			</DialogFooter>
		</DialogContent>
	);
}
