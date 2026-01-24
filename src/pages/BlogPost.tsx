import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { blogs } from "@/data/blogs";

const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();
    const blog = blogs.find((b) => b.slug === slug);

    // SEO: Update document title and meta tags
    useEffect(() => {
        if (blog) {
            // Update page title
            document.title = `${blog.title} | Techmiya Insights`;

            // Update meta description
            let metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', blog.description);
            }

            // Update Open Graph tags
            let ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle) {
                ogTitle.setAttribute('content', blog.title);
            }

            let ogDescription = document.querySelector('meta[property="og:description"]');
            if (ogDescription) {
                ogDescription.setAttribute('content', blog.description);
            }

            let ogImage = document.querySelector('meta[property="og:image"]');
            if (!ogImage) {
                ogImage = document.createElement('meta');
                ogImage.setAttribute('property', 'og:image');
                document.head.appendChild(ogImage);
            }
            ogImage.setAttribute('content', blog.image);

            // Update or create article meta tags
            let articleAuthor = document.querySelector('meta[property="article:author"]');
            if (!articleAuthor) {
                articleAuthor = document.createElement('meta');
                articleAuthor.setAttribute('property', 'article:author');
                document.head.appendChild(articleAuthor);
            }
            articleAuthor.setAttribute('content', 'Techmiya EdTech');

            let articlePublished = document.querySelector('meta[property="article:published_time"]');
            if (!articlePublished) {
                articlePublished = document.createElement('meta');
                articlePublished.setAttribute('property', 'article:published_time');
                document.head.appendChild(articlePublished);
            }
            articlePublished.setAttribute('content', blog.date);
        }

        // Cleanup: Reset title when leaving page
        return () => {
            document.title = "Techmiya Edtech - Blog";
        };
    }, [blog]);

    if (!blog) {
        return <Navigate to="/404" replace />;
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Image */}
            <div className="w-full h-64 md:h-96 relative overflow-hidden">
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
                    <Link to="/">
                        <Button variant="ghost" className="mb-6 pl-0 hover:bg-transparent hover:text-amber-600">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
                        </Button>
                    </Link>

                    <div className="mb-6">
                        <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800 mb-4">
                            {blog.category}
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
                            {blog.title}
                        </h1>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-10 pb-8 border-b border-gray-200">
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(blog.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{blog.readTime}</span>
                        </div>
                        <div className="flex items-center gap-2 ml-auto">
                            <span className="text-gray-400">By</span>
                            <span className="font-medium text-gray-700">Techmiya EdTech</span>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed blog-content">
                        {blog.content}
                    </div>

                    <hr className="my-12 border-gray-200" />

                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-xl text-center">
                        <h3 className="text-2xl font-bold mb-4 text-gray-900">Ready to start your AI journey?</h3>
                        <p className="mb-6 text-gray-600">Explore our improved Master's in Data Science & AI Course.</p>
                        <a href="https://techmiyaedtech.com/courses">
                            <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg">
                                View Courses
                            </Button>
                        </a>
                    </div>
                </div>
            </article>

            {/* Spacing at bottom */}
            <div className="h-16" />
        </div>
    );
};

export default BlogPost;

