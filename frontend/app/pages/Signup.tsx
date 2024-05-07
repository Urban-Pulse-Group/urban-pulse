import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Label } from "../components/label";

export default function Signup() {
  return (
    <div className="w-full h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              Enter your credentials below to sign up
            </p>
          </div>
          <div className="grid gap-4">
          <div className="grid gap-2">
              <Label htmlFor="name"></Label>
              <Input
                id="name"
                type="text"
                placeholder="Name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email"></Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username"></Label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                required
              />
            </div>
            <div className="grid gap-2">

              <Input id="password" type="password" placeholder="Password" required />
            </div>
            <div className="grid gap-2">

              <Input id="password" type="password" placeholder="Confirm Password" required />
            </div>
            <Button className="w-full">
              Login
            </Button>
          
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        {/* <img
          src="/placeholder.svg"
          alt="Image"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        /> */}
      </div>
    </div>
  );
}
