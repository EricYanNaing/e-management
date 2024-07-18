import { useEffect, useState } from "react";
import Events from "../components/Events";
import { getEvents } from "../lib/actions/eventform-actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/store/store";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.authData.token);
  const events = useSelector((state: RootState) => state.eventData.events);

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

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { totalEvents, totalPages } = await getEvents(
          dispatch,
          token,
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
    <section>
      {events.length &&
        !loading &&
        events.map((event) => <Events key={event.title} event={event} />)}
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
    </section>
  );
};

export default Index;
