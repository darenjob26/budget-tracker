import React from "react";
import MonthlyExpenses from "@/components/Overview/MonthlyExpenses";
import SummaryCard from "@/components/Overview/SummaryCard";
import { AddExpenseButton } from "./AddExpenseButton";
import { CategoryType, ExpenseListType } from "@/lib/types";
import { getExpenses } from "@/actions/get-expenses";
import { calculateMonthlySummary, toMoneyString } from "@/lib/helpers";

export default async function Overview({
	categories,
}: {
	categories: CategoryType[];
}) {
	const expenses: ExpenseListType | undefined = await getExpenses();

	let totalExpense = {
		totalExpense: 0,
		totalPaid: 0,
		totalRemaining: 0,
	};

	if (expenses) {
		totalExpense = Object.keys(expenses).reduce((acc, curr) => {
			const monthExpenses = calculateMonthlySummary(expenses[curr]);
			acc.totalExpense += monthExpenses.totalExpense;
			acc.totalPaid += monthExpenses.totalPaid;
			acc.totalRemaining += monthExpenses.totalRemaining;

			return acc;
		}, totalExpense);
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="grid gap-4 grid-cols-3">
				<SummaryCard
					title="Total Year Expenses"
					amount={toMoneyString(totalExpense.totalExpense)}
				/>
				<SummaryCard
					title="Total Paid Expenses"
					amount={toMoneyString(totalExpense.totalPaid)}
				/>
				<SummaryCard
					title="Total Remaining Expenses"
					amount={toMoneyString(totalExpense.totalRemaining)}
				/>
			</div>
			<div className="">
				<div className="flex justify-between items-center mb-2">
					<div className="text-xl tracking-tight font-semibold">
						Expenses
					</div>
					<AddExpenseButton categories={categories} />
				</div>
				<MonthlyExpenses expenses={expenses} categories={categories} />
			</div>
		</div>
	);
}
