"use client";
import React, { useState } from "react";
import Login from "@/app/ui/Login";
export default function page() {
  let isLogin = false;
  if (typeof window !== "undefined") {
    isLogin = localStorage.getItem("user");
  }
  const [openModal, setOpenModal] = useState(!isLogin);

  return (
    <div>
      <h3>Admin</h3>
      <Login open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}
