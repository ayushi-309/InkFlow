import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../../../features/blog/blog.slice.js";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {
  useOutletContext,
  useSearchParams,
  useNavigate,
} from "react-router-dom";

import {
  PostActionBar,
  PostEditor,
  PostSidebar,
} from "../../../components/index.js";

const Posts = () => {
  const { setIsSidebarOpen } = useOutletContext();
  const [searchParams] = useSearchParams();
  const urlSlug = searchParams.get("slug");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form State
  const [title, setTitle] = useState(
    urlSlug
      ? urlSlug
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "",
  );
  const [slug, setSlug] = useState(urlSlug || "");
  const [category, setCategory] = useState("Lifestyle");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "flex-1 w-full prose prose-slate max-w-none prose-p:leading-relaxed prose-p:text-[15px] sm:prose-p:text-base prose-p:text-slate-700 prose-a:text-indigo-600 outline-none bg-transparent min-h-[300px]",
      },
    },
  });

  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [status, setStatus] = useState("draft");
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef(null);
  const categoryRef = useRef(null);

  // Handlers
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
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

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("category", category);
    formData.append("content", editor?.getHTML());
    formData.append("status", String(newStatus).toLowerCase());

    tags.forEach((tag) => formData.append("tags", tag));

    if (imageFile) {
      formData.append("featuredImage", imageFile);
    }

    dispatch(createBlog(formData))
      .unwrap()
      .then(() => {
        setStatus(newStatus);
        alert("Blog post saved successfully!");
        navigate("/dashboard");
      })
      .catch((err) => {
        alert(err?.message || "Failed to save blog post.");
      })
      .finally(() => {
        setIsSaving(false);
      });
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
          setTitle={setTitle}
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
