export async function getCategories() {
	try {
		const res = await fetch("http://localhost:3000/api/categories", {
			cache: "no-cache",
		});

		if (!res.ok) {
			throw new Error("Failed to fetch categories");
		}

		return res.json();
	} catch (error) {
		console.log("Error loading categories", error);
	}
}

export async function getCategory(category: string) {
	try {
		const res = await fetch(
			`http://localhost:3000/api/categories/?category=${category}`
		);

		if (!res.ok) {
			throw new Error("Failed to fetch category");
		}

		return res.json();
	} catch (error) {
		console.log("Error loading category", error);
	}
}
