import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import AdCard from "../components/cards/AdCard";
import SearchForm from "../components/forms/SearchForm";

export default function Home() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [ads, setAds] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(18);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth.user === null) {
      auth.token = "";
    }
    fetchAds();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    fetchAds();
  }, [page]);

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    //window.scrollTo(0, 0);
  }, []);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get(`/ads/${page}/${perPage}`);

      //setAds((prevAds) => [...prevAds, ...data.ads]);
      setAds([...ads, ...data.ads]);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <SearchForm />
      </div>

      <div className="container pt-3">
        <div className="row">
          {ads?.map((ad) => (
            <AdCard ad={ad} key={ad._id} />
          ))}
        </div>

        {ads?.length < total ? (
          <div className="row">
            <div className="col text-center mt-4 mb-4">
              <button
                disabled={loading}
                className="btn btn-warning"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : `${ads?.length} / ${total} Load more`}
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {/* <pre>{JSON.stringify(auth, null, 4)} </pre>  */}
    </div>
  );
}
