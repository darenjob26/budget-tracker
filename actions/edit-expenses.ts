import { ExpenseType } from "@/lib/types";

export default async function editExpenses(data: ExpenseType) {
	try {
		const res = await fetch(
			`http://localhost:3000/api/expenses/${data._id}`,
			{
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					newName: data.name,
					newDate: data.date,
					newAmount: data.amount,
					newPaid: data.paid,
				}),
			}
		);

		if (res.ok) {
			return await res.json();
		} else {
			throw new Error("Failed to update an expense");
		}
	} catch (error) {
		console.log(error);
	}
}
