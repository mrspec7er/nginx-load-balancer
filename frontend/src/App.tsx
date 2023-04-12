import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layouts from "./components/Layouts";
import { Suspense, lazy } from "react";
import Loading from "./components/Loading";
const Product = lazy(() => import("./pages/product"));
const ProductForm = lazy(() => import("./pages/product_form"));

const queryClient = new QueryClient();

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <Product />
      </Suspense>
    ),
  },
  {
    path: "/form",
    element: (
      <Suspense fallback={<Loading />}>
        <ProductForm />
      </Suspense>
    ),
  },
  {
    path: "/form/:id",
    element: (
      <Suspense fallback={<Loading />}>
        <ProductForm />
      </Suspense>
    ),
  },
]);

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <QueryClientProvider client={queryClient}>
          <Layouts>
            <RouterProvider router={routes} />
          </Layouts>
        </QueryClientProvider>
      </Suspense>
    </div>
  );
}

export default App;

// import { SlOptions } from "react-icons/sl";

// const Table = () => {
//   const [currentItemID, setCurrentItemID] = useState(0);
//   const [optionModal, setOptionModal] = useState(0);
//   const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
//   const [showFormModal, setShowFormModal] = useState(false);

//   const [limit, setLimit] = useState(5);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [keyword, setKeyword] = useState("");

//   const query = useQuery({
//     queryKey: ["users", keyword, pageNumber, limit],
//     queryFn: () =>
//       fetchData(`/user?name=${keyword}&page=${pageNumber}&limit=${limit}`),
//   });

