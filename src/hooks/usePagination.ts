export function usePagination(totalPages: number, currentPage: number) {
	const pageNumbers = [];
	if (currentPage === 1 && totalPages > 3) {
		// console.log("first");
		pageNumbers.push("1");
		pageNumbers.push("2");
		pageNumbers.push("3");
		pageNumbers.push("...");
		pageNumbers.push(totalPages);
	}
	if (currentPage > 1 && currentPage < 3 && currentPage < totalPages - 2) {
		// console.log("second");
		pageNumbers.push("1");
		pageNumbers.push("2");
		pageNumbers.push("3");
		pageNumbers.push("...");
		pageNumbers.push(totalPages);
	}
	if (currentPage === totalPages - 2 && totalPages <= 3) {
		// console.log("seventh");
		pageNumbers.push("1");
		pageNumbers.push("2");
		pageNumbers.push("3");
	}
	if (currentPage === 3 && currentPage < totalPages - 2) {
		// console.log("third");
		pageNumbers.push("1");
		pageNumbers.push("2");
		pageNumbers.push("3");
		pageNumbers.push("4");
		pageNumbers.push("...");
		pageNumbers.push(totalPages);
	}
	if (currentPage > 3 && currentPage < totalPages - 2) {
		// console.log("fourth");
		pageNumbers.push("1");
		pageNumbers.push("...");
		pageNumbers.push(currentPage - 1);
		pageNumbers.push(currentPage);
		pageNumbers.push(currentPage + 1);
		pageNumbers.push("...");
		pageNumbers.push(totalPages);
	}
	if (currentPage === totalPages - 2 && currentPage !== 1) {
		// console.log("fifth");
		pageNumbers.push("1");
		pageNumbers.push("...");
		pageNumbers.push(currentPage - 1);
		pageNumbers.push(currentPage);
		pageNumbers.push(currentPage + 1);
		pageNumbers.push(totalPages);
	}
	if (currentPage > totalPages - 2 && totalPages > 3) {
		// console.log("sixth");
		pageNumbers.push(1);
		pageNumbers.push("...");
		pageNumbers.push(totalPages - 2);
		pageNumbers.push(totalPages - 1);
		pageNumbers.push(totalPages);
	}
	if (currentPage > totalPages - 2 && totalPages <= 3) {
		// console.log("eighth");
		pageNumbers.push(totalPages - 2);
		pageNumbers.push(totalPages - 1);
		pageNumbers.push(totalPages);
	}

	return pageNumbers;
}
