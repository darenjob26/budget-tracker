"use client";

import React from "react";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import format from "date-fns/format";
import { ExpenseType } from "@/lib/types";
import { toMoneyString } from "@/lib/helpers";
import CategoryName from "../CategoryName";
import editExpenses from "@/actions/edit-expenses";
import { useRouter } from "next/navigation";

function ActionsMenu({
	data,
	paidButtonHandler,
}: {
	data: ExpenseType;
	paidButtonHandler: (data: ExpenseType) => void;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => paidButtonHandler(data)}>
					{data.paid ? "Unpaid" : "Paid"}
				</DropdownMenuItem>
				<DropdownMenuItem>Edit</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Delete</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function MonthlySummary() {
	return (
		<div className="flex gap-4 justify-center">
			<div className="flex">
				<div className="font-semibold mr-2">Total</div>
				<div>₱12,423.23</div>
			</div>
			<div className="flex">
				<div className="font-semibold mr-2">Paid</div>
				<div>₱12,423.23</div>
			</div>
			<div className="flex">
				<div className="font-semibold mr-2">Remaining</div>
				<div>₱12,423.23</div>
			</div>
		</div>
	);
}

export default function ExpenseTable({
	expenseList,
}: {
	expenseList: ExpenseType[];
}) {
	const router = useRouter();

	const paidButtonHandler = async (data: ExpenseType) => {
		data.paid = !data.paid;
		const res = await editExpenses(data);
		router.refresh();
	};

	return (
		<Table>
			<TableCaption>
				<MonthlySummary />
			</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="h-10 font-semibold">Name</TableHead>
					<TableHead className="h-10 font-semibold">Date</TableHead>
					<TableHead className="h-10 font-semibold">
						Category
					</TableHead>
					<TableHead className="h-10 font-semibold">Amount</TableHead>
					<TableHead className="h-10 font-semibold text-center"></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{expenseList.map(d => (
					<TableRow key={d._id}>
						<TableCell className="px-4 py-1">
							<div className=" flex items-center gap-2 h-full">
								<div>{d.name}</div>
								{d.paid && <Badge>Paid</Badge>}
							</div>
						</TableCell>
						<TableCell className="px-4 py-1">
							{format(new Date(d.date), "MM/dd/yyyy")}
						</TableCell>
						<TableCell className="px-4 py-1">
							<CategoryName
								name={d.category.name}
								icon={d.category.icon}
							/>
						</TableCell>
						<TableCell className="px-4 py-1">
							{toMoneyString(d.amount)}
						</TableCell>
						<TableCell className="px-4 py-1 text-center">
							<ActionsMenu
								data={d}
								paidButtonHandler={paidButtonHandler}
							/>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
