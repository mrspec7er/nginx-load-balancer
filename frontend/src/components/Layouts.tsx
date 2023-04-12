import { ReactNode, useEffect, useState } from "react";
import Navbar from "./AdminNavbar";
import Sidebar from "./AdminSidebar";
const Layouts = ({ children }: { children: ReactNode }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  useEffect(() => {
    if (window.screen.width < 600) {
      setShowSidebar(false);
    }
  }, [window.screen.width]);
  return (
    <div className="flex max-w-[100vw] bg-gray-100 min-h-screen">
      {showSidebar ? <Sidebar /> : null}
      <div className="overflow-hidden w-full relative md:mx-3">
        <Navbar />
        <div className="mt-5 bg-white container mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default Layouts;
