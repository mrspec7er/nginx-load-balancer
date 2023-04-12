import { BsPlusSquare } from "react-icons/bs";
import { Link } from "react-router-dom";

interface HeaderProps {
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  keyword: string;
}

const TableHeader = ({ setLimit, limit, setPage, setKeyword }: HeaderProps) => {
  return (
    <>
      <div className="p-5 flex gap-3 justify-between flex-col md:flex-row md:text-base text-sm bg-white">
        <Link to="/form">
          <button className="bg-blue-500 md:font-semibold font-medium flex justify-center items-center gap-3 text-white rounded-lg md:w-40 w-full md:h-11 border border-black h-10">
            <BsPlusSquare className="text-xl" />
            <span>Insert Product</span>
          </button>
        </Link>

        <form>
          <label
            htmlFor="default-search"
            className="text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
          <div className="relative">
            <input
              onChange={(e) => {
                setPage(1);
                setKeyword(e.target.value);
              }}
              type="search"
              id="default-search"
              className="block py-3 pl-5 md:w-72 lg:w-96 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray focus:ring-blue focus:border-blue"
              placeholder="Search..."
            />
            <button
              type="submit"
              className="text-grey absolute right-2.5 bottom-1.5 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue font-medium rounded-lg text-sm px-4 py-2"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
      <div className="pb-5 flex justify-between gap-3 md:flex-row flex-col font-medium bg-white">
        <div className="flex gap-1">
          <p className="pr-2">Showing</p>
          <input
            defaultValue={limit}
            onChange={(e) => {
              setLimit(
                !isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : 1
              );
              setPage(1);
            }}
            className="border rounded w-12 h-7"
            type="number"
          />
          <p>Data</p>
        </div>
      </div>
    </>
  );
};

export default TableHeader;
