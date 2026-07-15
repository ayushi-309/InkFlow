import { useState } from "react";
import { RiTimeLine } from "@remixicon/react";
import { Link } from "react-router-dom";
import { PostCard } from "../../components/index.js";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Technology", "Lifestyle", "Business"];

  const featuredPost = {
    id: "featured",
    title: "The Architecture of Modern Consciousness: How Digital Spaces Shape Our Internal Narrative",
    subtitle: "Exploring the intersection of behavioral psychology and interface design in the age of generative environments.",
    category: "Featured Post",
    readTime: "12 min read",
    author: "Elena Vance",
    image: "/images/featured_post.png"
  };

  const posts = [
    {
      id: "green-pivot",
      title: "The Green Pivot: Why Institutional Investors are Betting on Urban Verticals",
      category: "Business",
      excerpt: "Commercial real estate is undergoing a radical transformation as carbon neutrality targets shift from optional to mandatory...",
      readTime: "8 min read",
      date: "May 14, 2024",
      image: "/images/green_pivot.png",
      categoryColor: "text-blue-600"
    },
    {
      id: "slow-craft",
      title: "The Quiet Revolution of Slow Craft in the High-Speed Digital Era",
      category: "Lifestyle",
      excerpt: "In a world driven by constant connectivity, artisans find solace and sustainability in returning to physical mediums and ancient techniques.",
      readTime: "5 min read",
      date: "May 12, 2024",
      image: "/images/slow_craft.png",
      categoryColor: "text-indigo-600"
    },
    {
      id: "beyond-silicon",
      title: "Beyond Silicon: The Emergence of Neuromorphic Edge Computing",
      category: "Technology",
      excerpt: "Mimicking the human brain's neural architecture, neuromorphic chips promise orders-of-magnitude energy efficiency improvements for next-gen AI.",
      readTime: "10 min read",
      date: "May 10, 2024",
      image: "/images/neuromorphic_computing.png",
      categoryColor: "text-violet-600"
    },
    {
      id: "new-venture",
      title: "The New Venture Paradigm: Community-Led Growth Strategies",
      category: "Business",
      excerpt: "Traditional sales funnels are giving way to digital communities. Discover how modern businesses foster organic customer advocacy.",
      readTime: "7 min read",
      date: "May 08, 2024",
      image: "/images/community_growth.png",
      categoryColor: "text-blue-600"
    },
    {
      id: "regenerative-tourism",
      title: "Regenerative Tourism: The Future of Responsible Travel",
      category: "Lifestyle",
      excerpt: "Traveling that goes beyond leaving no trace—how green developments are actively restoring local ecosystems and uplifting communities.",
      readTime: "6 min read",
      date: "May 06, 2024",
      image: "/images/regenerative_tourism.png",
      categoryColor: "text-indigo-600"
    }
  ];

  // Filter posts based on selected category
  const filteredPosts = selectedCategory === "All"
    ? posts
    : posts.filter(post => post.category === selectedCategory);


  return (
    <main className="w-full bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
        
        {/* Featured Post */}
        <section className="relative w-full h-[450px] md:h-[550px] overflow-hidden rounded-2xl group cursor-pointer shadow-sm">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ backgroundImage: `url('${featuredPost.image}')` }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15" />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
            <div className="max-w-3xl">
              <span className="inline-block bg-indigo-600 text-white text-[11px] font-bold tracking-wider px-3.5 py-1 rounded-full uppercase">
                {featuredPost.category}
              </span>
              
              <h2 className="text-white font-serif text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mt-4 tracking-tight">
                <Link to={`/blog-detail/${featuredPost.id}`} className="hover:underline">
                  {featuredPost.title}
                </Link>
              </h2>
              
              <p className="text-slate-200 font-sans text-sm md:text-base mt-3 max-w-2xl font-light leading-relaxed">
                {featuredPost.subtitle}
              </p>
              
              <div className="text-slate-300 text-xs md:text-sm mt-5 flex items-center gap-4 font-medium">
                <span className="flex items-center gap-1.5">
                  <RiTimeLine size={16} className="text-slate-400" />
                  {featuredPost.readTime}
                </span>
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full" />
                <span>By {featuredPost.author}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section Heading & Category Filter Pills */}
        <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-slate-100 pb-6">
          <h3 className="font-serif text-3xl font-bold text-slate-900 tracking-tight">
            Recent Perspectives
          </h3>
          
          <div className="flex flex-wrap gap-2.5">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-black border-black text-white shadow-sm"
                      : "bg-transparent border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="w-full">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 text-slate-500 font-medium">
              No posts found in this category.
            </div>
          ) : selectedCategory === "All" ? (
            // Custom Mockup Layout (1st post is col-span-2, others are col-span-1)
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Card 1: The Green Pivot (Spans 2 columns, horizontal layout) */}
              {filteredPosts[0] && (
                <PostCard post={filteredPosts[0]} horizontal={true} />
              )}

              {/* Card 2: The Quiet Revolution (Spans 1 column, vertical layout) */}
              {filteredPosts[1] && (
                <PostCard post={filteredPosts[1]} />
              )}

              {/* Row 2: Card 3, 4, 5 (Each spans 1 column) */}
              {filteredPosts.slice(2, 5).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}

            </div>
          ) : (
            // Standard Grid Layout for filtered single-category results
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Home;