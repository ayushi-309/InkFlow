import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { RiAddCircleLine, RiArrowDownSLine } from "@remixicon/react";
import { CMSHeader } from "../../../components/index.js";

const INITIAL_CATEGORIES = [
  { id: 1, name: "Technology", slug: "technology", postCount: 142, colorClass: "bg-blue-500" },
  { id: 2, name: "Lifestyle", slug: "lifestyle", postCount: 89, colorClass: "bg-emerald-400" },
  { id: 3, name: "Business", slug: "business", postCount: 215, colorClass: "bg-slate-400" },
  { id: 4, name: "Design", slug: "design", postCount: 56, colorClass: "bg-indigo-300" },
  { id: 5, name: "Urban Tech", slug: "urban-tech", postCount: 34, colorClass: "bg-emerald-600" },
];

const Categories = () => {
  const { setIsSidebarOpen } = useOutletContext();
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  
  // Form State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [parent, setParent] = useState("None");
  const [description, setDescription] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  
  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
  };

  const handleEditClick = (cat) => {
    setEditingCategoryId(cat.id);
    setName(cat.name);
    setSlug(cat.slug);
    setParent(cat.parent || "None");
    setDescription(cat.description || "");
    document.getElementById('name-input')?.focus();
  };

  const handleCancelEdit = () => {
    setEditingCategoryId(null);
    setName("");
    setSlug("");
    setParent("None");
    setDescription("");
  };

  const handleSaveCategory = () => {
    if (!name.trim() || !slug.trim()) return;
    
    if (editingCategoryId) {
      setCategories(categories.map(cat => 
        cat.id === editingCategoryId 
          ? { ...cat, name: name.trim(), slug: slug.trim(), parent, description } 
          : cat
      ));
    } else {
      const colors = ["bg-blue-500", "bg-emerald-400", "bg-indigo-500", "bg-purple-500", "bg-rose-500", "bg-amber-500"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      const newCat = {
        id: Date.now(),
        name: name.trim(),
        slug: slug.trim(),
        postCount: 0,
        colorClass: randomColor,
        parent,
        description
      };
      
      setCategories([...categories, newCat]);
    }
    
    handleCancelEdit();
  };

  return (
    <div className="flex flex-col flex-1 px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto">
      <div className="flex-shrink-0">
        <CMSHeader
          title="Categories"
          subtitle="Manage and organize your editorial taxonomy."
          hideSearch={true}
          primaryAction={{
            label: "Create New Category",
            icon: <RiAddCircleLine size={16} />,
            onClick: () => document.getElementById('name-input')?.focus()
          }}
          onMenuClick={() => setIsSidebarOpen(true)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8">
        {/* Categories Table (Left) */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="px-6 py-4 font-bold">Name</th>
                    <th className="hidden sm:table-cell px-6 py-4 font-bold">Slug</th>
                    <th className="hidden md:table-cell px-6 py-4 font-bold">Post Count</th>
                    <th className="px-6 py-4 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {categories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${cat.colorClass}`}></div>
                          <span className="font-medium text-[15px] text-slate-900">{cat.name}</span>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-1 rounded bg-slate-100 text-slate-600 text-xs font-medium">
                          {cat.slug}
                        </span>
                      </td>
                      <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-[15px] text-slate-600">
                        {cat.postCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {/* Edit Action */}
                        <div 
                          onClick={() => handleEditClick(cat)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 group-hover:text-slate-500 hover:bg-slate-200 cursor-pointer transition-colors"
                        >
                          <span className="sr-only">Edit</span>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Add Category Form (Right) */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 lg:p-8">
            <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">
              {editingCategoryId ? "Edit Category" : "Add Category"}
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Category Name</label>
                <input
                  id="name-input"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="e.g. Science"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] px-4 py-2.5 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400"
                />
                <p className="text-[12px] text-slate-500 mt-2 font-medium">The name is how it appears on your site.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. science"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] px-4 py-2.5 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400"
                />
                <p className="text-[12px] text-slate-500 mt-2 font-medium">The "slug" is the URL-friendly version of the name.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Parent Category</label>
                <div className="relative">
                  <select
                    value={parent}
                    onChange={(e) => setParent(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] px-4 py-2.5 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all appearance-none cursor-pointer"
                  >
                    <option value="None">None</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                    <RiArrowDownSLine size={20} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief overview of this category..."
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] px-4 py-3 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400 resize-none"
                ></textarea>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveCategory}
                  disabled={!name.trim() || !slug.trim()}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] text-white text-[15px] font-bold px-4 py-3 rounded-xl transition-all duration-200"
                >
                  {editingCategoryId ? "Update Category" : "Save Category"}
                </button>
                {editingCategoryId && (
                  <button
                    onClick={handleCancelEdit}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 active:scale-[0.98] text-slate-700 text-[15px] font-bold px-4 py-3 rounded-xl transition-all duration-200"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;