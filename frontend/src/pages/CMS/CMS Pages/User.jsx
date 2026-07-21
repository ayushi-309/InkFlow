import { useState, useRef, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { CMSHeader } from "../../../components/index.js";
import { RiLoader4Line } from "@remixicon/react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfilePhoto, updateProfileDetail } from "../../../features/user/user.slice.js";

const User = () => {
  const { setIsSidebarOpen } = useOutletContext();
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.data?.data);
  

  const [name, setName] = useState(user?.fullname);
  const [email, setEmail] = useState(user?.email);
  const [description, setDescription] = useState(user?.bio);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar);
  const [avatarFile, setAvatarFile] = useState(null);
  
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.fullname || "");
      setEmail(user.email || "");
      setDescription(user.bio || "");
      if (user.avatar) setAvatarPreview(user.avatar);
    }
  }, [user]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);

      const formData = new FormData();
      formData.append("avatar", file);
      
      dispatch(updateProfilePhoto(formData))
        .unwrap()
        .then(() => {
          alert("Avatar updated successfully!");
        })
        .catch((err) => {
          alert(err?.message || "Failed to update avatar.");
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    const data = {
      fullname: name,
      bio: description,
    };
    
    dispatch(updateProfileDetail(data))
      .unwrap()
      .then(() => {
        alert("Profile updated successfully!");
      })
      .catch((err) => {
        alert(err?.message || "Failed to update profile.");
      });
    setIsSaving(false);
  };

  return (
    <div className="flex flex-col flex-1 px-6 lg:px-8 py-8 w-full max-w-3xl mx-auto">
      <div className="flex-shrink-0">
        <CMSHeader
          title="User Profile"
          subtitle="Manage your personal account settings."
          hideSearch={true}
          hideAction={true}
          onMenuClick={() => setIsSidebarOpen(true)}
        />
      </div>

      <form onSubmit={handleSubmit} className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 rounded-full bg-slate-200 overflow-hidden border-2 border-slate-100 flex-shrink-0 relative flex items-center justify-center text-slate-500 text-2xl font-bold select-none">
            {name.substring(0, 2).toUpperCase()}
            {avatarPreview && (
              <img 
                src={avatarPreview} 
                alt="Profile" 
                className="absolute inset-0 w-full h-full object-cover z-10" 
                onError={(e) => { e.target.style.display = 'none'; setAvatarPreview(null); }} 
              />
            )}
          </div>
          <div>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/webp"
              className="hidden"
            />
            <button 
              type="button"
              onClick={handleAvatarClick}
              className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-200 transition-colors"
            >
              Change Avatar
            </button>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] px-4 py-2.5 rounded-xl outline-none focus:bg-white focus:border-indigo-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] px-4 py-2.5 rounded-xl outline-none focus:bg-white focus:border-indigo-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-2">Short Bio / Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us a little bit about yourself..."
              rows={4}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] px-4 py-3 rounded-xl outline-none focus:bg-white focus:border-indigo-500 transition-all resize-none placeholder:text-slate-400"
            ></textarea>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
          <button 
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[15px] font-bold rounded-xl active:scale-[0.98] transition-all disabled:opacity-70 disabled:pointer-events-none"
          >
            {isSaving && <RiLoader4Line size={18} className="animate-spin" />}
            {isSaving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  )
};

export default User;