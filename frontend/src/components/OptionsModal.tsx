import { FiEdit, FiDelete, FiInfo } from "react-icons/fi";
interface OptionsModalProps {
  setOptionModal: React.Dispatch<React.SetStateAction<number>>;
  setShowConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const OptionsModal = ({
  setOptionModal,
  setShowConfirmModal,
  setShowEditModal,
}: OptionsModalProps) => {
  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      onClick={() => {
        setOptionModal(0);
      }}
      className="flex justify-center fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-20 p-4 overflow-x-hidden overflow-y-auto h-screen w-screen"
    >
      <div
        onClick={() => console.log("Unreset ID")}
        className="relative w-[60vw] h-max top-1/4 flex justify-center"
      >
        <div className="relative bg-white md:w-[15vw] py-5 w-screen rounded-lg shadow-lg">
          <div
            onClick={() => setShowEditModal(true)}
            className="flex justify-center gap-7 my-2 items-center text-lg hover:bg-gray-500 font-medium rounded-md mx-2"
          >
            <FiEdit className="text-xl" />
            <button className="w-32 rounded" type="button">
              Edit
            </button>
          </div>
          <div
            onClick={() => setShowConfirmModal(true)}
            className="flex justify-center gap-7 my-2 items-center text-lg hover:bg-gray-500 font-medium rounded-md mx-2"
          >
            <FiDelete className="text-xl" />
            <button className="w-32 rounded" type="button">
              Delete
            </button>
          </div>
          <div
            onClick={() => console.log("Button Detail Clicked")}
            className="flex justify-center gap-7 my-2 items-center text-lg hover:bg-gray-500 font-medium rounded-md mx-2"
          >
            <FiInfo className="text-xl" />
            <button className="w-32 rounded" type="button">
              Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsModal;
