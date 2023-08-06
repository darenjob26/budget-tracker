import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

import Categories from "@/components/Categories/Categories";
import Overview from "@/components/Overview/Overview";
import Header from "@/components/Header";
import { getCategories } from "@/actions/get-categories";
import { CategoryType } from "@/lib/types";

export default async function Home() {
	const { categories } = await getCategories();
	const formattedCategories: CategoryType[] = categories.map(
		(category: CategoryType) => ({
			_id: category._id,
			name: category.name,
			icon: category.icon,
		})
	);

	return (
		<div className="p-6 max-w-4xl m-auto min-h-screen">
			<Header />
			<Card>
				<CardContent className="mt-6">
					<Tabs defaultValue="overview">
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="overview">Overview</TabsTrigger>
							<TabsTrigger value="categories">
								Categories
							</TabsTrigger>
						</TabsList>
						<TabsContent value="overview">
							<Overview categories={formattedCategories} />
						</TabsContent>
						<TabsContent value="categories">
							<Categories categories={formattedCategories} />
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
}
