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
			newAmount: amount,
			newPaid: paid,
		} = await request.json();
		console.log(name, date, amount, paid);
		await connectMongoDB();
		await Expenses.findByIdAndUpdate(id, {
			name,
			date,
			amount,
			paid,
		});
		return NextResponse.json(successMessage);
	} catch (error) {
		return new NextResponse("Internal error", { status: 500 });
	}
}
