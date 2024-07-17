import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogOutReducer } from "../lib/store/reducer/auth";

const NavBar = () => {
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogOutReducer());
    navigate("/login");
  };

  return (
    <header className="border-4 shadow-inner">
      <nav className="container mx-auto px-6 py-3">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <div className=" font-bold text-lg ">
            <Link to={"/"} className="flex items-center gap gap-2">
              <p className="text-red-600 logo">EM4U</p>
            </Link>
          </div>

          {/* Search Bar  */}
          <div className="hidden xl:block">
            <div className="flex mx-10 rounded-full border-2 border-gray-400">
              <input
                className=" w-full border-none  bg-transparent px-8 py-1 text-gray-400 outline-none focus:outline-none "
                type="search"
                name="search"
                placeholder="Search Event..."
              />
              <button
                type="submit"
                className="m-2 rounded-full hover:bg-red-600 duration-300 bg-red-500 px-8 py-2 text-white"
              >
                Search
              </button>
            </div>
          </div>
          {/* Search Bar  */}

          <div className="hidden md:block">
            <ul className="flex items-center space-x-8">
              <li>
                <Link to={"/"} className="">
                  Home
                </Link>
              </li>
              {token && (
                <>
                  <li>
                    <Link to={"/create"} className="">
                      Create Event
                    </Link>
                  </li>
                  <li>
                    <Link to={`/profile/${userId}`} className="">
                      Profile
                    </Link>
                  </li>
                </>
              )}
              {!token && (
                <>
                  <li>
                    <Link to={"/login"} className="">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to={"/register"} className="">
                      Register
                    </Link>
                  </li>
                </>
              )}
              {token && (
                <li>
                  <div className="cursor-pointer" onClick={handleLogout}>
                    Logout
                  </div>
                </li>
              )}
            </ul>
          </div>

          <div className=" items-center block xl:hidden">
            <button
              onClick={() => setShow((prev) => !prev)}
              id="menu-toggle"
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu  */}
          {show && (
            <div
              className={`w-full ${show ? "" : "hidden"} lg:block lg:w-auto`}
            >
              <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                <li>
                  <Link
                    to={"/"}
                    className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/create"}
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Create Event
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/profile/${userId}`}
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/login"}
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/register"}
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Register
                  </Link>
                </li>
              </ul>
              <div className="flex mx-10 rounded-full mt-10 border-2 border-gray-400">
                <input
                  className=" w-full border-none  bg-transparent px-8 py-1 text-gray-400 outline-none focus:outline-none "
                  type="search"
                  name="search"
                  placeholder="Search Event..."
                />
                <button
                  type="submit"
                  className="m-2 rounded-full hover:bg-red-600 duration-300 bg-red-500 px-8 py-2 text-white"
                >
                  Search
                </button>
              </div>
            </div>
          )}
          {/* Mobile Menu  */}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
