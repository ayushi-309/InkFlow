import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts, deleteBlog } from "../../../features/blog/blog.slice";
import {
  RiArticleLine,
  RiEyeLine,
  RiCheckDoubleLine,
  RiExternalLinkLine,
  RiDeleteBinLine,
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
  const [postToDelete, setPostToDelete] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    dispatch(getUserPosts());
  }, [dispatch]);

  const handleDelete = (post) => {
    setPostToDelete(post);
  };

  const confirmDelete = () => {
    if (postToDelete) {
      dispatch(deleteBlog(postToDelete.id))
        .unwrap()
        .then(() => {
          setToast({ show: true, message: "Post deleted successfully!", type: "success" });
          setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
          dispatch(getUserPosts());
        })
        .catch((err) => {
          setToast({ show: true, message: err?.message || "Failed to delete post.", type: "error" });
          setTimeout(() => setToast({ show: false, message: "", type: "error" }), 3000);
        })
        .finally(() => {
          setPostToDelete(null);
        });
    }
  };

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
          onDelete={handleDelete}
        />
      </div>

      <div className="mt-auto flex-shrink-0">
        <CMSFooter />
      </div>

      {/* Delete Confirmation Modal */}
      {postToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 transform scale-100 transition-transform">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                <RiDeleteBinLine size={24} className="text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Delete Post?</h3>
                <p className="text-[13px] text-slate-500 font-medium">This action cannot be undone.</p>
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-xl p-3 mb-6 flex items-center gap-3">
              <img src={postToDelete.image} alt={postToDelete.title} className="w-10 h-10 rounded-lg object-cover" />
              <span className="text-[13px] font-semibold text-slate-700 truncate">{postToDelete.title}</span>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setPostToDelete(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 shadow-md shadow-red-500/20 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border transform transition-all duration-300 ${
          toast.type === "success" ? "bg-white border-emerald-200 text-emerald-700" : "bg-white border-red-200 text-red-700"
        }`}>
          {toast.type === "success" ? <RiCheckDoubleLine size={24} className="text-emerald-500" /> : <RiDeleteBinLine size={24} className="text-red-500" />}
          <span className="text-base font-bold">{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default Dashboard;