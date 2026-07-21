import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { RiArrowLeftLine } from "@remixicon/react";

import { MOCK_POST, RELATED_POSTS } from "../../data/mockBlogData";
import {
  ArticleHero,
  Breadcrumb,
  ArticleHeader,
  ArticleMeta,
  ArticleBody,
  ArticleTags,
  AuthorBio,
  BlogSidebar,
} from "../../components/index.js";

import { useSelector, useDispatch } from "react-redux";
import { getSingleBlog } from "../../features/blog/blog.slice.js";

const BlogDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleBlog, loading } = useSelector((state) => state.blog);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getSingleBlog(id));
    }
  }, [dispatch, id]);

  const apiPost = singleBlog?.data;

  const post = apiPost
    ? {
        title: apiPost.title,
        category: apiPost.category || "Uncategorized",
        categoryColor: "text-violet-600",
        categoryBg: "bg-violet-50 text-violet-700 border-violet-200",
        readTime: "5 min read",
        date: new Date(apiPost.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        author: apiPost.author?.fullname || "Author",
        authorRole: "Author",
        authorBio: apiPost.author?.bio || "Author at InkFlow",
        authorAvatar: apiPost.author?.avatar || null,
        image: apiPost.featuredImage || "/images/default_blog.png",
        tags: apiPost.tags?.map((t) => t.tagName) || [],
        content: apiPost.content,
      }
    : MOCK_POST;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="w-full bg-white min-h-screen">
      {/* ── Full-width hero image ── */}
      <ArticleHero image={post.image} title={post.title} />

      {/* ── Page body: article + sidebar ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 xl:gap-16 py-10 md:py-14">
          {/* ── Left: Article ── */}
          <article>
            <Breadcrumb category={post.category} title={post.title} />

            <ArticleHeader
              category={post.category}
              categoryBg={post.categoryBg}
              title={post.title}
              subtitle={post.subtitle}
            />

            <ArticleMeta
              author={post.author}
              authorRole={post.authorRole}
              date={post.date}
              readTime={post.readTime}
              authorAvatar={post.authorAvatar}
            />

            {post.content ? (
              <div
                className="prose-inkflow max-w-none space-y-6 text-slate-700 text-[16.5px] leading-[1.85] font-normal my-8"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <ArticleBody blocks={post.body} />
            )}

            <ArticleTags tags={post.tags} />

            <AuthorBio
              author={post.author}
              authorRole={post.authorRole}
              authorBio={post.authorBio}
              authorAvatar={post.authorAvatar}
            />

            {/* Back link */}
            <div className="mt-12 mb-2">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm font-semibold transition-colors duration-200 group"
              >
                <RiArrowLeftLine
                  size={16}
                  className="transition-transform duration-200 group-hover:-translate-x-0.5"
                />
                Back to InkFlow
              </Link>
            </div>
          </article>

          {/* ── Right: Sticky sidebar ── */}
          <BlogSidebar relatedPosts={RELATED_POSTS} />
        </div>
      </div>
    </main>
  );
};

export default BlogDetail;
