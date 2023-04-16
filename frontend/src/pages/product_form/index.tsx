import { useRef, useState, useEffect } from "react";
import mutateFetch from "../../utils/mutateFetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ConfirmModal from "../../components/ConfirmModal";
import AlertWarning from "../../components/AlertWarning";
import { Link, useNavigate, useParams } from "react-router-dom";
import fetchData from "../../utils/fetchData";
import Loading from "../../components/Loading";
import { useStockStore } from "../../utils/stockStore";

enum UnitOptionType {
  SHEET = "SHEET",
  ROLL = "ROLL",
  PCS = "PCS",
}

const ProductForm = () => {
  const { id } = useParams();

  const idInputRef = useRef<HTMLInputElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const priceInputRef = useRef<HTMLInputElement | null>(null);
  const unitOptionInputRef = useRef<HTMLSelectElement | null>(null);
  const descInputRef = useRef<HTMLTextAreaElement | null>(null);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const queryClientMutation = useQueryClient();
  const navigate = useNavigate();

  const createProuctMutation = useMutation({
    mutationFn: (body: object) => mutateFetch("/products", body, "POST"),
  });
  const updateProuctMutation = useMutation({
    mutationFn: (body: object) => mutateFetch("/products/" + id, body, "PUT"),
  });

  const deleteProuctMutation = useMutation({
    mutationFn: (body: object) =>
      mutateFetch("/products/" + id, body, "DELETE"),
  });

  const { removeStockProduct } = useStockStore();

  const handleSubmit = async () => {
    setShowConfirmModal(false);

    const body = {
      id: idInputRef.current?.value,
      name: nameInputRef.current?.value,
      price: priceInputRef.current?.valueAsNumber,
      desc: descInputRef.current?.value,
      unitOption: unitOptionInputRef.current?.value,
    };

    if (id) {
      updateProuctMutation
        .mutateAsync(body)
        .then((res) => {
          console.log("MUTATION_SUCCESS: ", res);

          queryClientMutation.invalidateQueries({ queryKey: ["products"] });
          navigate("/");
        })
        .catch((err) => {
          setAlertMessage(err.message);
        });
    }

    if (!id) {
      createProuctMutation
        .mutateAsync(body)
        .then((res) => {
          console.log("MUTATION_SUCCESS: ", res);

          queryClientMutation.invalidateQueries({ queryKey: ["products"] });
          navigate("/");
        })
        .catch((err) => {
          setAlertMessage(err.message);
        });
    }
  };

  const handleDelete = async () => {
    setShowConfirmModal(false);

    const body = {};

    deleteProuctMutation
      .mutateAsync(body)
      .then((res) => {
        console.log("MUTATION_SUCCESS: ", res);
        removeStockProduct(id!);

        queryClientMutation.invalidateQueries({ queryKey: ["products"] });
        navigate("/");
      })
      .catch((err) => {
        setAlertMessage(err.message);
      });
  };

  const query = useQuery(["products", id], () => fetchData(`/products/${id}`), {
    enabled: Boolean(id),
  });
  useEffect(() => {
    if (id) {
      idInputRef.current!.value = query.data?.data.id;
      nameInputRef.current!.value = query.data?.data.name;
      priceInputRef.current!.value = query.data?.data.price;
      descInputRef.current!.value = query.data?.data.desc;
      unitOptionInputRef.current!.value = query.data?.data.unitOption;
    }
  }, [id, query.data]);

  if (
    createProuctMutation.isLoading ||
    updateProuctMutation.isLoading ||
    deleteProuctMutation.isLoading
  ) {
    return <Loading />;
  }

  return (
    <div className="relative bg-white rounded-lg shadow">
      <div className="flex justify-between items-start p-5 py-7 rounded-t border-b">
        <h3 className="text-xl font-semibold text-gray-900">Form Product</h3>
      </div>

      <div className="p-3">
        <form
          id="formID"
          onSubmit={(e) => {
            e.preventDefault();
            setShowConfirmModal(true);
          }}
          className="p-7 font-medium"
        >
          <div className="flex lg:flex-row flex-col gap-x-7">
            <div className="flex md:flex-row w-full flex-col md:gap-3 gap-1 items-center pb-7">
              <label
                className="md:w-28 w-full text-black whitespace-nowrap"
                htmlFor="no-registrasi"
              >
                Product ID
              </label>
              <input
                readOnly={id ? true : false}
                required
                ref={idInputRef}
                className="w-full hover:bg-secondary rounded-md border px-2.5 h-12"
                type="text"
                placeholder="Input ID..."
              />
            </div>
            <div className="flex md:flex-row w-full flex-col md:gap-3 gap-1 items-center pb-7">
              <label
                className="md:w-28 w-full text-black"
                htmlFor="no-registrasi"
              >
                Name
              </label>
              <input
                required
                ref={nameInputRef}
                className="w-full hover:bg-secondary rounded-md border px-2.5 h-12"
                type="text"
                placeholder="Input Name..."
              />
            </div>
          </div>
          <div className="flex lg:flex-row flex-col gap-x-7">
            <div className="flex md:flex-row w-full flex-col md:gap-3 gap-1 items-center pb-7">
              <label
                className="md:w-28 w-full text-black"
                htmlFor="no-registrasi"
              >
                Price
              </label>
              <input
                required
                ref={priceInputRef}
                className="w-full hover:bg-secondary rounded-md border px-2.5 h-12"
                type="number"
              />
            </div>
            <div className="flex md:flex-row w-full flex-col md:gap-3 gap-1 items-center pb-7">
              <label className="md:w-28 w-full" htmlFor="no-registrasi">
                Unit
              </label>
              <select
                id="countries"
                ref={unitOptionInputRef}
                className="bg-gray-50 h-12 border text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5"
              >
                <option value={UnitOptionType.SHEET}>
                  {UnitOptionType.SHEET}
                </option>
                <option value={UnitOptionType.ROLL}>
                  {UnitOptionType.ROLL}
                </option>
                <option value={UnitOptionType.PCS}>{UnitOptionType.PCS}</option>
              </select>
            </div>
          </div>
          <div className="flex md:flex-row w-full flex-col md:gap-3 gap-1 items-center pb-7">
            <label
              className="md:w-24 w-full text-black"
              htmlFor="no-registrasi"
            >
              Description
            </label>
            <textarea
              required
              ref={descInputRef}
              className="w-full hover:bg-secondary rounded-md border px-2.5 h-20"
              placeholder="Input Description..."
            />
          </div>
        </form>
      </div>

      <div className="flex flex-col-reverse md:flex-row items-center justify-between p-6 space-x-2 rounded-b border-t border-gray">
        <div>
          {id ? (
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-500 hover:bg-red-300 mb-5 font-semibold flex justify-center items-center gap-3 text-white rounded-md w-32 h-10"
            >
              <span>Delete</span>
            </button>
          ) : null}
        </div>
        <div className="flex gap-5">
          <Link to={"/"}>
            <button
              type="button"
              className="bg-white hover:bg-gray-200 border border-primary mb-5 font-semibold flex justify-center items-center gap-3 text-primary rounded-md w-32 h-10"
            >
              <span>Cancel</span>
            </button>
          </Link>
          <button
            type="submit"
            form="formID"
            className="bg-blue-500 hover:bg-blue-300 mb-5 font-semibold flex justify-center items-center gap-3 text-white rounded-md w-32 h-10"
          >
            <span>Submit</span>
          </button>
        </div>
      </div>

      {showConfirmModal && (
        <ConfirmModal
          handleSubmit={handleSubmit}
          setShowConfirmModal={setShowConfirmModal}
        />
      )}

      {showDeleteModal && (
        <ConfirmModal
          message={"Delete product with ID: " + id}
          handleSubmit={handleDelete}
          setShowConfirmModal={setShowDeleteModal}
        />
      )}

      {alertMessage && (
        <AlertWarning
          alertMessage={alertMessage}
          setAlertMessage={setAlertMessage}
        />
      )}
    </div>
  );
};

export default ProductForm;
