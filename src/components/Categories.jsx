import React from "react";
import { actions as filterActions } from "../redux/slices/filteringSlice";
import { actions as paginationActions } from "../redux/slices/paginationSlice";
import { useDispatch } from "react-redux";
import {
  TbSortDescendingNumbers,
  TbSortAscendingNumbers,
} from "react-icons/tb";
import { GrPowerReset } from "react-icons/gr";

const Categories = () => {
  const categories = [
    "men's clothing",
    "women's clothing",
    "electronics",
    "jewelery",
  ];
  const dispatch = useDispatch();

  const handleCurrentCategory = (e) => {
    console.log(e.target.textContent);
    dispatch(paginationActions.setPageNumber(1));
    dispatch(filterActions.setCurrentCategory(e.target.textContent));
  };

  return (
    <div className="w-screen flex py-3 border-b-2">
      <div className=" flex w-1/4 items-center gap-10 justify-end">
        <div className="relative group">
          <GrPowerReset
            className="text-2xl"
            onClick={() => {
              dispatch(filterActions.setCurrentCategory("All categories"));
              dispatch(paginationActions.setPageNumber(1));
              dispatch(filterActions.setSortDirection(0));
            }}
          />
          <div className="absolute border rounded-lg bg-fuchsia-400 text-white border-gray-100 px-2 left-3 py-1 invisible group-hover:visible">
            Reset
          </div>
        </div>
        <div className="relative group">
          <TbSortAscendingNumbers
            className="text-2xl"
            onClick={() => {
              dispatch(filterActions.setSortDirection(1));
            }}
          />
          <div className="absolute border rounded-lg bg-fuchsia-400 text-white border-gray-100 px-2 left-3 py-1 invisible group-hover:visible">
            Asc
          </div>
        </div>
        <div className="relative group">
          <TbSortDescendingNumbers
            className="text-2xl"
            onClick={() => {
              dispatch(filterActions.setSortDirection(-1));
            }}
          />
          <div className="absolute border rounded-lg bg-fuchsia-400 text-white border-gray-100 px-2 left-3 py-1 invisible group-hover:visible">
            Desc
          </div>
        </div>
      </div>
      <div className="flex w-3/4 items-center justify-end gap-2 mr-7">
        <button
          className="h-10 w-fit text-center text-white bg-violet-500 rounded-md px-2 py-1 hover:bg-violet-600 transition duration-200 ease-in-out shadow-md"
          onClick={handleCurrentCategory}
        >
          All categories
        </button>
        {categories &&
          categories.map((category, index) => {
            return (
              <button
                className="h-10 min-w-32 text-center text-white bg-violet-500 rounded-md px-2 py-1 hover:bg-violet-600 transition duration-200 ease-in-out shadow-md"
                key={index}
                onClick={handleCurrentCategory}
              >
                {category}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default Categories;
