import config from "../../../NewConfig";
import axios from "axios";

const ref = searchParams.get("ref");
const [isVerified, setName] = useState(false);

useEffect(() => {
    if(ref) verifyPayment();
 }, [ref])
 

 const verifyPayment = async () => {
    try {
        const { data } = await axios.post(`${config.PAYMENT_API}/api/payments/verify`, {
            reference: ref,
          });
          if(data.success){

          }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div
      className="display-1 d-flex justify-content-center align-items-center vh-100"
      style={{ marginTop: "-5%" }}>
        Please wait...verifying payment
    </div>
  );