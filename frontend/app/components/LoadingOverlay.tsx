import { MoonLoader } from "react-spinners";
import React from "react";



export default function LoadingOverlay() {
    return  <div className="fixed flex items-center justify-center inset-0 z-50 bg-black/10  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
    <MoonLoader color="#E11D48" />
  </div>
}