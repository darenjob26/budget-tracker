import connectMongoDB from "@/lib/mongodb";
import Expenses from "@/models/expenses";
import { NextRequest, NextResponse } from "next/server";
import { successMessage, failedMessage } from "../response";

export async function POST(request: NextRequest) {
	try {
		const { name, date, category, amount } = await request.json();
		await connectMongoDB();
		await Expenses.create({
			name,
			date,
			category,
			amount,
			paid: false,
		});
		return NextResponse.json(successMessage);
	} catch (error) {
		return new NextResponse("Internal error", { status: 500 });
	}
}

export async function GET() {
	try {
		await connectMongoDB();
		const expenses = await Expenses.find(
			{},
			{
				name: 1,
				date: 1,
				amount: 1,
				paid: 1,
			}
		).populate("category");
		return NextResponse.json({ expenses }, { status: 201 });
	} catch (error) {
		return new NextResponse("Internal error", { status: 500 });
	}
}

export async function DELETE(request: NextRequest) {
	try {
		const id = request.nextUrl.searchParams.get("id");
		await connectMongoDB();
		await Expenses.findByIdAndDelete(id);
		return NextResponse.json(
			{ message: "Expense deleted" },
			{ status: 200 }
		);
	} catch (error) {
		return new NextResponse("Internal error", { status: 500 });
	}
}
