import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Label } from "../components/label";
import { useAuth } from "../state/authStore";
import { storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { Avatar, AvatarFallback, AvatarImage } from "../components/Avatar";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ReturnHomeButton from "../components/ReturnHome";
interface FormData {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  img: File | null;
}

export default function Signup() {
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string>("");
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    img: null,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const uploadImage = async () => {
    if (formData.img === null) return null;
    const imageRef = ref(storage, `images/${formData.img.name + uuid()}`);
    const res = await uploadBytes(imageRef, formData.img);
    const url = await getDownloadURL(imageRef);
    console.log("urlllllll:", url)
    return url;
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    const file = e.target.files ? e.target.files[0] : null;
    
    if (file && file.type.startsWith("image/")) {
      setFormData((formData) => ({
        ...formData,
        img: file
      }));
      const reader: FileReader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setImgSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImgSrc(null);
      setFileError("Unsupported file type");
    }
  };

console.log(formData)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    try {
      const url = await uploadImage() || "";
    
      const reqBody = {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        img: url,
      };

      const res = await fetch("http://localhost:4040/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reqBody),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error:", errorData);
        setErrorMessage(`Error: ${errorData.message || "Registration failed"}`);
      } else {
        const data = await res.json();
        console.log("Signup successful:", data);
        login(data.token);
        navigate("/");
        setErrorMessage(null);
        setFormData({
          name: "",
          username: "",
          password: "",
          confirmPassword: "",
          email: "",
          img: null,
        });
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setErrorMessage("An unexpected error occurred during registration");
    }
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-screen justify-center flex items-center h-screen overflow-scroll sm:overflow-hidden lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto mt-10 sm:mt-0 grid w-[350px] gap-6">
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Sign Up</h1>
              <p className="text-balance text-muted-foreground">
                Enter your credentials below to sign up
              </p>
            </div>
            <div className="w-full flex flex-col items-center">
              <Avatar className="w-20 h-20" onClick={handleAvatarClick}>
                {imgSrc ? (
                  <AvatarImage src={imgSrc} alt="Uploaded avatar" />
                ) : (
                  <AvatarFallback>?</AvatarFallback>
                )}
              </Avatar>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              {fileError && <p className="text-red-500 mt-2">{fileError}</p>}
            </div>
            {errorMessage && (
              <div className="text-red-600 text-center">{errorMessage}</div>
            )}
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  autoComplete="off"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="off"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign up
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Login
              </Link>
            </div>
          </form>
          <div className="mt-4 text-center">
            <ReturnHomeButton />
          </div>
        </div>
      </div>
      <div className="hidden lg:h-screen bg-muted lg:flex items-center">
        <img
          src="/logo.svg"
          alt="Image"
          className="w-[50vw] object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
