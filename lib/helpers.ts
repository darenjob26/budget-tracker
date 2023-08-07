import { ExpenseType } from "./types";

export function preventCharInput(e: React.KeyboardEvent<HTMLInputElement>) {
	const exceptThisSymbols = ["e", "E", "+", "-"];
	return exceptThisSymbols.includes(e.key) && e.preventDefault();
}

export function toMoneyString(amount: number) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "PHP",
	}).format(amount);
}

export function calculateMonthlySummary(expenseList: ExpenseType[]) {
	const monthExpenses = expenseList.reduce(
		(acc, curr) => {
			acc.totalExpense += curr.amount;

			if (curr.paid) {
				acc.totalPaid += curr.amount;
			} else {
				acc.totalRemaining += curr.amount;
			}
			return acc;
		},
		{
			totalExpense: 0,
			totalPaid: 0,
			totalRemaining: 0,
		}
	);

	return monthExpenses;
}
