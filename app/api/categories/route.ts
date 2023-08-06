import connectMongoDB from "@/lib/mongodb";
import Categories from "@/models/categories";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const { category, icon } = await request.json();
		await connectMongoDB();
		const isExist = await Categories.findOne({ name: category });
		if (isExist) {
			return NextResponse.json(
				{ message: "Category already exists", exist: true },
				{ status: 201 }
			);
		}
		await Categories.create({
			name: category,
			icon,
		});
		return NextResponse.json(
			{ message: "Category created", exist: false },
			{ status: 201 }
		);
	} catch (error) {
		return new NextResponse("Internal error", { status: 500 });
	}
}

export async function GET() {
	try {
		await connectMongoDB();
		const categories = await Categories.find(
			{},
			{
				name: 1,
				icon: 1,
			}
		);
		return NextResponse.json({ categories }, { status: 201 });
	} catch (error) {
		return new NextResponse("Internal error", { status: 500 });
	}
}

export async function DELETE(request: NextRequest) {
	try {
		const id = request.nextUrl.searchParams.get("id");
		await connectMongoDB();
		await Categories.findByIdAndDelete(id);
		return NextResponse.json(
			{ message: "Category deleted" },
			{ status: 200 }
		);
	} catch (error) {
		return new NextResponse("Internal error", { status: 500 });
	}
}
