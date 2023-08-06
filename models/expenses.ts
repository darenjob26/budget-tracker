import mongoose, { Schema } from "mongoose";

const ExpensesSchema = new Schema(
	{
		name: String,
		date: String,
		category: {
			type: mongoose.Types.ObjectId,
			ref: "Categories",
		},
		amount: Number,
		paid: Boolean,
	},
	{
		timestamps: true,
	}
);

const Expenses =
	mongoose.models.Expenses || mongoose.model("Expenses", ExpensesSchema);

export default Expenses;
