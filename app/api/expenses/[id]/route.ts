import connectMongoDB from "@/lib/mongodb";
import Expenses from "@/models/expenses";
import { NextRequest, NextResponse } from "next/server";
import { successMessage } from "../../response";

export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = params;
		const {
			newName: name,
			newDate: date,
			newCategory: category,
			newAmount: amount,
			newPaid: paid,
		} = await request.json();

		await connectMongoDB();
		await Expenses.findByIdAndUpdate(id, {
			name,
			date,
			category,
			amount,
			paid,
		});
		return NextResponse.json(successMessage);
	} catch (error) {
		return new NextResponse("Internal error", { status: 500 });
	}
}
