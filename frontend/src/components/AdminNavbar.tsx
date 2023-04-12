import { Navbar } from "flowbite-react";
const AdminNavbar = () => {
  return (
    <Navbar className="px-5" fluid={true} rounded={true}>
      <Navbar.Brand>
        <img src="/logo.png" className="mr-3 h-6 sm:h-9" alt="Company-Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Inventory
        </span>
      </Navbar.Brand>
    </Navbar>
  );
};

export default AdminNavbar;
