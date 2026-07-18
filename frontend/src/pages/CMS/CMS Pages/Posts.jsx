import { useState, useRef } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { useOutletContext } from "react-router-dom";

import {
  PostActionBar,
  PostEditor,
  PostSidebar,
} from "../../../components/index.js";

const Posts = () => {
  const { setIsSidebarOpen } = useOutletContext();

  // Form State
  const [title, setTitle] = useState(
    "The Future of Distributed Editorial Teams",
  );
  const [slug, setSlug] = useState("future-editorial-workflow");
  const [category, setCategory] = useState("Business");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
    ],
    content: `In the rapidly evolving landscape of digital journalism, the infrastructure supporting editorial teams has become as critical as the content itself. As we transition toward more decentralized models, the tools we use must facilitate not just writing, but orchestration.<br><br>Consider the traditional newsroom: a hub of physical activity where proximity drove collaboration. Today, that proximity is digital. A modern CMS like InkFlow isn't just a database for articles; it's a synchronous platform for real-time iteration.<br><br><blockquote>"The efficiency of an editorial team is inversely proportional to the number of tools they have to switch between to publish a single story."</blockquote><br><br>We are seeing a shift toward "headless" architectures that allow content to be decoupled from its presentation layer. This flexibility is no longer a luxury—it is the prerequisite for multi-channel dominance in an age of fragmented attention.`,
    editorProps: {
      attributes: {
        class:
          "flex-1 w-full prose prose-slate max-w-none prose-p:leading-relaxed prose-p:text-[15px] sm:prose-p:text-base prose-p:text-slate-700 prose-a:text-indigo-600 outline-none bg-transparent min-h-[300px]",
      },
    },
  });

  const [image, setImage] = useState("/images/neuromorphic_computing.png");
  const [tags, setTags] = useState(["Technology", "Workflow"]);
  const [newTag, setNewTag] = useState("");
  const [status, setStatus] = useState("Draft");
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef(null);
  const categoryRef = useRef(null);

  // Handlers
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && newTag.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(newTag.trim())) {
        setTags([...tags, newTag.trim()]);
      }
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSave = (newStatus) => {
    setIsSaving(true);
    console.log({
      status: newStatus,
      title,
      slug,
      category,
      content: editor?.getHTML(),
      image,
      tags
    });
    // Simulate API call
    setTimeout(() => {
      setStatus(newStatus);
      setIsSaving(false);
      // In a real app, you would show a success toast here
    }, 800);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-white">
      <PostActionBar
        status={status}
        isSaving={isSaving}
        handleSave={handleSave}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="block lg:flex flex-1 min-h-0 overflow-y-auto lg:overflow-hidden">
        <PostEditor
          title={title}
          setTitle={(newTitle) => {
            setTitle(newTitle);
            setSlug(newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
          }}
          slug={slug}
          setSlug={setSlug}
          category={category}
          setCategory={setCategory}
          isCategoryOpen={isCategoryOpen}
          setIsCategoryOpen={setIsCategoryOpen}
          categoryRef={categoryRef}
          editor={editor}
        />

        <PostSidebar
          image={image}
          handleImageUpload={handleImageUpload}
          fileInputRef={fileInputRef}
          tags={tags}
          newTag={newTag}
          setNewTag={setNewTag}
          handleAddTag={handleAddTag}
          handleRemoveTag={handleRemoveTag}
        />
      </div>
    </div>
  );
};

export default Posts;
