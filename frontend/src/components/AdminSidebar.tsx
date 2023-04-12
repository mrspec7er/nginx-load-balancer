import { Sidebar } from "flowbite-react";
import {
  HiTable,
  HiArrowSmRight,
  HiShoppingBag,
  HiUser,
  HiChartPie,
} from "react-icons/hi";
const AdminSidebar = () => {
  return (
    <div className="w-72">
      <Sidebar aria-label="Default sidebar example">
        <Sidebar.Items className="pt-16">
          <Sidebar.ItemGroup className="text-xl">
            <Sidebar.Item href={"/"} icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item icon={HiUser}>Users</Sidebar.Item>
            <Sidebar.Item href={"/"} icon={HiShoppingBag}>
              Products
            </Sidebar.Item>
            <Sidebar.Item icon={HiArrowSmRight}>Sign In</Sidebar.Item>
            <Sidebar.Item icon={HiTable}>Sign Up</Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default AdminSidebar;
