import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="flex h-dvh flex-col bg-[#f5f5f5] [&>main]:flex-1">
      <Outlet />
    </div>
  );
}

export default RootLayout;
