import { useState, useMemo } from 'react';
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
import { Search, X } from "lucide-react";

const Blog = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

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

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedCategory("All");
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

                {filteredBlogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {filteredBlogs.map((blog) => (
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
