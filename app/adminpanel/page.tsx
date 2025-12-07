"use client"; // обязательно

import dynamic from "next/dynamic";

const AdminPanel = dynamic(() => import("./AdminPanelInner"), { ssr: false });

export default function Page() {
  return <AdminPanel />;
}
