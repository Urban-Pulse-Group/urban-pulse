// Login.tsx
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Label } from "../components/label";
import { useAuth } from "../state/authStore";
import ReturnHomeButton from "../components/ReturnHome";

export default function Login() {
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4040/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        setErrorMessage("Invalid Credentials");
        return;
      }

      const data = await res.json();
      console.log("Successfully logged in");

      login(data.token); // Set the token and authentication state
      setFormData({
        emailOrUsername: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      setErrorMessage("Invalid Credentials");
      console.error("Login error:", error);
    }
  };
return (
  <div className="w-screen flex items-center justify-center h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
     <div className="absolute left-5 top-5 ">
            <ReturnHomeButton />
          </div>
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6 mb-8 overflow-visible">
        <form className="grid gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your credentials below to sign in
            </p>
          </div>
          {errorMessage && (
            <div className="text-red-600 text-center">{errorMessage}</div>
          )}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email"></Label>
              <Input
                id="email"
                type="text"
                name="emailOrUsername"
                value={formData.emailOrUsername}
                onChange={(e) => handleChange(e)}
                placeholder="Email or Username"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password"></Label>
                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) => handleChange(e)}
                placeholder="Password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </form>
        
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

