import { create } from "zustand";

import { CategoryType } from "@/lib/types";

interface CategoryStore {
	categories?: CategoryType[];
	setCategories: (categories: CategoryType[]) => void;
}

const useCategories = create<CategoryStore>(set => ({
	categories: undefined,
	setCategories: (categories: CategoryType[]) =>
		set({
			categories,
		}),
}));

export default useCategories;
