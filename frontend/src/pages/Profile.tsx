import { FaCircleUser } from "react-icons/fa6";
import MyEvents from "../components/MyEvents";
import { useState } from "react";
import PurchasedEvent from "../components/PurchasedEvent";
const Profile = () => {
  const [showMyEvent, setShowMyEvent] = useState(true);
  const [showBookedEvent, setShowBookedEvent] = useState(false);
  const handleBookedEventTab = () => {
    setShowMyEvent(false);
    setShowBookedEvent(true);
  };
  const handleMyEventTab = () => {
    setShowMyEvent(true);
    setShowBookedEvent(false);
  };
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-white text-white shadow w-full p-2 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center justify-center text-black">
            User Name
          </div>
          <div className="md:hidden flex items-center text-red-500">
            <button id="menuBtn">
              <FaCircleUser size={30} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-wrap">
        <div
          className="p-2 bg-white w-full md:w-60 flex flex-col md:flex hidden"
          id="sideNav"
        >
          <nav>
            <div
              onClick={handleMyEventTab}
              className={`${
                showMyEvent && "bg-red-500 text-white"
              } block cursor-pointer text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-500 hover:text-white`}
            >
              <i className="fas fa-users mr-2"></i>My Events
            </div>
            <div
              onClick={handleBookedEventTab}
              className={` ${
                showBookedEvent && "bg-red-500 text-white"
              } block cursor-pointer text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-500 hover:text-white`}
            >
              <i className="fas fa-store mr-2"></i>Booked Events
            </div>
          </nav>
        </div>
        {showMyEvent && <MyEvents />}
        {showBookedEvent && <PurchasedEvent />}
      </div>
    </div>
  );
};

export default Profile;
