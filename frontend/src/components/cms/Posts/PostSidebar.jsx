import { RiArrowDownSLine, RiUploadCloudLine, RiCloseLine, RiDeleteBinLine } from "@remixicon/react";

const PostSidebar = ({
  image, handleImageUpload, fileInputRef,
  tags, newTag, setNewTag, handleAddTag, handleRemoveTag
}) => {
  return (
    <aside className="w-full lg:w-[320px] xl:w-[360px] bg-slate-50/50 flex flex-col flex-shrink-0 lg:overflow-y-auto">
      
      {/* Post Settings Header */}
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors">
        <h3 className="text-[13px] font-bold text-slate-900">Post Settings</h3>
        <RiArrowDownSLine size={18} className="text-slate-400" />
      </div>

      <div className="p-6 space-y-8 flex-1">
        
        {/* Featured Image */}
        <div>
          <label className="block text-[12px] font-medium text-slate-600 mb-3">
            Featured Image
          </label>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            className="hidden" 
          />
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="relative w-full aspect-video rounded-xl border-2 border-dashed border-slate-200 bg-white overflow-hidden group cursor-pointer hover:border-indigo-400 transition-colors"
          >
            {image ? (
              <>
                <img 
                  src={image} 
                  alt="Featured" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-opacity"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    // In a real app we might want a handler passed down to clear it
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-[2px]">
                  <RiUploadCloudLine size={24} className="text-slate-700 mb-1" />
                  <span className="text-[12px] font-bold text-slate-700">Change Image</span>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 group-hover:text-indigo-500 transition-colors">
                 <RiUploadCloudLine size={28} className="mb-2" />
                 <span className="text-[12px] font-semibold">Upload Image</span>
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-[12px] font-medium text-slate-600 mb-3">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map(tag => (
              <span key={tag} className="inline-flex items-center gap-1 bg-slate-200/60 text-slate-700 text-[11px] font-bold px-2.5 py-1 rounded-md">
                {tag}
                <button onClick={() => handleRemoveTag(tag)} className="hover:text-red-500 transition-colors">
                  <RiCloseLine size={12} />
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Add a tag and press Enter..."
            className="w-full bg-white border border-slate-200 text-slate-700 text-[13px] px-3 py-2 rounded-lg outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all placeholder:text-slate-400"
          />
        </div>

        <hr className="border-slate-100" />

        {/* Visibility & Publishing */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-slate-600">Visibility</span>
            <button className="text-[13px] font-semibold text-indigo-600 hover:text-indigo-700">Public</button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-slate-600">Publish Date</span>
            <button className="text-[13px] font-semibold text-slate-900 hover:text-indigo-600">Immediately</button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-slate-600">Author</span>
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-5 h-5 rounded-full bg-slate-200 overflow-hidden">
                 <img src="/images/avatar.jpg" alt="Author" className="w-full h-full object-cover" 
                      onError={(e) => e.target.style.display = 'none'} />
              </div>
              <span className="text-[13px] font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">J. Thorne</span>
            </div>
          </div>
        </div>

      </div>
      
      {/* Trash Action */}
      <div className="p-6 border-t border-slate-100 mt-auto">
        <button className="flex items-center gap-2 text-[13px] font-bold text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 -ml-3 rounded-xl transition-colors w-full">
          <RiDeleteBinLine size={16} /> Move to Trash
        </button>
      </div>

    </aside>
  );
};

export default PostSidebar;
