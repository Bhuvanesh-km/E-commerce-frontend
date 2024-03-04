import { actions as paginationActions } from "../redux/slices/paginationSlice";
import { useDispatch } from "react-redux";

export default function basicOps(
  products,
  searchTerm,
  sortDirection,
  currentCategory,
  PageNumber,
  PageSize
) {
  const dispatch = useDispatch();
  if (products == null) {
    return;
  }
  /************* filtering *********************/
  let filteredProducts = products;
  if (searchTerm !== "") {
    filteredProducts = filteredProducts.filter((product) => {
      return product.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  /************* sorting *********************/
  if (sortDirection !== 0) {
    if (sortDirection === 1) {
      filteredProducts = filteredProducts
        .slice()
        .sort((a, b) => (a.price > b.price ? 1 : -1));
    } else if (sortDirection === -1) {
      filteredProducts = filteredProducts
        .slice()
        .sort((a, b) => (a.price < b.price ? 1 : -1));
    }
  }
  /************* categorization *********************/
  if (currentCategory !== "All categories") {
    filteredProducts = filteredProducts.filter((product) => {
      return product.category === currentCategory;
    });
  }

  /************* pagination *********************/
  let totalProducts = filteredProducts.length;
  let totalPages = Math.ceil(totalProducts / PageSize);
  let startIndex = (PageNumber - 1) * PageSize;
  let endIndex = Math.min(startIndex + PageSize, totalProducts);
  filteredProducts = filteredProducts.slice(startIndex, endIndex);
  dispatch(paginationActions.setTotalPages(totalPages));
  console.log(filteredProducts);
  return { filteredProducts };
}
