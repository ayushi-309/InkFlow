const StatCard = ({ icon: Icon, iconBg, iconColor, label, value, badge, positive }) => (
  <div className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col gap-4 shadow-xs hover:shadow-sm transition-shadow duration-200">
    <div className="flex items-center justify-between">
      <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center`}>
        <Icon size={20} className={iconColor} />
      </div>
      {badge && (
        <span
          className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
            positive
              ? "bg-emerald-50 text-emerald-600"
              : "bg-red-50 text-red-500"
          }`}
        >
          {badge}
        </span>
      )}
    </div>

    <div>
      <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="font-serif text-[2rem] font-bold text-slate-900 leading-none">
        {value}
      </p>
    </div>
  </div>
);

export default StatCard;
