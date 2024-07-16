import { IoInformationOutline } from "react-icons/io5";
import BookEventModal from "../components/BookEventModal";
import { FaRegCalendar, FaRegUserCircle } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { CiCircleCheck } from "react-icons/ci";
import { useState } from "react";

const EventDetail = () => {
  const [showModal, setShowModal] = useState(false);

  //   Modal On/Off
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  //   Modal On/Off
  return (
    <section className="bg-white ">
      <div className="container px-6 py-10 mx-auto">
        <div className="lg:flex lg:items-center">
          <div className="w-full lg:w-1/2 ">
            <div>
              <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl">
                explore our <br /> awesome Components
              </h1>

              <div className="mt-2">
                <span className="inline-block w-40 h-1 rounded-full bg-red-500"></span>
                <span className="inline-block w-3 h-1 ml-1 rounded-full bg-red-500"></span>
                <span className="inline-block w-1 h-1 ml-1 rounded-full bg-red-500"></span>
              </div>
            </div>

            <div className="w-full py-10">
              <button
                onClick={openModal}
                className="bg-red-500 hover:bg-red-600 duration-300 text-white w-60 h-10 flex items-center justify-center gap-2 rounded-md text-center"
              >
                <CiCircleCheck size={30} />
                Book Event
              </button>
            </div>

            <div className="lg:hidden ">
              <img
                className="w-full h-full rounded-md object-cover xl:w-[34rem] xl:h-[34rem] "
                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=755&q=80"
                alt=""
              />
            </div>

            {/* Modal */}
            <BookEventModal showModal={showModal} closeModal={closeModal} />
            {/* Modal */}

            <div className="space-y-8">
              <div className="md:flex md:items-start md:-mx-4">
                <span className="inline-block p-2 text-white bg-red-100 rounded-xl md:mx-4 dark:bg-red-500">
                  <FaRegUserCircle size={30} />
                </span>

                <div className="mt-4 md:mx-4 md:mt-0">
                  <h1 className="text-2xl font-semibold text-gray-700 capitalize">
                    Oraganization
                  </h1>

                  <p className="mt-3 text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Provident ab nulla quod dignissimos vel non corrupti
                    doloribus voluptatum eveniet
                  </p>
                </div>
              </div>

              <div className="md:flex md:items-start md:-mx-4">
                <span className="inline-block p-2 text-white bg-red-100 rounded-xl md:mx-4 dark:bg-red-500">
                  <IoInformationOutline size={30} />
                </span>

                <div className="mt-4 md:mx-4 md:mt-0">
                  <h1 className="text-2xl font-semibold text-gray-700 capitalize">
                    About
                  </h1>

                  <p className="mt-3 text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Provident ab nulla quod dignissimos vel non corrupti
                    doloribus voluptatum eveniet
                  </p>
                </div>
              </div>

              <div className="md:flex md:items-start md:-mx-4">
                <span className="inline-block p-2  text-white bg-red-100 rounded-xl md:mx-4 dark:bg-red-500">
                  <FaMapLocationDot size={30} />
                </span>

                <div className="mt-4 md:mx-4 md:mt-0">
                  <h1 className="text-2xl font-semibold text-gray-700 capitalize">
                    Venue
                  </h1>

                  <p className="mt-3 text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Provident ab nulla quod dignissimos vel non corrupti
                    doloribus voluptatum eveniet
                  </p>
                </div>
              </div>

              <div className="md:flex md:items-start md:-mx-4">
                <span className="inline-block p-2  text-white bg-red-100 rounded-xl md:mx-4 dark:bg-red-500">
                  <FaRegCalendar size={30} />
                </span>

                <div className="mt-4 md:mx-4 md:mt-0">
                  <h1 className="text-2xl font-semibold text-gray-700 capitalize">
                    Time
                  </h1>

                  <p className="mt-3 text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex lg:items-center lg:w-1/2 lg:justify-center">
            <img
              className="w-[28rem] h-[28rem] object-cover xl:w-[34rem] xl:h-[34rem] rounded-full"
              src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=755&q=80"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetail;