//   const handleDeleteData = async () => {
//     setCurrentItemID(0);
//     console.log("data with id: " + currentItemID + " have been deleted");
//   };
//   return (
//     <>
//       <TableHeader
//         keyword={keyword}
//         limit={limit}
//         setKeyword={setKeyword}
//         setLimit={setLimit}
//         setPage={setPageNumber}
//       />
//       <button
//         className="p-2 w-32 bg-blue-700 rounded m-2"
//         onClick={() => setShowFormModal(true)}
//       >
//         Insert
//       </button>
//       <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
//         {query.isLoading ? (
//           <Loading />
//         ) : (
//           <table className="w-full text-sm text-left text-black">
//             <thead className="text-xs text-black uppercase bg-gray-500">
//               <tr>
//                 <th scope="col" className="py-3 px-6">
//                   No
//                 </th>
//                 <th scope="col" className="py-3 px-6">
//                   name
//                 </th>
//                 <th scope="col" className="py-3 px-6">
//                   Email
//                 </th>
//                 <th scope="col" className="py-3 px-6">
//                   Role
//                 </th>
//                 <th scope="col" className="py-3 px-6">
//                   <span className="sr-only">Edit</span>
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {query.data?.data?.map((i: any, n: number) => (
//                 <tr
//                   key={n}
//                   className={`${
//                     n % 2 === 0 ? "bg-white" : "bg-gray-500"
//                   } border-b hover:bg-secondary`}
//                 >
//                   <th scope="row" className="py-4 px-6 font-medium text-black">
//                     {n + 1 + (pageNumber - 1) * limit}
//                   </th>
//                   <th scope="row" className="py-4 px-6 font-medium text-black">
//                     {i.name}
//                   </th>
//                   <td className="py-4 px-6">{i.email}</td>
//                   <td className="py-4 px-6">{i.role}</td>
//                   <td className="py-4 px-6 text-right">
//                     {optionModal === n + 1 && (
//                       <OptionsModal
//                         setShowEditModal={setShowFormModal}
//                         setOptionModal={setOptionModal}
//                         setShowConfirmModal={setShowDeleteConfirmModal}
//                       />
//                     )}
//                     <SlOptions
//                       onClickCapture={() => {
//                         setCurrentItemID(n + 1);
//                         setOptionModal(n + 1);
//                       }}
//                       className="text-2xl font-semibold hover:text-orange hover:scale-150"
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//         {showDeleteConfirmModal && (
//           <ConfirmModal
//             handleSubmit={handleDeleteData}
//             setShowConfirmModal={setShowDeleteConfirmModal}
//           />
//         )}

//         {showFormModal && <FormModal setShowModal={setShowFormModal} />}
//       </div>
//       <Pagination
//         dataCount={query.data?.meta?.totalData}
//         limit={limit}
//         pageNumber={pageNumber}
//         setPageNumber={setPageNumber}
//       />
//     </>
//   );
// };

// import { FiEdit, FiDelete, FiInfo } from "react-icons/fi";
// interface OptionsModalProps {
//   setOptionModal: React.Dispatch<React.SetStateAction<number>>;
//   setShowConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
//   setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const OptionsModal = ({
//   setOptionModal,
//   setShowConfirmModal,
//   setShowEditModal,
// }: OptionsModalProps) => {
//   return (
//     <div
//       id="popup-modal"
//       tabIndex={-1}
//       onClick={() => {
//         setOptionModal(0);
//       }}
//       className="flex justify-center fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-20 p-4 overflow-x-hidden overflow-y-auto h-screen w-screen"
//     >
//       <div
//         onClick={() => console.log("Unreset ID")}
//         className="relative w-[60vw] h-max top-1/4 flex justify-center"
//       >
//         <div className="relative bg-white md:w-[15vw] py-5 w-screen rounded-lg shadow-lg">
//           <div
//             onClick={() => setShowEditModal(true)}
//             className="flex justify-center gap-7 my-2 items-center text-lg hover:bg-gray-500 font-medium rounded-md mx-2"
//           >
//             <FiEdit className="text-xl" />
//             <button className="w-32 rounded" type="button">
//               Edit
//             </button>
//           </div>
//           <div
//             onClick={() => setShowConfirmModal(true)}
//             className="flex justify-center gap-7 my-2 items-center text-lg hover:bg-gray-500 font-medium rounded-md mx-2"
//           >
//             <FiDelete className="text-xl" />
//             <button className="w-32 rounded" type="button">
//               Delete
//             </button>
//           </div>
//           <div
//             onClick={() => console.log("Button Detail Clicked")}
//             className="flex justify-center gap-7 my-2 items-center text-lg hover:bg-gray-500 font-medium rounded-md mx-2"
//           >
//             <FiInfo className="text-xl" />
//             <button className="w-32 rounded" type="button">
//               Detail
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// interface ConfirmModalProps {
//   setShowConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
//   handleSubmit: () => Promise<void>;
// }

// const ConfirmModal = ({
//   handleSubmit,
//   setShowConfirmModal,
// }: ConfirmModalProps) => {
//   return (
//     <div
//       id="popup-modal"
//       tabIndex={-1}
//       className="flex justify-center fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-20 p-4 overflow-x-hidden overflow-y-auto h-screen w-screen"
//     >
//       <div className="relative md:w-full w-11/12 h-full max-w-md top-1/4">
//         <div className="relative bg-white rounded-lg shadow-lg">
//           <button
//             type="button"
//             onClick={() => setShowConfirmModal(false)}
//             className="absolute top-3 right-2.5 text-gray-700-400 bg-black bg-opacity-20 hover:bg-gray-500-200 hover:text-gray-700-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-cente"
//             data-modal-toggle="popup-modal"
//           >
//             <svg
//               aria-hidden="true"
//               className="w-5 h-5"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                 clipRule="evenodd"
//               ></path>
//             </svg>
//             <span className="sr-only">Close modal</span>
//           </button>
//           <div className="p-6 text-center">
//             <svg
//               aria-hidden="true"
//               className="mx-auto mb-4 text-gray-700-400 w-14 h-14"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//               ></path>
//             </svg>
//             <h3 className="mb-5 text-lg font-normal text-gray-700-500">
//               Are you sure you want to submit this data?
//             </h3>
//             <button
//               onClick={() => {
//                 handleSubmit();
//                 setShowConfirmModal(false);
//               }}
//               data-modal-toggle="popup-modal"
//               type="button"
//               className="text-white bg-red-500 hover:bg-red-300 focus:ring-4 focus:outline-none focus:ring-red font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
//             >
//               Yes, I'm sure
//             </button>
//             <button
//               onClick={() => setShowConfirmModal(false)}
//               data-modal-toggle="popup-modal"
//               type="button"
//               className="text-gray-700 bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray rounded-lg border border-gray text-sm font-medium px-5 py-2.5 hover:text-gray-700 focus:z-10"
//             >
//               No, cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// import { useRef } from "react";

// interface FormModalProps {
//   setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const FormModal = ({ setShowModal }: FormModalProps) => {
//   // Input element state
//   const fieldNameInputRef = useRef<HTMLInputElement | null>(null);
//   const fieldEmailInputRef = useRef<HTMLInputElement | null>(null);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [alertMessage, setAlertMessage] = useState("");

//   const queryClientMutation = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: (body: object) => mutateFetch("/register", body, "POST"),
//   });

//   const handleSubmit = async () => {
//     setShowConfirmModal(false);

//     //Submit Form Logic
//     const body = {
//       name: fieldNameInputRef.current?.value,
//       email: fieldEmailInputRef.current?.value,
//       password: "mrc201",
//       role: "USER",
//     };

//     mutation.mutateAsync(body).then((res) => {
//       console.log("MUTATION_SUCCESS: ", res);

//       queryClientMutation.invalidateQueries({ queryKey: ["users"] });
//     });

//     setShowModal(false);
//   };

//   return (
//     <div
//       id="defaultModal"
//       tabIndex={-1}
//       aria-hidden="true"
//       className={`
//       } bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-30 w-full md:inset-0 h-screen`}
//     >
//       <div className="relative pt-5 w-screen flex justify-center">
//         <div className="relative bg-white md:w-[70vw] w-[95vw] rounded-lg shadow">
//           <div className="flex justify-between items-start p-5 py-7 rounded-t border-b">
//             <h3 className="text-2xl font-semibold text-gray-900">Form User</h3>
//             <button
//               onClick={() => setShowModal(false)}
//               type="button"
//               className="text-gray-400 bg-transparent hover:bg-gray-500-200 hover:text-primary rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
//               data-modal-toggle="defaultModal"
//             >
//               <svg
//                 aria-hidden="true"
//                 className="w-5 h-5"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//               <span className="sr-only">Close modal</span>
//             </button>
//           </div>

//           <div className="md:p-12 p-3">
//             <form
//               id="formID"
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 setShowConfirmModal(true);
//               }}
//               className="py-7 font-medium pl-20"
//             >
//               <div className="flex md:flex-row flex-col md:gap-12 gap-1 items-center pb-7">
//                 <label
//                   className="md:w-32 w-full text-black"
//                   htmlFor="no-registrasi"
//                 >
//                   Name
//                 </label>
//                 <input
//                   required
//                   ref={fieldNameInputRef}
//                   className="w-full md:w-96 hover:bg-secondary rounded-md border px-7 h-12"
//                   type="text"
//                   placeholder="Input Name..."
//                 />
//               </div>
//               <div className="flex md:flex-row flex-col md:gap-12 gap-1 items-center pb-7">
//                 <label
//                   className="md:w-32 w-full text-black"
//                   htmlFor="no-registrasi"
//                 >
//                   Email
//                 </label>
//                 <input
//                   required
//                   ref={fieldEmailInputRef}
//                   className="w-full md:w-96 hover:bg-secondary rounded-md border px-7 h-12"
//                   type="email"
//                   placeholder="Input Email..."
//                 />
//               </div>
//             </form>
//           </div>

//           <div className="flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray">
//             <button
//               onClick={() => {
//                 setShowModal(false);
//               }}
//               type="button"
//               className="bg-white hover:bg-gray-200 border border-primary mb-5 font-semibold flex justify-center items-center gap-3 text-primary rounded-md w-32 h-10"
//             >
//               <span>Batal</span>
//             </button>
//             <button
//               type="submit"
//               form="formID"
//               className="bg-blue-500 hover:bg-blue-300 mb-5 font-semibold flex justify-center items-center gap-3 text-white rounded-md w-32 h-10"
//             >
//               <span>Simpan</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {showConfirmModal && (
//         <ConfirmModal
//           handleSubmit={handleSubmit}
//           setShowConfirmModal={setShowConfirmModal}
//         />
//       )}

//       {alertMessage && (
//         <WarningAlert
//           alertMessage={alertMessage}
//           setAlertMessage={setAlertMessage}
//         />
//       )}
//     </div>
//   );
// };

// import { Fragment, useMemo } from "react";
// import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";

// interface PaginationsProps {
//   dataCount: number;
//   limit: number;
//   pageNumber: number;
//   setPageNumber: React.Dispatch<React.SetStateAction<number>>;
// }

// function Pagination({
//   dataCount,
//   limit,
//   pageNumber,
//   setPageNumber,
// }: PaginationsProps) {
//   const pageCount = Math.ceil(dataCount / limit);

//   const getPageNumber = (pageCount: number, pageNumber: number) => {
//     const storePageNumber: Array<number> = [];
//     for (let i = 1; i <= pageCount; i++) {
//       if (
//         i < 3 ||
//         (i > pageNumber - 2 && i < pageNumber + 2) ||
//         i > pageCount - 2
//       ) {
//         storePageNumber.push(i);
//       } else if (i === pageNumber - 2 || i === pageNumber + 2) {
//         storePageNumber.push(0);
//       }
//     }

//     return storePageNumber;
//   };

//   const pageNumberList = useMemo(
//     () => getPageNumber(pageCount, pageNumber),
//     [pageNumber, pageCount]
//   );

//   const handleChangePage = (changesType: "NEXT" | "PREV" | number) => {
//     if (changesType === "NEXT") {
//       if (pageNumber < pageCount) {
//         setPageNumber((current) => current + 1);
//       }
//     }
//     if (changesType === "PREV") {
//       if (pageNumber > 1) {
//         setPageNumber((current) => current - 1);
//       }
//     }
//     if (typeof changesType === "number") {
//       setPageNumber(changesType);
//     }
//   };

//   return (
//     <div className="flex items-center justify-between border-t rounded-b-md border-gray bg-white px-4 py-3 sm:px-6">
//       <div className="flex flex-1 justify-between sm:hidden">
//         <button
//           type="button"
//           onClick={() => handleChangePage("PREV")}
//           className="relative inline-flex items-center rounded-md border border-gray bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-primary"
//         >
//           Previous
//         </button>
//         <button
//           type="button"
//           onClick={() => handleChangePage("NEXT")}
//           className="relative ml-3 inline-flex items-center rounded-md border border-gray bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-primary"
//         >
//           Next
//         </button>
//       </div>
//       <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
//         <div>
//           <p className="text-sm text-gray-700">
//             Showing{" "}
//             <span className="font-medium">
//               {pageNumber * limit - limit + 1}
//             </span>{" "}
//             to{" "}
//             <span className="font-medium">
//               {pageNumber * limit < dataCount ? pageNumber * limit : dataCount}
//             </span>{" "}
//             of <span className="font-medium">{dataCount}</span> results
//           </p>
//         </div>
//         <div>
//           <nav
//             className="isolate inline-flex -space-x-px rounded-md shadow-sm"
//             aria-label="Pagination"
//           >
//             <button
//               type="button"
//               onClick={() => handleChangePage("PREV")}
//               className="relative inline-flex items-center rounded-l-md border border-gray bg-white px-2 py-2 text-sm font-medium text-gray-700 hover:bg-primary focus:z-20"
//             >
//               <span className="sr-only">Previous</span>
//               <MdArrowBackIos className="h-5 w-5" aria-hidden="true" />
//             </button>
//             {pageNumberList.map((i, n) => (
//               <Fragment key={n}>
//                 {i !== 0 ? (
//                   <button
//                     onClick={() => handleChangePage(i)}
//                     type="button"
//                     aria-current="page"
//                     className={`relative z-10 inline-flex items-center border ${
//                       pageNumber !== i ? "bg-white" : "bg-orange"
//                     } border-gray-200 text-black px-4 py-2 text-sm font-medium text-secondary focus:z-20`}
//                   >
//                     {i}
//                   </button>
//                 ) : (
//                   <span className="relative inline-flex items-center border border-gray bg-white px-4 py-2 text-sm font-medium text-gray-700">
//                     ...
//                   </span>
//                 )}
//               </Fragment>
//             ))}

//             <button
//               onClick={() => handleChangePage("NEXT")}
//               type="button"
//               className="relative inline-flex items-center rounded-r-md border border-gray bg-white px-2 py-2 text-sm font-medium text-gray-700 hover:bg-primary focus:z-20"
//             >
//               <span className="sr-only">Next</span>
//               <MdArrowForwardIos className="h-5 w-5" aria-hidden="true" />
//             </button>
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// }

// const Loading = () => {
//   return (
//     <div
//       role="status"
//       className="flex justify-center w-full h-[50vh] items-center"
//     >
//       <svg
//         className="inline mr-2 w-32 h-32 text-gray-200 animate-spin dark:text-gray-700 fill-blue"
//         viewBox="0 0 100 101"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
//           fill="currentColor"
//         />
//         <path
//           d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
//           fill="currentFill"
//         />
//       </svg>
//       <span className="sr-only">Loading...</span>
//     </div>
//   );
// };

// import { FaPlus } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import fetchData from "./utils/fetchData";
// import mutateFetch from "./utils/mutateFetch";

// interface HeaderProps {
//   setLimit: React.Dispatch<React.SetStateAction<number>>;
//   limit: number;
//   setPage: React.Dispatch<React.SetStateAction<number>>;
//   setKeyword: React.Dispatch<React.SetStateAction<string>>;
//   keyword: string;
// }

// const TableHeader = ({ setLimit, limit, setPage, setKeyword }: HeaderProps) => {
//   return (
//     <>
//       <div className="p-5 flex gap-3 justify-between flex-col md:flex-row md:text-base text-sm bg-white">
//         <Link to="/registrasi">
//           <button className="bg-primary md:font-semibold font-medium flex justify-center items-center gap-3 text-white rounded-lg md:w-40 w-full md:h-12 h-10">
//             <FaPlus className="text-xl" />
//             <span>Entry New Data</span>
//           </button>
//         </Link>

//         <form>
//           <label
//             htmlFor="default-search"
//             className="mb-2 text-sm font-medium text-gray-900 sr-only"
//           >
//             Search
//           </label>
//           <div className="relative">
//             <input
//               onChange={(e) => {
//                 setPage(1);
//                 setKeyword(e.target.value);
//               }}
//               type="search"
//               id="default-search"
//               className="block py-3 pl-5 md:w-96 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray focus:ring-blue focus:border-blue"
//               placeholder="Search..."
//             />
//             <button
//               type="submit"
//               className="text-grey absolute right-2.5 bottom-1.5 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue font-medium rounded-lg text-sm px-4 py-2"
//             >
//               <svg
//                 aria-hidden="true"
//                 className="w-5 h-5 text-gray-500 dark:text-gray-400"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 ></path>
//               </svg>
//             </button>
//           </div>
//         </form>
//       </div>
//       <div className="p-5 flex justify-between gap-3 md:flex-row flex-col font-medium bg-white">
//         <div className="flex gap-1">
//           <p className="pr-2">Showing</p>
//           <input
//             defaultValue={limit}
//             onChange={(e) => {
//               setLimit(
//                 !isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : 1
//               );
//               setPage(1);
//             }}
//             className="border rounded w-12 h-7"
//             type="number"
//           />
//           <p>Data</p>
//         </div>
//       </div>
//     </>
//   );
// };

// interface WarningAlertProps {
//   setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
//   alertMessage: string;
// }

// const WarningAlert = ({ alertMessage, setAlertMessage }: WarningAlertProps) => {
//   return (
//     <div
//       id="popup-modal"
//       tabIndex={-1}
//       className="flex justify-center fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-20 p-4 overflow-x-hidden overflow-y-auto h-screen w-screen"
//     >
//       <div className="relative w-full h-full max-w-md top-1/4">
//         <div
//           id="alert-additional-content-2"
//           className="p-4 mb-4 border border-orange rounded-lg bg-white"
//           role="alert"
//         >
//           <div className="flex items-center">
//             <svg
//               aria-hidden="true"
//               className="w-5 h-5 mr-2 text-orange"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
//                 clipRule="evenodd"
//               ></path>
//             </svg>
//             <span className="sr-only">Info</span>
//             <h3 className="text-lg font-medium text-orange">Warning!</h3>
//           </div>
//           <div className="mt-2 mb-4 text-sm text-black">{alertMessage}</div>
//           <div>
//             <button
//               onClick={() => setAlertMessage("")}
//               type="button"
//               className="text-white bg-red hover:bg-orange focus:ring-4 focus:outline-none focus:ring-red font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center"
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
