export default async function editCategory(id: string, newCategory: string) {
	try {
		const res = await fetch(`http://localhost:3000/api/categories/${id}`, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({ newCategory }),
		});

		if (res.ok) {
			return await res.json();
		} else {
			throw new Error("Failed to update a category");
		}
	} catch (error) {
		console.log(error);
	}
}
