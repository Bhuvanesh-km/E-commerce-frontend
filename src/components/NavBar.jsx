import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { FaClipboardList, FaOpencart } from "react-icons/fa";
import { actions } from "../redux/slices/filteringSlice";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const cartQuantity = useSelector((store) => store.cart.cartQuantity);
  // console.log(cartQuantity);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSearch = (e) => {
    console.log(e.target.value);
    dispatch(actions.setSearchTerm(e.target.value));
  };

  const { authenticatedUser, setAuthenticatedUser } = useAuth();

  const handelNavigateHome = () => {
    navigate("/");
  };

  const handelNavigate = () => {
    navigate("/cart");
  };

  const handleProfile = () => {
    navigate("/user-profile");
  };

  const handleOrders = () => {
    navigate("/orders");
  };

  return (
    <header className="flex px-8 py-5 w-screen bg-violet-200 shadow-md justify-evenly items-center">
      <div className="w-10 h-10">
        <img
          src="/online_logo.png"
          alt="logo"
          onClick={handelNavigateHome}
          className="rounded-full cursor-pointer w-full h-full object-cover"
        />
      </div>
      {/* <nav className="flex items-center gap-3">
        <a className="font-bold uppercase text-base hover:text-violet-500 hover:border-b-2 border-orange-400  transition duration-200 ease-in-out">
          All categories
        </a>
        <a className="font-bold uppercase text-base hover:text-violet-500 hover:border-b-2 border-orange-400 transition duration-200 ease-in-out">
          Men
        </a>
        <a className="font-bold uppercase text-base hover:text-violet-500 hover:border-b-2 border-orange-400  transition duration-200 ease-in-out">
          Women
        </a>
        <a className="font-bold uppercase text-base hover:text-violet-500 hover:border-b-2 border-orange-400  transition duration-200 ease-in-out">
          Electronics
        </a>
        <a className="font-bold uppercase text-base hover:text-violet-500 hover:border-b-2 border-orange-400  transition duration-200 ease-in-out">
          Jewerly
          <sup className="text-red-500 text-xs font-semibold uppercase hover:text-violet-500 transition duration-200 ease-in-out">
            New
          </sup>
        </a>
      </nav> */}
      <div className="">
        <input
          className="h-10 w-96 border-2 border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          placeholder="🔍 Search for products, brands and more"
          onChange={handleSearch}
        />
      </div>
      <div className="flex items-end justify-end gap-4 ">
        <div className="flex items-center justify-center flex-col ">
          <CgProfile
            className="text-xl cursor-pointer "
            onClick={handleProfile}
          />
          <span className="">Profile</span>
        </div>

        <div className="flex items-center justify-center flex-col">
          <FaClipboardList
            className="text-xl cursor-pointer "
            onClick={handleOrders}
          />
          <span className="">Orders</span>
        </div>
        <div className="flex items-center justify-center flex-col relative">
          <FaOpencart
            className="text-xl text-rose-500 cursor-pointer"
            onClick={handelNavigate}
          />
          <span className="">Cart</span>
          <div className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
            {cartQuantity}
          </div>
        </div>

        {authenticatedUser.email && (
          <div className="flex items-center justify-center flex-col">
            <FiLogOut
              className="text-xl cursor-pointer"
              onClick={() => {
                setAuthenticatedUser({});
                navigate("/");
              }}
            />
            <span className="">Logout</span>
          </div>
        )}

        {/* {authenticatedUser ? (
          <div className="flex items-center justify-center flex-col">
            <FiLogOut className="text-xlcursor-pointer" />
            <span className="">Logout</span>
          </div>
        ) : null} */}
      </div>
    </header>
  );
};

export default NavBar;
