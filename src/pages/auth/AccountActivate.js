import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function AccountActivate() {
  // hooks
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  const userId = searchParams.get("userid");

  const navigate = useNavigate();

  useEffect(() => {
    if (token) requestActivation();
  }, [token]);

  const requestActivation = async () => {
    try {
      const response = await axios.get(
        `https://payorigins-auth.azurewebsites.net/user/ConfirmEmail?token=${token}&userId=${userId}`
      );

      // console.log("response activate=>", response);

      if (!response?.data?.success) {
        toast.error(response?.data?.message);
        // navigate("/login");
      } else {
        // console.log(response);

        toast.success("Your email has been confirmed. Log in to Realist app.");
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div
      className="display-1 d-flex justify-content-center align-items-center vh-100"
      style={{ marginTop: "-5%" }}
    >
      Please wait...
    </div>
  );
}
