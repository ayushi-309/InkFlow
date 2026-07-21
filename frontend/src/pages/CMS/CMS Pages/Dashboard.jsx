import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "../../../features/blog/blog.slice";
import {
  RiArticleLine,
  RiEyeLine,
  RiCheckDoubleLine,
  RiExternalLinkLine,
} from "@remixicon/react";

import { CMSHeader, StatCard, RecentPostsTable, CMSFooter } from "../../../components/index.js";

/* ─────────────────────────────── Component ─────────────────────────────── */
const Dashboard = () => {
  const { setIsSidebarOpen } = useOutletContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userBlogsData = useSelector((state) => state.blog?.userBlogs?.data);
  const userBlogs = userBlogsData || [];
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getUserPosts());
  }, [dispatch]);

  const totalViews = userBlogs.reduce((acc, curr) => acc + (curr.views || 0), 0);
  const publishedCount = userBlogs.filter(b => b.status === "published").length;

  const STATS = [
    {
      icon: RiArticleLine,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-500",
      label: "Total Posts",
      value: userBlogs.length.toString(),
      badge: "",
      positive: true,
    },
    {
      icon: RiEyeLine,
      iconBg: "bg-slate-100",
      iconColor: "text-slate-600",
      label: "Total Views",
      value: totalViews.toString(),
      badge: "",
      positive: true,
    },
    {
      icon: RiCheckDoubleLine,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-500",
      label: "Published Posts",
      value: publishedCount.toString(),
      badge: "",
      positive: true,
    },
  ];

  const formattedPosts = [...userBlogs]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map(post => ({
    id: post._id,
    title: post.title,
    slug: post.slug,
    category: post.category || "Uncategorized",
    status: post.status ? post.status.charAt(0).toUpperCase() + post.status.slice(1) : "Draft",
    date: new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    image: post.featuredImage || "/images/neuromorphic_computing.png",
  }));

  const filteredPosts = formattedPosts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col flex-1 px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto">
      <div className="flex-shrink-0">
        <CMSHeader
          title="Overview"
          subtitle="Welcome back. Here's what's happening with InkFlow today."
          searchValue={search}
          onSearchChange={setSearch}
          onMenuClick={() => setIsSidebarOpen(true)}
          primaryAction={{
            label: "Exit to Site",
            icon: <RiExternalLinkLine size={15} />,
            onClick: () => navigate("/")
          }}
        />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8 flex-shrink-0">
        {STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Recent posts table */}
      <div className="flex-shrink-0 mb-8">
        <RecentPostsTable
          posts={filteredPosts}
          onEdit={(post) => navigate(`/posts?slug=${post.slug}`)}
          onDelete={(post) => console.log("Delete", post.id)}
        />
      </div>

      <div className="mt-auto flex-shrink-0">
        <CMSFooter />
      </div>
    </div>
  );
};

export default Dashboard;