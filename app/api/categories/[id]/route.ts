import connectMongoDB from "@/lib/mongodb";
import Categories from "@/models/categories";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = params;
		const { newCategory: name } = await request.json();
		await connectMongoDB();
		const isExist = await Categories.findOne({ name });
		if (isExist) {
			return NextResponse.json(
				{ message: "Category already exists", exist: true },
				{ status: 201 }
			);
		}
		await Categories.findByIdAndUpdate(id, { name });
		return NextResponse.json(
			{ message: "Category update", exist: false },
			{ status: 200 }
		);
	} catch (error) {
		return new NextResponse("Internal error", { status: 500 });
	}
}
