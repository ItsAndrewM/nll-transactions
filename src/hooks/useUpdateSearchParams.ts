import { useCallback, useState } from "react";
import { useDebounce } from "./useDebounce";

export function useUpdateSearchParams(initialQuery = "") {
	const [searchQuery, setSearchQuery] = useState(initialQuery);

	const updateSearchParams = useCallback((value: string, pathname: string) => {
		const params = new URLSearchParams(window.location.search);
		params.set("search", value);
		window.history.pushState({}, "", `${pathname}?${params.toString()}`);
	}, []);

	const debouncedUpdateSearch = useDebounce(updateSearchParams, 300);

	const handleSearchChange = useCallback(
		(value: string, pathname: string) => {
			setSearchQuery(value);
			debouncedUpdateSearch(value, pathname);
		},
		[debouncedUpdateSearch]
	);

	return {
		searchQuery,
		handleSearchChange,
	};
}
