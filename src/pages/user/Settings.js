import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Settings() {
  // state
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put("/update-password", {
        password,
      });
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setLoading(false);
        toast.success("Password updated");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="container mt-2">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 mt-2">
              <form onSubmit={handleSubmit}>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="form-control mb-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  className="btn btn-primary col-12 mb-4"
                  disabled={loading}
                >
                  {loading ? "Processing" : "Update password"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
