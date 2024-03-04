import { Categories, ProductList, Pagination } from "../components/index";

import { useSelector, useDispatch } from "react-redux";
import { actions as paginationActions } from "../redux/slices/paginationSlice";

const Home = () => {
  // const currentCategory = useSelector((store) => store.filter.currentCategory);
  // useEffect(() => {
  //   console.log(currentCategory);
  // }, [currentCategory]);
  const dispatch = useDispatch();

  const pagination = useSelector((store) => store.pagination);

  const handelPageChange = (pageNumber) => {
    dispatch(paginationActions.setPageNumber(pageNumber));
  };

  return (
    <>
      <header>
        <Categories />
      </header>
      <main>
        <div>
          <ProductList />
        </div>
        <div className="my-3">
          <Pagination
            currentPage={pagination.pageNumber}
            totalPages={pagination.totalPages}
            onPageChange={handelPageChange}
          />
        </div>
      </main>
    </>
  );
};

export default Home;
