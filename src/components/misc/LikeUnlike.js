import { useAuth } from "../../context/auth";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import axios from "axios";
import toast from "react-hot-toast";

export default function LikeUnlike({ ad }) {
  // context
  const [auth, setAuth] = useAuth();
  // hooks
  const navigate = useNavigate();

  const handleLike = async () => {
    try {
      if (auth.user === null) {
        navigate("/login", {
          state: `/ad/${ad.slug}`,
        });
        return;
      }
      const { data } = await axios.post("/wishlist", { adId: ad._id });
      //   console.log("handle like => ", data);
      setAuth({ ...auth, user: data });
      const fromLS = JSON.parse(localStorage.getItem("auth"));
      fromLS.user = data;
      localStorage.setItem("auth", JSON.stringify(fromLS));
      toast.success("Added to wishlist");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      if (auth.user === null) {
        navigate("/login", {
          state: `/ad/${ad.slug}`,
        });
        return;
      }
      const { data } = await axios.delete(`/wishlist/${ad._id}`);
      //   console.log("handle unlike => ", data);
      setAuth({ ...auth, user: data });
      const fromLS = JSON.parse(localStorage.getItem("auth"));
      fromLS.user = data;
      localStorage.setItem("auth", JSON.stringify(fromLS));
      toast.success("Removed from wishlist");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {auth.user?.wishlist?.includes(ad?._id) ? (
        <span>
          {/* <Icon icon="icon-park-solid:like" color="red" width="30" height="30" onClick={handleUnlike} className="h2 mt-3 pointer" /> */}
          <FcLike onClick={handleUnlike} className="h2 mt-3 pointer" />
        </span>
      ) : (
        <span>
          {/* <Icon icon="icon-park-outline:like" color="red" width="30" height="30" onClick={handleUnlike} className="h2 mt-3 pointer" /> */}
          <FcLikePlaceholder onClick={handleLike} className="h2 mt-3 pointer" />
        </span>
      )}
    </>
  );
}
