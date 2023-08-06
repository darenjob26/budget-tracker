export default async function deleteCategory(id: string) {
	try {
		const res = await fetch(
			`http://localhost:3000/api/categories/?id=${id}`,
			{
				method: "DELETE",
				headers: { "content-type": "application/json" },
			}
		);

		if (res.ok) {
			return true;
		} else {
			throw new Error("Failed to delete a category");
		}
	} catch (error) {
		console.log(error);
	}
}
