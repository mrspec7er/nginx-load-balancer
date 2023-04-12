interface ConfirmModalProps {
  setShowConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => Promise<void>;
  message?: string;
}

const ConfirmModal = ({
  handleSubmit,
  setShowConfirmModal,
  message,
}: ConfirmModalProps) => {
  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className="flex justify-center fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-20 p-4 overflow-x-hidden overflow-y-auto h-screen w-screen"
    >
      <div className="relative md:w-full w-11/12 h-full max-w-md top-1/4">
        <div className="relative bg-white rounded-lg shadow-lg">
          <button
            type="button"
            onClick={() => setShowConfirmModal(false)}
            className="absolute top-3 right-2.5 text-gray-700-400 bg-black bg-opacity-20 hover:bg-gray-500-200 hover:text-gray-700-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-cente"
            data-modal-toggle="popup-modal"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center">
            <svg
              aria-hidden="true"
              className="mx-auto mb-4 text-gray-700-400 w-14 h-14"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-700-500">
              {message ? message : "Are you sure you want to submit this data?"}
            </h3>
            <button
              onClick={() => {
                handleSubmit();
                setShowConfirmModal(false);
              }}
              data-modal-toggle="popup-modal"
              type="button"
              className="text-white bg-red-500 hover:bg-red-300 focus:ring-4 focus:outline-none focus:ring-red font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Yes, I'm sure
            </button>
            <button
              onClick={() => setShowConfirmModal(false)}
              data-modal-toggle="popup-modal"
              type="button"
              className="text-gray-700 bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray rounded-lg border border-gray text-sm font-medium px-5 py-2.5 hover:text-gray-700 focus:z-10"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
