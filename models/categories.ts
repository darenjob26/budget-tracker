import mongoose, { Schema } from "mongoose";

export const CategoriesSchema = new Schema(
	{
		name: String,
		icon: String,
	},
	{
		timestamps: true,
	}
);

const Categories =
	mongoose.models.Categories ||
	mongoose.model("Categories", CategoriesSchema);

export default Categories;
