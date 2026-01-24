import { useState, useMemo, useEffect } from 'react';
import { BlogCard } from "@/components/BlogCard";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { blogs } from "@/data/blogs";
import { Button } from "@/components/ui/button";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";

const BLOGS_PER_PAGE = 6;

const Blog = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);

    // Extract unique categories
    const categories = useMemo(() => {
        const cats = new Set(blogs.map(b => b.category));
        return ["All", ...Array.from(cats)];
    }, []);

    const filteredBlogs = useMemo(() => {
        return blogs
            .filter((blog) => {
                const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    blog.description.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
                return matchesSearch && matchesCategory;
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [searchTerm, selectedCategory]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);
    const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
    const endIndex = startIndex + BLOGS_PER_PAGE;
    const currentBlogs = filteredBlogs.slice(startIndex, endIndex);

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedCategory("All");
        setCurrentPage(1);
    };

    const goToPage = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Techmiya <span className="text-amber-600">Insights</span>
                    </h1>
                    <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                        Expert articles, tutorials, and career advice for the modern developer.
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="flex flex-col md:flex-row gap-4 mb-10 max-w-4xl mx-auto">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search articles..."
                            className="pl-10 bg-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-48">
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map(cat => (
                                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {(searchTerm || selectedCategory !== "All") && (
                        <Button variant="ghost" onClick={clearFilters} className="px-3">
                            <X className="h-4 w-4 mr-2" /> Clear
                        </Button>
                    )}
                </div>

                {/* Results count */}
                <div className="text-sm text-gray-500 mb-6 text-center">
                    Showing {startIndex + 1}-{Math.min(endIndex, filteredBlogs.length)} of {filteredBlogs.length} articles
                </div>

                {currentBlogs.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {currentBlogs.map((blog) => (
                                <BlogCard
                                    key={blog.id}
                                    title={blog.title}
                                    description={blog.description}
                                    date={blog.date}
                                    slug={`/blog/${blog.slug}`}
                                    image={blog.image}
                                    isPlaceholder={false}
                                />
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-8 mb-12">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => goToPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="flex items-center gap-1"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </Button>

                                <div className="flex items-center gap-1 mx-2">
                                    {getPageNumbers().map((page, index) => (
                                        typeof page === 'number' ? (
                                            <Button
                                                key={index}
                                                variant={currentPage === page ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => goToPage(page)}
                                                className={`w-10 h-10 ${currentPage === page ? 'bg-amber-600 hover:bg-amber-700 text-white' : ''}`}
                                            >
                                                {page}
                                            </Button>
                                        ) : (
                                            <span key={index} className="px-2 text-gray-400">...</span>
                                        )
                                    ))}
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => goToPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="flex items-center gap-1"
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20">
                        <h3 className="text-xl font-medium text-gray-900">No articles found</h3>
                        <p className="mt-2 text-gray-500">Try adjusting your search or filters.</p>
                        <Button
                            variant="link"
                            onClick={clearFilters}
                            className="text-amber-600 mt-2"
                        >
                            Clear all filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
