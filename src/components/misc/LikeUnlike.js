import { useAuth } from "../../context/auth";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import { toast } from "react-toastify";

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
      const { data } = await axios.post("/wishlist", {
        adId: ad._id,
        userId: auth?.user?.userId,
      });
      // console.log('data ==>', data)
      const { wishlist } = data;

      console.log("handle like wishlist => ", wishlist);
      setAuth({ ...auth, wishlist });

      const fromLS = JSON.parse(localStorage.getItem("auth"));
      fromLS.wishlist = wishlist;
      localStorage.setItem("auth", JSON.stringify(fromLS));
      // navigate("/");
      toast.success("Added to wishlist");
      // console.log("handle like auth  2=> ", auth);
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
      const { data } = await axios.delete(
        `/wishlist/${ad._id}/${auth?.user?.userId}`
      );

      const { acknowledged, deletedCount } = data;

      if (acknowledged && deletedCount === 1) {
        const updatedWishlist = auth.wishlist?.filter((d) => {
          return d !== ad._id;
        });

        setAuth({ ...auth, wishlist: updatedWishlist });

        const fromLS = JSON.parse(localStorage.getItem("auth"));
        fromLS.wishlist = updatedWishlist;
        localStorage.setItem("auth", JSON.stringify(fromLS));
        // console.log('auth after >>>>', auth)
        // navigate("/");
        toast.success("Removed from wishlist");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {auth.wishlist?.includes(ad?._id) ? (
        <span>
          <FcLike onClick={handleUnlike} className="h5  pointer" />
        </span>
      ) : (
        <span>
          <FcLikePlaceholder onClick={handleLike} className="h5  pointer" />
        </span>
      )}
      {/* <pre>{JSON.stringify(auth, null, 4)} </pre>  */}
    </>
  );
}
