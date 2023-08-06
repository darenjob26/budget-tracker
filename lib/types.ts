export type CategoryType = {
	_id: string;
	name: string;
	icon: string;
};

export type ExpenseType = {
	_id: string;
	name: string;
	date: string;
	category: CategoryType;
	amount: number;
	paid: boolean;
};

export type ExpenseListType = {
	[key: string]: ExpenseType[];
};
