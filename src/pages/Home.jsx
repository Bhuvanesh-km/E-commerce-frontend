import { useEffect } from "react";
import { Categories, ProductList, Pagination } from "../components/index";
import { useSelector, useDispatch } from "react-redux";
import { actions as paginationActions } from "../redux/slices/paginationSlice";
import { actions as productActions } from "../redux/slices/productsSlice";
import axios from "axios";
import URL from "../urlConfig";

const Home = () => {
  const dispatch = useDispatch();

  //fetch products
  useEffect(() => {
    try {
      const fetchProducts = async () => {
        dispatch(productActions.getProductsStart());
        const productData = await axios.get(URL.GET_PRODUCTS_URL);
        const productsArray = productData.data.data;
        const products = productsArray.map((product) => {
          return {
            id: product._id,
            title: product.name,
            price: product.price,
            description: product.description,
            category: product.categories[0],
            image: product.images[0],
            count: product.stock,
            rating: 4.5,
            ...product,
          };
        });
        dispatch(productActions.getProductsSuccess(products));
      };
      fetchProducts();
    } catch (error) {
      console.log(error);
      dispatch(productActions.getProductsFailure(error));
    }
  }, []);

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
