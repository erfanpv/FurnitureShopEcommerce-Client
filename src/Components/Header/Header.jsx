import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import SearchWithSuggestions from "./Search/Search";
import CategoryDropdown from "../Products/CatogeryProduct/Catogory";
import StoreLogo from "../../assets/Icons/StoreLgo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn } from "../../app/Slice/usersSlice/usersSlice";
import { loadWishList } from "../../app/Slice/wishListSlice/wishListThunk";
import { fetchCart } from "../../app/Slice/addCartSlice/cartThunk";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const { isLoggedIn } = useSelector((state) => state.users);
  const { cart } = useSelector((state) => state.cart);
  const { wishlistCart } = useSelector((state) => state.wishList);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const user = localStorage.getItem("username");
  const dispatch = useDispatch();
  const id = localStorage.getItem("id");


    useEffect(() => {
      dispatch(loadWishList());
      dispatch(fetchCart());
    }, [dispatch]);
  

  const userNavigation = [
    // { name: "Profile", href: "/profile" },
    { name: "Order Details", href: `/orders/${id}` },
    { name: "Sign out", href: "/" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setLoggedIn(false));
  };

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 pt-5"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <div className="-m-1.5 p-1.5">
            <Link to={"/"}>
              <span className="sr-only">Your Company</span>
              <img
                className="hidden sm:block h-20 rounded-md"
                src={StoreLogo}
                alt=""
              />
            </Link>
          </div>
        </div>

        {/**Search-bar */}

        <SearchWithSuggestions />

        {/***Hamber Icon for mobile menu */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 mr-1"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Link
            to="/"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Products
          </Link>

          {/* Pass the callback to close the mobile menu */}
          <CategoryDropdown
            isMobile={false}
            onCloseMenu={() => setMobileMenuOpen(false)}
          />
        </PopoverGroup>

        {isLoggedIn === true ? (
          <>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end mr-10">
              <Menu as="div" className="relative ml-3">
                <div className="flex items-center">
                  <MenuButton className="relative flex items-center">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <h1 className="text-sm font-semibold leading-6 text-gray-900">
                      {user}
                    </h1>
                    <svg
                      className="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.707a1 1 0 011.414 0L10 11.086l3.293-3.379a1 1 0 111.414 1.414l-4 4.104a1 1 0 01-1.414 0l-4-4.104a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </MenuButton>
                </div>

                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {userNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      {({ focus }) => (
                        <Link
                          onClick={
                            item.name === "Sign out" ? handleLogout : null
                          }
                          to={item.href}
                          className={classNames(
                            focus ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          {item.name}
                        </Link>
                      )}
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>

            <Link to={"/wishlist"} className="mr-6">
              <div className="relative text-sm font-semibold leading-6 w-6 sm:w-14 lg:ms-20 text-gray-900 cursor-pointer">
                {wishlistCart?.products?.length > 0 && (
                  <span className="absolute  bg-rose-600 text-white text-xs font-semibold rounded-full w-3 h-3 items-center justify-center md:ml-24 "></span>
                )}

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-7 h-7 md:ml-20"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.51 6.51 0 0116.5 3 5.5 5.5 0 0122 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
              </div>
            </Link>

            <Link
              to="/products/cart/mycart"
              className="text-sm font-semibold leading-6 w-14 lg:ms-20 text-gray-900 "
            >
              <span className="bg-rose-600 ms-2.5 top-5 lg:top-9 md:top-9 sm:top-9 absolute text-white p-.5 px-1.5 text-sm rounded-full">
                {" "}
                {cart.length}
              </span>
              <img
                className="h-6 w-auto  "
                src="https://static-00.iconduck.com/assets.00/shopping-cart-icon-2048x2047-gv68pvgw.png"
                alt="cart"
              />
            </Link>
          </>
        ) : (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end mr-10">
            <Link
              to="/login"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        )}
      </nav>

      {/**Mobile Widget */}
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="relative mr-20 ">
          <label htmlFor="Search" className="sr-only">
            {" "}
            Search{" "}
          </label>

          <input
            type="text"
            id="Search"
            placeholder="Search for..."
            className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm border-2 pl-3"
          />

          <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
            <button type="button" className="text-gray-600 hover:text-gray-700">
              <span className="sr-only">Search</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </span>
        </div>
        <div className="fixed inset-0 z-10" />

        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-20 w-auto" src={StoreLogo} alt="" />
            </Link>

            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6">
              <div className="space-y-2 py-6">
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  to="/"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                >
                  Home
                </Link>
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  to="/products"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                >
                  Products
                </Link>
                {/* Pass the callback to close the mobile menu */}
                <CategoryDropdown
                  isMobile={true}
                  onCloseMenu={() => setMobileMenuOpen(false)}
                />
              </div>
              <div className="py-6">
                {isLoggedIn === true ? (
                  <div>
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <MenuButton className="flex items-center">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <p className="text-black hover:bg-gray-700 hover:text-white font-bold">
                            {user}
                          </p>
                          <svg
                            className="-mr-1 ml-2 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.707a1 1 0 011.414 0L10 11.086l3.293-3.379a1 1 0 111.414 1.414l-4 4.104a1 1 0 01-1.414 0l-4-4.104a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </MenuButton>
                      </div>

                      <MenuItems className="absolute  z-10 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item, index) => (
                          <MenuItem key={index}>
                            {({ focus }) => (
                              <Link
                                onClick={
                                  item.name === "Sign out" ? handleLogout : null
                                }
                                to={item.href}
                                className={classNames(
                                  focus ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </Link>
                            )}
                          </MenuItem>
                        ))}
                      </MenuItems>
                    </Menu>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
