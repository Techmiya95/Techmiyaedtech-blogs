import { useParams, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { blogs } from "@/data/blogs";

const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();
    const blog = blogs.find((b) => b.slug === slug);

    if (!blog) {
        return <Navigate to="/404" replace />;
    }

    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
            <article className="max-w-4xl mx-auto">
                <Link to="/">
                    <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-amber-600">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
                    </Button>
                </Link>

                <div className="mb-6">
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800 mb-4">
                        {blog.category}
                    </span>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-6">
                        {blog.title}
                    </h1>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-10">
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                </div>

                <div className="space-y-8 text-gray-700 text-lg leading-relaxed blog-content">
                    {blog.content}
                </div>

                <hr className="my-12 border-gray-200" />

                <div className="bg-gray-50 p-8 rounded-xl text-center">
                    <h3 className="text-2xl font-bold mb-4">Ready to start your AI journey?</h3>
                    <p className="mb-6">Explore our improved Master's in Data Science & AI Course.</p>
                    <a href="https://techmiyaedtech.com/courses">
                        <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white">View Courses</Button>
                    </a>
                </div>
            </article>
        </div>
    );
};

export default BlogPost;
