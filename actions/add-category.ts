export default async function addCategory(category: string, icon: string) {
	try {
		const res = await fetch("http://localhost:3000/api/categories", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ category, icon }),
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
