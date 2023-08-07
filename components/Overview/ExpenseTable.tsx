"use client";

import React, { useState } from "react";

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
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { Icon } from "@iconify/react";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import format from "date-fns/format";
import { CategoryType, ExpenseType } from "@/lib/types";
import { toMoneyString } from "@/lib/helpers";
import CategoryName from "../CategoryName";
import editExpenses from "@/actions/edit-expenses";
import { useRouter } from "next/navigation";
import deleteExpense from "@/actions/delete-expense";
import { EditExpenseDialogContent } from "./EditExpenseDialogContent";

function ActionsMenu({
	data,
	categories,
	paidButtonHandler,
	deleteHandler,
}: {
	data: ExpenseType;
	categories: CategoryType[];
	paidButtonHandler: (data: ExpenseType) => void;
	deleteHandler: (id: string) => void;
}) {
	const [modalOpen, setModalOpen] = useState(false);
	const [forDuplicate, setForDuplicate] = useState(false);
	return (
		<Dialog open={modalOpen} onOpenChange={setModalOpen}>
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
					<DropdownMenuSeparator />
					<DialogTrigger
						className="w-full"
						onClick={() => setForDuplicate(true)}
					>
						<DropdownMenuItem>Duplicate</DropdownMenuItem>
					</DialogTrigger>
					<DialogTrigger
						className="w-full"
						onClick={() => setForDuplicate(false)}
					>
						<DropdownMenuItem>Edit</DropdownMenuItem>
					</DialogTrigger>
					<DropdownMenuItem onClick={() => deleteHandler(data._id)}>
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
				<EditExpenseDialogContent
					forDuplicate={forDuplicate}
					data={data}
					categories={categories}
					closeModal={() => setModalOpen(false)}
				/>
			</DropdownMenu>
		</Dialog>
	);
}

function MonthlySummary({ expenseList }: { expenseList: ExpenseType[] }) {
	const summary = expenseList.reduce(
		(acc, curr) => {
			acc.totalExpense += curr.amount;

			if (curr.paid) {
				acc.totalPaid += curr.amount;
			} else {
				acc.totalRemaining += curr.amount;
			}
			return acc;
		},
		{
			totalExpense: 0,
			totalPaid: 0,
			totalRemaining: 0,
		}
	);

	return (
		<div className="flex gap-4 justify-center">
			<div className="flex">
				<div className="font-semibold mr-2">Total</div>
				<div>{toMoneyString(summary.totalExpense)}</div>
			</div>
			<div className="flex">
				<div className="font-semibold mr-2">Paid</div>
				<div>{toMoneyString(summary.totalPaid)}</div>
			</div>
			<div className="flex">
				<div className="font-semibold mr-2">Remaining</div>
				<div>{toMoneyString(summary.totalRemaining)}</div>
			</div>
		</div>
	);
}

export default function ExpenseTable({
	expenseList,
	categories,
}: {
	expenseList: ExpenseType[];
	categories: CategoryType[];
}) {
	expenseList = expenseList.sort(
		(a: ExpenseType, b: ExpenseType) => Number(a.paid) - Number(b.paid)
	);

	const router = useRouter();

	const paidButtonHandler = async (data: ExpenseType) => {
		data.paid = !data.paid;
		await editExpenses({
			...data,
			category: data.category._id,
		});
		router.refresh();
	};

	const deleteHandler = async (id: string) => {
		await deleteExpense(id);
		router.refresh();
	};

	return (
		<Table>
			<TableCaption>
				<MonthlySummary expenseList={expenseList} />
			</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="h-10 font-semibold">Name</TableHead>
					<TableHead className="h-10 font-semibold">Date</TableHead>
					<TableHead className="h-10 font-semibold">Amount</TableHead>
					<TableHead className="h-10 font-semibold text-center"></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{expenseList.map(d => (
					<TableRow key={d._id}>
						<TableCell className="px-4 py-1">
							<div className=" flex items-center gap-2 h-full">
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger disabled>
											<Icon
												icon={d.category.icon}
												width={25}
												height={25}
											/>
										</TooltipTrigger>
										<TooltipContent>
											<p>{d.category.name}</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
								<div>{d.name}</div>
								{d.paid && <Badge>Paid</Badge>}
							</div>
						</TableCell>
						<TableCell className="px-4 py-1">
							{format(new Date(d.date), "MM/dd/yyyy")}
						</TableCell>
						<TableCell className="px-4 py-1">
							{toMoneyString(d.amount)}
						</TableCell>
						<TableCell className="px-4 py-1 text-center">
							<ActionsMenu
								data={d}
								paidButtonHandler={paidButtonHandler}
								deleteHandler={deleteHandler}
								categories={categories}
							/>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
