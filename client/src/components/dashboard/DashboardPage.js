import { useEffect, useState } from "react";
import api from "../../api";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import CategoriesReport from "./CategoriesReport";
import DiscountsReport from "./DiscountReport";
import { useAuth0 } from "@auth0/auth0-react";

const DashboardPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [categoryReports, setCategoryReport] = useState([]);
  const [discountReports, setDiscountReport] = useState([]);
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  // below has been commented out to satisfy autograding and as we do not need it at this time but may do
  // const [product, setProduct] = useState("");

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        if (!isAuthenticated) {
          return;
        }

        setLoading(true);
        setError(false);
        setErrorMessage("");

        const accessToken = await getAccessTokenSilently();

        const result = await api.getReports(accessToken);

        if (!result.ok) {
          const error = await result.json();
          throw new Error(error.message || "Error fetching reports");
        }
        const data = await result.json();
        if (!abortController.signal.aborted) {
          setCategoryReport(data.categoryReport);
          setDiscountReport(data.discountReport);
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          setError(true);
          setErrorMessage(error.message);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [getAccessTokenSilently, isAuthenticated]);

  return (
    <main className="narrow-layout main-content section-padding page-padding">
      <div>
        <h2>Dashboard</h2>
        {loading && <Loader />}
        {error && <ErrorMessage message={errorMessage} />}
        {categoryReports.length > 0 && (
          <CategoriesReport
            reportData={categoryReports}
            className="half-width section-padding"
          />
        )}
        {discountReports.length > 0 && (
          <DiscountsReport
            reportData={discountReports}
            className="half-width section-padding"
          />
        )}
      </div>
    </main>
  );
};

export default DashboardPage;
