export default async function addExpense({
	name,
	date,
	category,
	amount,
}: {
	name: string;
	date: string;
	category: string;
	amount: number;
}) {
	try {
		const res = await fetch("http://localhost:3000/api/expenses", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ name, date, category, amount }),
		});

		if (res.ok) {
			return await res.json();
		} else {
			throw new Error("Failed to create a category");
		}
	} catch (error) {
		console.log(error);
	}
}
