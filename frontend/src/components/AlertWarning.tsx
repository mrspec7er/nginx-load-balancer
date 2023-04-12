interface AlertWarningProps {
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
  alertMessage: string;
}

const AlertWarning = ({ alertMessage, setAlertMessage }: AlertWarningProps) => {
  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className="flex justify-center fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-20 p-4 overflow-x-hidden overflow-y-auto h-screen w-screen"
    >
      <div className="relative w-full h-full max-w-md top-1/4">
        <div
          id="alert-additional-content-2"
          className="p-4 mb-4 border border-orange rounded-lg bg-white"
          role="alert"
        >
          <div className="flex items-center">
            <svg
              aria-hidden="true"
              className="w-5 h-5 mr-2 text-orange"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Info</span>
            <h3 className="text-lg font-medium text-orange">Warning!</h3>
          </div>
          <div className="mt-2 mb-4 text-sm text-black">{alertMessage}</div>
          <div>
            <button
              onClick={() => setAlertMessage("")}
              type="button"
              className="text-white bg-red-500 hover:bg-orange focus:ring-4 focus:outline-none focus:ring-red font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertWarning;
