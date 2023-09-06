import { useEffect, useState } from "react";
import api from "../../api";
import ProductList from "./ProductList";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import PaginationControls from "./PaginationControls";

const ProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const result = await api.getProducts(currentPage, itemsPerPage);
        if (!result.ok) {
          throw new Error("API Error");
        }
        const data = await result.json();
        if (!abortController.signal.aborted) {
          setProducts(data.products);
          setTotalPages(data.totalPages);
          setItemsPerPage(data.itemsPerPage);
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          setError(true);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [currentPage, itemsPerPage]);

  return (
    <main className="main-layout section-padding">
      {loading && <Loader />}
      {error && <ErrorMessage message="Error fetching products" />}
      <ProductList products={products} className="main-content" />
      <PaginationControls
        onPrev={() => setCurrentPage(currentPage - 1)}
        onNext={() => setCurrentPage(currentPage + 1)}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={products.length}
        isPrevDisabled={currentPage === 1}
      />
    </main>
  );
};

export default ProductPage;
