import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { useAuth } from "../state/authStore";
interface FormData {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export default function Signup() {
  const {login} = useAuth()
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const navigate = useNavigate()


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords dont match")
      return;
    }

    try {
      const reqBody: Partial<FormData> = {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
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
        login(data.token)
        navigate("/")
        setErrorMessage(null);
        setFormData({
          name: "",
          username: "",
          password: "",
          confirmPassword: "",
          email: "",
        });
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setErrorMessage("An unexpected error occurred during registration");
    }
  };

  return (
    <div className="w-screen justify-center flex items-center h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <form onSubmit={handleSubmit} className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              Enter your credentials below to sign up
            </p>
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
            <Button
              type="submit"
              className="w-full">
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
