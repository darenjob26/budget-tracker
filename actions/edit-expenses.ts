export default async function editExpenses({
	_id,
	name,
	date,
	category,
	amount,
	paid,
}: {
	_id: string;
	name: string;
	date: string;
	category: string;
	amount: number;
	paid: boolean;
}) {
	try {
		const res = await fetch(`http://localhost:3000/api/expenses/${_id}`, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				newName: name,
				newDate: date,
				newAmount: amount,
				newCategory: category,
				newPaid: paid,
			}),
		});

		if (res.ok) {
			return await res.json();
		} else {
			throw new Error("Failed to update an expense");
		}
	} catch (error) {
		console.log(error);
	}
}
