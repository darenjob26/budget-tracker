import { ExpenseListType, ExpenseType } from "@/lib/types";
import { format } from "date-fns";

export async function getExpenses() {
	try {
		const res = await fetch("http://localhost:3000/api/expenses", {
			cache: "no-cache",
		});

		if (!res.ok) {
			throw new Error("Failed to fetch categories");
		}
		const result = await res.json();

		const groupedExpenses = groupExpenses(result.expenses);
		return groupedExpenses;
	} catch (error) {
		console.log("Error loading categories", error);
	}
}

const groupExpenses = (data: ExpenseType[]) => {
	const sortDates = data.sort(
		(a: ExpenseType, b: ExpenseType) =>
			new Date(a.date).valueOf() - new Date(b.date).valueOf()
	);

	const grouped = sortDates.reduce((acc: ExpenseListType, curr) => {
		const monthYear = format(new Date(curr.date), "MMMM-yyyy");

		if (!acc[monthYear]) {
			acc[monthYear] = [];
		}
		acc[monthYear].push(curr);
		return acc;
	}, {});
	return grouped;
};
