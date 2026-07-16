import ShareWidget from "./ShareWidget";
import RelatedStories from "./RelatedStories";
import NewsletterCTA from "./NewsletterCTA";

const BlogSidebar = ({ relatedPosts }) => (
  <aside className="hidden lg:block space-y-8 sticky top-24 self-start">
    <ShareWidget />
    <RelatedStories posts={relatedPosts} />
    <NewsletterCTA variant="sidebar" />
  </aside>
);

export default BlogSidebar;
