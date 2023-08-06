import React from "react";
import MonthlyExpenses from "@/components/Overview/MonthlyExpenses";
import SummaryCard from "@/components/Overview/SummaryCard";
import { AddExpenseButton } from "./AddExpenseButton";
import { CategoryType, ExpenseListType } from "@/lib/types";
import { getExpenses } from "@/actions/get-expenses";

export default async function Overview({
	categories,
}: {
	categories: CategoryType[];
}) {
	const expenses: ExpenseListType | undefined = await getExpenses();

	return (
		<div className="flex flex-col gap-4">
			<div className="grid gap-4 grid-cols-3">
				<SummaryCard title="Total Year Expenses" amount="145,533.54" />
				<SummaryCard title="Total Paid Expenses" amount="97,432.12" />
				<SummaryCard
					title="Total Remaining Expenses"
					amount="48,101.42"
				/>
			</div>
			<div className="">
				<div className="flex justify-between items-center mb-2">
					<div className="text-xl tracking-tight font-semibold">
						Expenses
					</div>
					<AddExpenseButton categories={categories} />
				</div>
				<MonthlyExpenses expenses={expenses} />
			</div>
		</div>
	);
}
