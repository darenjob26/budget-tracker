import React from "react";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import ExpenseTable from "./ExpenseTable";
import { ExpenseListType, ExpenseType } from "@/lib/types";
import { toMoneyString } from "../../lib/helpers";

function Title(title: string, amount: number) {
	return (
		<div className="flex gap-3 items-center justify-between w-full pr-3">
			<div>{title.split("-").join(" ")}</div>
			<div className="text-gray-500 text-sm">{toMoneyString(amount)}</div>
		</div>
	);
}

export default function MonthlyExpenses({
	expenses,
}: {
	expenses: ExpenseListType | undefined;
}) {
	const calculateTotalForMonth = (monthlyExpenses: ExpenseType[]) => {
		return monthlyExpenses.reduce((acc, curr) => acc + curr.amount, 0);
	};

	return (
		<div>
			<Accordion type="single" collapsible className="w-full">
				{expenses &&
					Object.keys(expenses).map((expensesKey: string) => (
						<AccordionItem key={expensesKey} value={expensesKey}>
							<AccordionTrigger className="hover:no-underline">
								{Title(
									expensesKey,
									calculateTotalForMonth(
										expenses[expensesKey]
									)
								)}
							</AccordionTrigger>
							<AccordionContent>
								<ExpenseTable
									expenseList={expenses[expensesKey]}
								/>
							</AccordionContent>
						</AccordionItem>
					))}
			</Accordion>
		</div>
	);
}
