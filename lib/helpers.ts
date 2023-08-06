export function preventCharInput(e: React.KeyboardEvent<HTMLInputElement>) {
	const exceptThisSymbols = ["e", "E", "+", "-"];
	return exceptThisSymbols.includes(e.key) && e.preventDefault();
}

export function toMoneyString(amount: number) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "PHP",
	}).format(amount);
}
