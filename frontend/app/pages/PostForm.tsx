import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authenticatedFetch } from "../utils/fetchUtils";
import { Community } from "../components/ForumSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../components/Avatar";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Tabs } from "../components/tabs";
import LoadingOverlay from "../components/LoadingOverlay";
import { storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/authStore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
export default function PostForm() {
  const { slugs } = useParams();
  const [fileError, setFileError] = useState("");
  const [community, setCommunity] = useState<Community | null>(null);
  const [imageSrc, setImageSrc] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
    const [render, setRender] = useState(0);
    const { user } = useAuth();
    const navigate = useNavigate();
  const forceUpdate = () => {
    setRender((prev) => prev + 1);
  };

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handlePictureChange = (file: File | null) => {
    setFileError("");
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setFile(file);
      forceUpdate();
    } else {
      setImageSrc("");
      setFileError("Unsupported file type");
    }
  };

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  useEffect(() => {
    const getCommunity = async () => {
      try {
        const res = await authenticatedFetch(
          `http://localhost:4040/api/community/${slugs}`,
          localStorage.getItem("token")
        );
        const data = await res.json();
        setCommunity(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCommunity();
  }, [slugs]);
  useEffect(() => {
    forceUpdate();
  }, [formData]);
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      handlePictureChange(droppedFile);
      e.dataTransfer.clearData();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      handlePictureChange(selectedFile);
    }
  };

  const uploadImage = async () => {
    if (file === null) return null;
    const imageRef = ref(storage, `images/${file.name + uuid()}`);
    const res = await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);
    return url;
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
   
    const url = await uploadImage();
    try {
      const res = await authenticatedFetch(
        "http://localhost:4040/api/post",
        localStorage.getItem("token"),
        {
          method: "post",
          body: JSON.stringify({
            title: formData.title,
            content: formData.content,
            img: url,
              communityId: community?.id,
            userId: user?.id
          }),
        }
      );
      const responseData = await res.json();
    } catch (err) {
      console.log(err);
      }
      setFormData({
      title: "",
      content: "",
    });
      setFile(null);
      setImageSrc("");
      navigate(`/forum/communities/${slugs}`)
    setLoading(false);
  };

  const tabs = [
    {
      title: "Text",
      value: "text",
      content: (
        <div className="  overflow-hidden h-full justify-start rounded-2xl p-10 text-xl md:text-4xl font-bold bg-white">
          <form
            onSubmit={handleCreatePost}
            className="flex gap-4 items-center flex-col justify-start py-4">
            <div className="flex w-[60vw] sm:w-96 items-center justify-center gap-4">
              <Input
                id="title"
                placeholder="Title"
                autoComplete="off"
                className="col-span-3"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
            <div className="flex items-center gap-4">
              <ReactQuill
                modules={modules}
                className="h-72 border-gray-300 mb-[6rem]"
                theme="snow"
                value={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
              />
            </div>
            {fileError && <p className="text-sm text-red-600">{fileError}</p>}
            <Button type="submit">Create Post</Button>
          </form>
        </div>
      ),
    },
    {
      title: "Images",
      value: "images",
      content: (
        <div className="w-screen overflow-hidden h-screen rounded-2xl p-10 text-xl md:text-4xl font-bold text-black bg-white">
          <div className="col-span-full w-[60%] ">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Upload a cover photo
            </label>
            <div
              className={`mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 ${
                isDragging ? "bg-gray-200" : "bg-white"
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}>
              <div className="text-center">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt="Uploaded File"
                    className="mx-auto h-48 w-48 object-cover rounded-md"
                  />
                ) : (
                  <svg
                    className="mx-auto h-12 w-12 text-gray-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <div className="mt-4 flex flex-col items-center w-full text-sm leading-6 text-gray-600">
                  <label className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-red">
                    <span>{imageSrc ? "Change file" : "Upload a file"}</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <p className="text-xs leading-5 text-gray-600 mt-2">
                  PNG, JPG, GIF up to 10MB
                </p>
                {file && (
                  <p className="text-sm leading-5 text-gray-600 mt-2">
                    Selected file: {file.name}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
      <div className="flex flex-col items-center">
          {loading && <LoadingOverlay />}
          <div className="h-screen md:h-[40rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start">
          
        <div className="flex items-center gap-5">
          <h1 className="text-3xl">Create post</h1>
          <div className="flex items-center gap-2 bg-slate-100 w-fit p-1 px-4 rounded-full">
            <Avatar className="w-[2rem] h-[2rem]">
              <AvatarImage src={community?.img}></AvatarImage>
              <AvatarFallback className="bg-white">
                {community?.title.split("")[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{community?.title}</p>
            </div>
          </div>
        </div>
        <div className="mt-10 w-full">
          <Tabs render={render} tabs={tabs} />
        </div>
      </div>
    </div>
  );
}
