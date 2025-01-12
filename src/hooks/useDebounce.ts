// hooks/useDebounce.ts
import { useCallback, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce<T extends (...args: any[]) => void>(
	callback: T,
	delay: number
): T {
	let timeoutId: NodeJS.Timeout;

	const debouncedFn = useCallback(
		(...args: Parameters<T>) => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				callback(...args);
			}, delay);
		},
		[callback, delay]
	);

	useEffect(() => {
		return () => {
			clearTimeout(timeoutId);
		};
	});

	return debouncedFn as T;
}
