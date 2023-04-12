import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchData from "../../utils/fetchData";
import { TbEdit } from "react-icons/tb";

import TableHeader from "./TableHeader";
import Loading from "../../components/Loading";
import ConfirmModal from "../../components/ConfirmModal";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";

enum UnitOptionType {
  SHEET = "SHEET",
  ROLL = "ROLL",
  PCS = "PCS",
}

interface ProductType {
  id: string;
  name: string;
  price: number;
  desc: string;
  unitOption: UnitOptionType;
}

const Product = () => {
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

  const [limit, setLimit] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [keyword, setKeyword] = useState("");

  const query = useQuery({
    queryKey: ["products", keyword, pageNumber, limit],
    queryFn: () =>
      fetchData(
        `/products?keyword=${keyword}&page=${pageNumber}&limit=${limit}`
      ),
  });

  console.log(query);

  const handleDeleteData = async () => {
    console.log("data with id: " + " have been deleted");
  };
  return (
    <div className="mx-5">
      <TableHeader
        keyword={keyword}
        limit={limit}
        setKeyword={setKeyword}
        setLimit={setLimit}
        setPage={setPageNumber}
      />
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        {query.isLoading ? (
          <Loading />
        ) : (
          <table className="w-full text-sm text-left text-black rounded">
            <thead className="text-xs text-black uppercase bg-gray-300">
              <tr>
                <th scope="col" className="py-3 px-6">
                  ID
                </th>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Price
                </th>
                <th scope="col" className="py-3 px-6">
                  Description
                </th>
                <th scope="col" className="py-3 px-6">
                  Unit
                </th>
                <th scope="col" className="py-3 px-6">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {query.data?.data?.map((i: ProductType, n: number) => (
                <tr
                  key={n}
                  className={`${
                    n % 2 === 0 ? "bg-white" : "bg-gray-200"
                  } border-b hover:bg-secondary`}
                >
                  <th scope="row" className="py-4 px-6 font-medium text-black">
                    {i.id}
                  </th>
                  <th scope="row" className="py-4 px-6 font-medium text-black">
                    {i.name}
                  </th>
                  <td className="py-4 px-6">
                    Rp. {new Intl.NumberFormat("id-ID").format(i.price)}
                  </td>
                  <td className="py-4 px-6 max-w-sm">{i.desc}</td>
                  <td className="py-4 px-6">{i.unitOption}</td>
                  <td className="py-4 px-6 text-right">
                    <Link to={"/form/" + i.id}>
                      <TbEdit className="text-2xl font-semibold hover:text-orange hover:scale-150" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {showDeleteConfirmModal && (
          <ConfirmModal
            handleSubmit={handleDeleteData}
            setShowConfirmModal={setShowDeleteConfirmModal}
          />
        )}
      </div>
      <Pagination
        dataCount={query.data?.meta?.totalData}
        limit={limit}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </div>
  );
};

export default Product;
