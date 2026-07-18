import {
  RiBold,
  RiItalic,
  RiUnderline,
  RiListUnordered,
  RiListOrdered,
  RiDoubleQuotesL,
  RiLink,
  RiCodeSSlashLine,
} from "@remixicon/react";

const FormattingToolbar = ({ editor }) => {
  return (
    <div className="pb-6 border-b border-slate-100 mb-8">
      <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar -ml-1.5">
        <button 
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded-lg transition-colors ${editor?.isActive('bold') ? 'bg-slate-200 text-slate-900' : 'text-slate-700 hover:bg-slate-100'}`}
        ><RiBold size={18} /></button>
        <button 
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded-lg transition-colors ${editor?.isActive('italic') ? 'bg-slate-200 text-slate-900' : 'text-slate-700 hover:bg-slate-100'}`}
        ><RiItalic size={18} /></button>
        <button 
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className={`p-1.5 rounded-lg transition-colors ${editor?.isActive('underline') ? 'bg-slate-200 text-slate-900' : 'text-slate-700 hover:bg-slate-100'}`}
        ><RiUnderline size={18} /></button>
        <div className="w-px h-5 bg-slate-200 mx-1"></div>
        <button 
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded-lg transition-colors ${editor?.isActive('bulletList') ? 'bg-slate-200 text-slate-900' : 'text-slate-700 hover:bg-slate-100'}`}
        ><RiListUnordered size={18} /></button>
        <button 
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded-lg transition-colors ${editor?.isActive('orderedList') ? 'bg-slate-200 text-slate-900' : 'text-slate-700 hover:bg-slate-100'}`}
        ><RiListOrdered size={18} /></button>
        <button 
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded-lg transition-colors ${editor?.isActive('blockquote') ? 'bg-slate-200 text-slate-900' : 'text-slate-700 hover:bg-slate-100'}`}
        ><RiDoubleQuotesL size={18} /></button>
        <div className="w-px h-5 bg-slate-200 mx-1"></div>
        <button 
          onClick={() => {
            if (editor?.isActive('link')) {
              editor?.chain().focus().unsetLink().run();
            } else {
              const url = window.prompt('URL');
              if (url) {
                editor?.chain().focus().setLink({ href: url }).run();
              }
            }
          }}
          className={`p-1.5 rounded-lg transition-colors ${editor?.isActive('link') ? 'bg-slate-200 text-slate-900' : 'text-slate-700 hover:bg-slate-100'}`}
        ><RiLink size={18} /></button>

        <button 
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          className={`p-1.5 rounded-lg transition-colors ${editor?.isActive('codeBlock') ? 'bg-slate-200 text-slate-900' : 'text-slate-700 hover:bg-slate-100'}`}
        ><RiCodeSSlashLine size={18} /></button>
      </div>
    </div>
  );
};

export default FormattingToolbar;
