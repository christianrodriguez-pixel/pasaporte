import { Outlet } from "react-router";
import { BottomNav } from "./bottom-nav";

export function AppLayout() {
  return (
    <div className="max-w-md mx-auto relative min-h-dvh bg-[#F9F7EB]">
      <Outlet />
      <BottomNav />
    </div>
  );
}
