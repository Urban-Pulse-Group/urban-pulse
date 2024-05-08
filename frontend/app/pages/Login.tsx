import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Label } from "../components/label";

export default function Login() {
  return (
    <div className="w-full  h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your credentials below to sign in
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email"></Label>
              <Input
                id="email"
                type="email"
                placeholder="Username or Email"
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
              <Input id="password" type="password" placeholder="Password" required />
            </div>
            <Button className="w-full bg-red-600 hover:bg-red-700">
              Login
            </Button>
          
          </div>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden  lg:h-screen   bg-muted lg:flex items-center">
        <img
          src="/logo.svg"
          alt="Image"
          className=" w-[50vw] object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
