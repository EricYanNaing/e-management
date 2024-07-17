import { useEffect, useState } from "react";
import { getBookedEvents } from "../lib/actions/authform-action";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/store/store";
import defaultPhoto from "../assets/default_event_photo.jpg";

const PurchasedEvent = () => {
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const bookedEvents = useSelector(
    (state: RootState) => state.userData.bookedEvents
  );
  useEffect(() => {
    setLoading(true);
    getBookedEvents(userId, dispatch);
    setLoading(false);
  }, []);
  return (
    <div className="flex-1 p-4 w-full">
      {!loading && (
        <div className="mt-8 bg-white p-4 shadow rounded-lg">
          <h2 className="text-gray-500 text-lg font-semibold pb-4">
            Booked Events
          </h2>
          <div className="my-1"></div>
          <div className="bg-gradient-to-r from-red-300 to-red-500 h-px mb-6"></div>
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="text-sm leading-normal">
                <th className="py-2 text-left px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                  Event photo
                </th>
                <th className="py-2 text-left px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                  Event name
                </th>
                <th className="py-2 text-left px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                  Event place
                </th>
                <th className="py-2 text-left px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                  Event date
                </th>
                <th className="py-2 text-left px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                  Event time
                </th>
              </tr>
            </thead>
            <tbody>
              {bookedEvents.length &&
                bookedEvents.map((event) => (
                  <tr className="hover:bg-grey-lighter">
                    <td className="py-2 px-4 border-b border-grey-light">
                      <img
                        src={
                          event.profile_image
                            ? `http://localhost:8000/${event.profile_image}`
                            : defaultPhoto
                        }
                        alt="Foto Perfil"
                        className="rounded-full h-10 w-10"
                      />
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light">
                      {event.title}
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light">
                      {event.place}
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light">
                      {event.date}
                    </td>
                    <td className="py-2 px-4 border-b border-grey-light">
                      {event.time}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PurchasedEvent;
