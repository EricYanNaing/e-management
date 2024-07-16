import { IoInformationOutline } from "react-icons/io5";
import BookEventModal from "../components/BookEventModal";
import { FaRegCalendar } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { CiCircleCheck } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEvent } from "../lib/store/reducer/events";
import { RootState } from "../lib/store/store";
import defaultPhoto from "../assets/default_event_photo.jpg";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

const EventDetail = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const event = useSelector((state: RootState) => state.eventData.event);

  const getEventInfo = async () => {
    try {
      const response = await fetch(`http://localhost:8000/events/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      dispatch(setEvent(data));
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  //   Modal On/Off
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  //   Modal On/Off

  useEffect(() => {
    setLoading(true);
    getEventInfo();
    setLoading(false);
  }, []);
  return (
    <>
      {!loading && (
        <section className="bg-white ">
          <div className="container px-6 py-10 mx-auto">
            <div className="lg:flex lg:items-center">
              <div className="w-full lg:w-1/2 ">
                <div>
                  <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl">
                    {event.title}
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
                    className="w-full rounded-md object-cover xl:w-[34rem] xl:h-[34rem] "
                    src={
                      event.profile_image
                        ? `http://localhost:8000/${event.profile_image}`
                        : defaultPhoto
                    }
                    alt=""
                  />
                </div>

                {/* Modal */}
                <BookEventModal showModal={showModal} closeModal={closeModal} />
                {/* Modal */}

                <div className="space-y-8">
                  <div className="md:flex md:items-start md:-mx-4">
                    <span className="inline-block p-2 text-white bg-red-100 rounded-xl md:mx-4 dark:bg-red-500">
                      <IoInformationOutline size={30} />
                    </span>

                    <div className="mt-4 md:mx-4 md:mt-0">
                      <h1 className="text-2xl font-semibold text-gray-700 capitalize">
                        About
                      </h1>

                      <p className="mt-3 text-gray-600">{event.description}</p>
                    </div>
                  </div>

                  <div className="md:flex md:items-start md:-mx-4">
                    <span className="inline-block p-2 text-white bg-red-100 rounded-xl md:mx-4 dark:bg-red-500">
                      <RiMoneyDollarCircleFill size={30} />
                    </span>

                    <div className="mt-4 md:mx-4 md:mt-0">
                      <h1 className="text-2xl font-semibold text-gray-700 capitalize">
                        Price
                      </h1>

                      <div>
                        <p className="mt-3 text-gray-600 ">
                          {event.ga_price} $ for GA
                        </p>
                        <p className="mt-3 text-gray-600 ">
                          {event.vip_price} $ for VIP
                        </p>
                      </div>
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

                      <p className="mt-3 text-gray-600">{event.place}</p>
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
                        {event.date} at {event.time}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden lg:flex lg:items-center lg:w-1/2 lg:justify-center">
                <img
                  className="w-[28rem] h-[28rem] object-cover xl:w-[34rem] xl:h-[34rem] rounded-full"
                  src={
                    event.profile_image
                      ? `http://localhost:8000/${event.profile_image}`
                      : defaultPhoto
                  }
                  alt={event.title}
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default EventDetail;
