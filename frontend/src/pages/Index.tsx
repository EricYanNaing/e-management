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
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        console.log(searchQuery);
        const { totalEvents, totalPages } = await getEvents(
          dispatch,
          token,
          currentPage,
          searchQuery
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
  }, [dispatch, token, currentPage, searchQuery]);

  return (
    <section>
      {/* Search Bar  */}
      <div className="pt-3 w-5/12 mx-auto">
        <div className="flex mx-10 rounded-full border-2 border-gray-400">
          <input
            value={searchQuery}
            onChange={handleSearch}
            className=" w-full border-none  bg-transparent px-8 py-1 text-gray-400 outline-none focus:outline-none "
            type="search"
            name="search"
            placeholder="Search Event..."
          />
          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className="m-2 rounded-full hover:bg-red-600 duration-300 bg-red-500 px-8 py-2 text-white"
          >
            Search
          </button>
        </div>
      </div>
      {/* Search Bar  */}
      {events.length && !loading && <Events events={events} />}
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
