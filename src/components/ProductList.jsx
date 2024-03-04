import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { actions as productActions } from "../redux/slices/productsSlice";
import basicOps from "../utility/basicOps";
import ProductCard from "./ProductCard";
import axios from "axios";
import URL from "../urlConfig";

const ProductList = () => {
  let products = useSelector((store) => store.products);
  const filter = useSelector((store) => store.filter);
  const pagination = useSelector((store) => store.pagination);

  const dispatch = useDispatch();

  //fetch products
  useEffect(() => {
    try {
      const fetchProducts = async () => {
        dispatch(productActions.getProductsStart());
        // const response = await fetch("https://fakestoreapi.com/products");
        const productData = await axios.get(URL.GET_PRODUCTS_URL);
        // const data = await response.json();
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

  const object = basicOps(
    products.products,
    filter.searchTerm,
    filter.sortDirection,
    filter.currentCategory,
    pagination.pageNumber,
    pagination.pageSize
  );
  const filteredProducts = object.filteredProducts;

  if (products.loading) {
    return (
      <div className="flex justify-center items-center mt-10 text-5xl">
        <FaSpinner className="animate-spin text-gray-500" />
      </div>
    );
  }

  if (products.error) return <h3>Error: {products.error}</h3>;

  return (
    <>
      {filteredProducts.length === 0 ? (
        <h3 className="text-red-500 font-bold mt-10">No products found</h3>
      ) : (
        <div className="w-screen flex justify-evenly flex-wrap overflow-x-hidden  ">
          {filteredProducts.map((product) => {
            // return <div>{product.title}</div>;
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
        // filteredProducts.map((product) => {
        //   return <ProductCard key={product.id} product={product} />;
        // })
      )}
    </>
  );
};
export default ProductList;
