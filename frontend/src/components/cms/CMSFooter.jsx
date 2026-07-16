const CMSFooter = () => (
  <footer className="mt-auto pt-8 pb-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-slate-400 font-medium border-t border-slate-100">
    <p>© {new Date().getFullYear()} InkFlow Editorial. All rights reserved.</p>
    <div className="flex items-center gap-4">
      <span className="hover:text-slate-700 cursor-pointer transition-colors">Documentation</span>
      <span className="hover:text-slate-700 cursor-pointer transition-colors">Support</span>
      <span className="hover:text-slate-700 cursor-pointer transition-colors">API Status</span>
    </div>
  </footer>
);

export default CMSFooter;
