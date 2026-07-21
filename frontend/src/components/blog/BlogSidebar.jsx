import ShareWidget from "./ShareWidget.jsx";
import RelatedStories from "./RelatedStories.jsx";

const BlogSidebar = ({ relatedPosts }) => (
  <aside className="hidden lg:block space-y-8 sticky top-24 self-start">
    <ShareWidget />
    <RelatedStories posts={relatedPosts} />
  </aside>
);

export default BlogSidebar;
