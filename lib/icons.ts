// @ts-ignore
import { icons as mdiIcons } from "@iconify-json/mdi";
const defaultIconList = Object.keys(mdiIcons.icons);

export function getNamesWithPrefix(
	isSearched: boolean,
	filtered: string[] = []
) {
	const iconsList = isSearched ? filtered : defaultIconList;
	let icons = iconsList.map(icon => `mdi:${icon}`).slice(0, 200);

	return icons;
}

export function searchIcons(query: string) {
	query = query.toLowerCase();
	let filtered: string[];
	if (query) {
		filtered = defaultIconList.filter(item => {
			const iconName = item.toLowerCase();

			return iconName.includes(query);
		});
	} else {
		filtered = defaultIconList;
	}

	return getNamesWithPrefix(true, filtered);
}
