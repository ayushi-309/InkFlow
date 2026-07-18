import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  RiArticleLine,
  RiEyeLine,
  RiChat1Line,
} from "@remixicon/react";

import { CMSHeader, StatCard, RecentPostsTable, CMSFooter } from "../../../components/index.js";

/* ── Mock data ── */
const STATS = [
  {
    icon: RiArticleLine,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
    label: "Total Posts",
    value: "1,284",
    badge: "+12%",
    positive: true,
  },
  {
    icon: RiEyeLine,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
    label: "Monthly Views",
    value: "84.2k",
    badge: "+5.4k",
    positive: true,
  },
  {
    icon: RiChat1Line,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
    label: "Total Comments",
    value: "3,912",
    badge: "-2%",
    positive: false,
  },
];

const RECENT_POSTS = [
  {
    id: "1",
    title: "The Future of Sustainable Architecture in 2024",
    category: "Technology & Lifestyle",
    status: "Published",
    date: "Oct 24, 2023",
    image: "/images/neuromorphic_computing.png",
  },
  {
    id: "2",
    title: "Digital Minimalism: A Guide to Deep Work",
    category: "Lifestyle",
    status: "Draft",
    date: "Oct 22, 2023",
    image: "/images/slow_craft.png",
  },
  {
    id: "3",
    title: "Understanding the Global Economic Shift",
    category: "Business",
    status: "Published",
    date: "Oct 20, 2023",
    image: "/images/green_pivot.png",
  },
  {
    id: "4",
    title: "Beyond Silicon: Neuromorphic Edge Computing",
    category: "Technology",
    status: "Scheduled",
    date: "Oct 18, 2023",
    image: "/images/neuromorphic_computing.png",
  },
];

/* ─────────────────────────────── Component ─────────────────────────────── */
const Dashboard = () => {
  const { setIsSidebarOpen } = useOutletContext();
  const [search, setSearch] = useState("");

  const filteredPosts = RECENT_POSTS.filter((p) =>
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
          onEdit={(post) => console.log("Edit", post.id)}
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