import { RiPencilLine, RiDeleteBinLine } from "@remixicon/react";

const STATUS_STYLES = {
  Published: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Draft:     "bg-amber-50  text-amber-700  border border-amber-200",
  Scheduled: "bg-blue-50   text-blue-700   border border-blue-200",
};

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${
      STATUS_STYLES[status] ?? "bg-slate-100 text-slate-600 border border-slate-200"
    }`}
  >
    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
    {status}
  </span>
);

const RecentPostsTable = ({ posts, onEdit, onDelete }) => (
  <div className="bg-white border border-slate-100 rounded-2xl shadow-xs overflow-hidden">
    {/* Table header */}
    <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
      <h2 className="font-serif text-lg font-bold text-slate-900">Recent Posts</h2>
    </div>

    {/* Table */}
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px] text-sm">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-6 py-3">
              Post Title
            </th>
            <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-4 py-3">
              Status
            </th>
            <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-4 py-3">
              Date
            </th>
            <th className="text-right text-[11px] font-bold text-slate-400 uppercase tracking-wider px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-slate-50/60 transition-colors duration-150 group">
              {/* Title + category */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 leading-snug truncate max-w-[280px]">
                      {post.title}
                    </p>
                    <p className="text-slate-400 text-[12px] font-medium mt-0.5">
                      {post.category}
                    </p>
                  </div>
                </div>
              </td>

              {/* Status */}
              <td className="px-4 py-4 whitespace-nowrap">
                <StatusBadge status={post.status} />
              </td>

              {/* Date */}
              <td className="px-4 py-4 whitespace-nowrap text-slate-500 font-medium text-[13px]">
                {post.date}
              </td>

              {/* Actions */}
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <button
                    onClick={() => onEdit?.(post)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all duration-150"
                    aria-label="Edit"
                  >
                    <RiPencilLine size={15} />
                  </button>
                  <button
                    onClick={() => onDelete?.(post)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-150"
                    aria-label="Delete"
                  >
                    <RiDeleteBinLine size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default RecentPostsTable;
