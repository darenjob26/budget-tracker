"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import addCategory from "@/actions/add-category";
import { IconsSelect } from "../IconsSelect";
import { Icon } from "@iconify/react";
import { getNamesWithPrefix, searchIcons } from "@/lib/icons";

function getIcons(
	iconHandler: (icon: string) => void = (icon: string) => {},
	isSearched: boolean,
	searchedIcons: string[] = []
) {
	let icons = [];
	if (!isSearched) {
		icons = getNamesWithPrefix(false);
	} else {
		icons = searchedIcons;
	}

	const svgIcons = icons.map((icon: string) => (
		<Button
			className="w-fit"
			key={icon}
			variant="ghost"
			onClick={() => iconHandler(icon)}
		>
			<Icon icon={icon} width={25} height={25} />
		</Button>
	));

	return svgIcons as React.ReactHTMLElement<HTMLDivElement>[];
}

export default function AddCategoriesButton() {
	const [category, setCategory] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const [displayWarning, setDisplayWarning] = useState(false);
	const [searchInput, setSearchInput] = useState("");
	const [icons, setIcons] = useState<
		React.ReactHTMLElement<HTMLDivElement>[]
	>([]);
	const [iconBoxOpen, setIconBoxOpen] = useState(false);
	const [iconSelected, setIconSelected] = useState("material-symbols:select");

	const router = useRouter();

	useEffect(() => {
		const icons: React.ReactHTMLElement<HTMLDivElement>[] = getIcons(
			iconHandler,
			false
		);
		setIcons(icons);
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			const searchedIcons: string[] = searchIcons(searchInput);
			const icons = getIcons(iconHandler, true, searchedIcons);
			setIcons(icons);
		}, 100);

		return () => clearTimeout(timer);
	}, [searchInput]);

	const handleAddCategory = async () => {
		if (!category) return;
		const res = await addCategory(category, iconSelected);
		if (res.exist) {
			setDisplayWarning(true);
		} else {
			setModalOpen(false);
			setDisplayWarning(false);
			setCategory("");
			router.push("/");
		}
	};

	const iconHandler = (icon: string) => {
		setIconSelected(icon);
		setIconBoxOpen(false);
	};

	const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
	};

	return (
		<Dialog modal={false} open={modalOpen} onOpenChange={setModalOpen}>
			<DialogTrigger asChild>
				<Button size="sm">Add category</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add category</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 pt-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Icon
						</Label>
						<IconsSelect
							icons={icons}
							searchInput={searchInput}
							searchHandler={searchHandler}
							iconSelected={iconSelected}
							iconBoxOpen={iconBoxOpen}
							setIconBoxOpen={() => setIconBoxOpen(!iconBoxOpen)}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name
						</Label>
						<Input
							id="name"
							value={category}
							onChange={e => setCategory(e.target.value)}
							className="col-span-3"
							placeholder="eg. Food, Bills, Travel"
						/>
					</div>
					{displayWarning && (
						<div className="grid grid-cols-4">
							<div className="text-sm text-red-500 col-start-2 col-end-4">
								Category already exist
							</div>
						</div>
					)}
				</div>
				<DialogFooter>
					<Button type="submit" onClick={handleAddCategory}>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
