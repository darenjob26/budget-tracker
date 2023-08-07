export default async function deleteExpense(id: string) {
	try {
		const res = await fetch(
			`http://localhost:3000/api/expenses/?id=${id}`,
			{
				method: "DELETE",
				headers: { "content-type": "application/json" },
			}
		);

		if (res.ok) {
			return await res.json();
		} else {
			throw new Error("Failed to delete an expense");
		}
	} catch (error) {
		console.log(error);
	}
}
