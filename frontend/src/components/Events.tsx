import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import defaultPhoto from "../assets/default_event_photo.jpg";
import { FromValuesProps } from "../lib/types/eventformprops";
import { FC } from "react";

type EventList = {
  event: FromValuesProps;
};

const Events: FC<EventList> = ({ event }) => {
  return (
    <>
      <div className="pt-10 px-5">
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-sm font-medium text-gray-900">
                    {event.title}
                  </h3>
                </div>
                <p className="mt-1 truncate text-sm text-gray-500">
                  {event.description}
                </p>
              </div>
              <img
                className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                src={
                  event.profile_image
                    ? `http://localhost:8000/${event.profile_image}`
                    : defaultPhoto
                }
                alt=""
              />
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <Link
                    to={`/event/${event._id}`}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <FaArrowAltCircleRight size={30} />
                    View Detail
                  </Link>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Events;
