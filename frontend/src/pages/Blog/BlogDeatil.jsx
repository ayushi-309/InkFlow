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
  NewsletterCTA,
} from "../../components/index.js";

const BlogDetail = () => {
  const { id } = useParams();
  const post = MOCK_POST; // TODO: fetch by id from API

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
            />

            <ArticleBody blocks={post.body} />

            <ArticleTags tags={post.tags} />

            <AuthorBio
              author={post.author}
              authorRole={post.authorRole}
              authorBio={post.authorBio}
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

      {/* ── Mobile newsletter banner ── */}
      <NewsletterCTA variant="mobile" />
    </main>
  );
};

export default BlogDetail;