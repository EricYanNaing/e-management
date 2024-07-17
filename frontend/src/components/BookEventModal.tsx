import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../lib/store/store";
import { bookEvent } from "../lib/actions/authform-action";

type ModalProps = {
  showModal: boolean;
  closeModal: () => void;
  userId: string;
  eventId: string;
};

const BookEventModal: FC<ModalProps> = ({
  showModal,
  closeModal,
  eventId,
  userId,
}) => {
  const event = useSelector((state: RootState) => state.eventData.event);
  console.log(userId, eventId, "BOOKEND IDSS FROM CLIENT");

  return (
    <>
      {showModal && (
        <>
          {/* Modal backdrop with blur effect */}
          <div className="fixed h-full mt-0 inset-0 bg-black opacity-50 z-50"></div>

          {/* Modal dialog */}
          <div className="fixed inset-0 mt-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-80">
              <div className="flex items-center justify-center mb-4">
                <h2 className="ml-2 font-medium text-lg">Check Out</h2>
              </div>

              <hr className="font-medium" />

              <div className=" pt-3 pb-2 ">
                <p className="text-gray-500 ">Choose ticket type</p>
                <div className="flex space-x-4">
                  <label>
                    <input
                      type="radio"
                      name="radio"
                      value="1"
                      className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                    />
                    GA
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="radio"
                      value="2"
                      className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                    />
                    VIP
                  </label>
                </div>
              </div>

              <div className=" pt-3 pb-2 ">
                <p className="text-gray-500 ">Event</p>
                <input
                  type="text"
                  name="price"
                  value={event.title}
                  disabled
                  className=" block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                />
              </div>

              <div className=" pt-3 pb-2 ">
                <p className="text-gray-500 ">Event Venue</p>
                <input
                  type="text"
                  name="price"
                  value={event.place}
                  disabled
                  className=" block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                />
              </div>

              <div className=" pt-3 pb-2 ">
                <p className="text-gray-500 ">Event Date</p>
                <input
                  type="text"
                  name="price"
                  value={event.date}
                  disabled
                  className=" block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                />
              </div>

              <div className=" pt-3 pb-2 ">
                <p className="text-gray-500 ">Price</p>
                <input
                  type="text"
                  name="price"
                  value={event.ga_price}
                  disabled
                  className=" block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                />
              </div>

              <button
                onClick={() => bookEvent(userId, eventId, closeModal)}
                className="bg-red-500 hover:bg-red-600 duration-300 text-white w-full h-10 mt-4 rounded-md"
              >
                Book Event
              </button>
              <button
                onClick={closeModal}
                className=" hover:bg-gray-100 border border-red-500 duration-300  w-full h-10 mt-4 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BookEventModal;
