import { useState } from "react";

const Pagination = ({ totalPages = 10, currentPage=1, setCurrentPage }) => {
    //   const [currentPage, setCurrentPage] = useState(1);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Generate visible pages dynamically
    const getVisiblePages = () => {
        let pages = [];

        if (totalPages <= 5) {
            // Show all pages if there are 5 or fewer
            pages = Array.from({ length: totalPages }, (_, i) => i + 1);
        } else {
            if (currentPage <= 3) {
                pages = [1, 2, 3, "...", totalPages];
            } else if (currentPage >= totalPages - 2) {
                pages = [1, "...", totalPages - 2, totalPages - 1, totalPages];
            } else {
                pages = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
            }
        }
        return pages;
    };

    return (
        <div className="container lg:w-6xl mx-auto lg:my-10 mt-4">
            <div className="flex flex-wrap m-4 xl:justify-end justify-center">
                <div className="flex items-center space-x-2">
                    {/* Previous Button */}
                    <button
                        className={`px-4 py-2 border-2 border-[#E9E2D8] hidden sm:block ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        ← Previous
                    </button>

                    {/* Page Numbers */}
                    <div className="xl:mx-40 lg:mx-30 lg:space-x-4 flex items-center">
                        {getVisiblePages().map((page, index) =>
                            page === "..." ? (
                                <span key={index} className="px-4 py-2">...</span>
                            ) : (
                                <button
                                    key={index}
                                    className={`px-4 py-2 ${currentPage === page
                                            ? "bg-gray-300 text-gray-900 rounded-md"
                                            : "border-2 border-[#E9E2D8]"
                                        }`}
                                    onClick={() => goToPage(page)}
                                >
                                    {page}
                                </button>
                            )
                        )}
                    </div>

                    {/* Next Button */}
                    <button
                        className={`px-4 py-2 border-2 border-[#E9E2D8] hidden sm:block ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
