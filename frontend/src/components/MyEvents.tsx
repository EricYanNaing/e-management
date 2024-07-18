import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import defaultPhoto from "../assets/default_event_photo.jpg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/store/store";
import { useEffect, useState } from "react";
import { getEvents, getUserEvents } from "../lib/actions/eventform-actions";

const MyEvents = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.userData.userEvents);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const deleteEvent = async (id: string) => {
    confirm("Are you sure to delete the event?");
    try {
      const response = await fetch(`http://localhost:8000/delete/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      } else {
        alert("Event Delete");
        getUserEvents(dispatch, token, userId);
        return navigate(`/profile/${userId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { totalEvents, totalPages } = await getUserEvents(
          dispatch,
          token,
          userId,
          currentPage
        );
        setTotalEvents(totalEvents);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle error if needed
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [dispatch, token, currentPage]);
  return (
    <>
      {!loading && (
        <div className="flex-1 p-4 w-full">
          <div className="mt-8 bg-white p-4 shadow rounded-lg">
            <h2 className="text-gray-500 text-lg font-semibold pb-4">
              My Events
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
                  <th className="py-2 text-left px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {events.length &&
                  events.map((event) => (
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
                      <td className="py-5 px-4 border-b border-grey-light gap-5 flex">
                        <Link to={`/edit/${event._id}`}>
                          <FaRegEdit className="text-sky-500" size={20} />
                        </Link>

                        <div
                          onClick={() => deleteEvent(event._id)}
                          className="cursor-pointer"
                        >
                          <FaTrashAlt className="text-red-500" size={20} />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {events.length < 1 && (
              <h1 className="w-full text-center font-bold text-2xl">
                There is no events.
              </h1>
            )}
            <div className="flex justify-center w-full">
              {currentPage > 1 && (
                <button
                  onClick={handlePrev}
                  className="bg-teal-600 mt-24 font-medium text-white p-2 rounded-sm mx-3"
                >
                  Prev
                </button>
              )}
              {currentPage < totalPages && (
                <button
                  onClick={handleNext}
                  className="bg-teal-600 mt-24 font-medium text-white p-2 rounded-sm "
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyEvents;
