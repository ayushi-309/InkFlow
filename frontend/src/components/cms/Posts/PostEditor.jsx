import { EditorContent } from '@tiptap/react';
import { RiArrowDownSLine } from "@remixicon/react";
import FormattingToolbar from "./FormattingToolbar";

const CATEGORIES = ["Business", "Technology", "Lifestyle", "Design", "Culture"];

const PostEditor = ({
  title, setTitle,
  slug, setSlug,
  category, setCategory,
  isCategoryOpen, setIsCategoryOpen,
  categoryRef,
  editor
}) => {
  return (
    <div className="lg:flex-1 lg:overflow-y-auto hide-scrollbar lg:border-r border-slate-100 flex flex-col">
      <div className="max-w-3xl mx-auto w-full px-6 lg:px-12 py-10 flex flex-col h-full">
        
        {/* Title Input */}
        <input
          type="text"
          placeholder="Post Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full font-serif text-4xl sm:text-[2.75rem] font-bold text-slate-900 placeholder:text-slate-300 outline-none leading-tight mb-8 bg-transparent"
        />

        {/* Metadata Row */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-slate-100 mb-6">
          <div className="flex-1">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Post Slug
            </label>
            <div className="flex items-center text-[13px] font-medium text-slate-600">
              <span className="text-slate-400 select-none">inkflow.com/tech/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="flex-1 outline-none text-indigo-600 hover:text-indigo-700 transition-colors ml-0.5 bg-transparent"
              />
            </div>
          </div>
          
          <div className="flex-1 sm:max-w-[200px] relative" ref={categoryRef}>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Category
            </label>
            <button 
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="w-full flex items-center justify-between text-[13px] font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              <span>{category}</span>
              <RiArrowDownSLine size={16} className={`text-slate-400 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`} />
            </button>
            
            {/* Category Dropdown */}
            {isCategoryOpen && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-lg z-10 py-1">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategory(cat);
                      setIsCategoryOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-[13px] font-medium transition-colors ${
                      category === cat ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Formatting Toolbar */}
        <FormattingToolbar editor={editor} />

        {/* Editor Textarea */}
        <div className="flex-1 w-full flex flex-col min-h-[400px] overflow-x-hidden">
          <EditorContent editor={editor} className="flex-1" />
        </div>
      </div>
    </div>
  );
};

export default PostEditor;
