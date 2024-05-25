import { useSelector, useDispatch } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import basicOps from "../utility/basicOps";
import ProductCard from "./ProductCard";

const ProductList = () => {
  let products = useSelector((store) => store.products);
  const filter = useSelector((store) => store.filter);
  const pagination = useSelector((store) => store.pagination);

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
      )}
    </>
  );
};
export default ProductList;
