const config = {
  AdminEmail: "information@nimble-byte.com",

  APIS_PROTECT: "Fm2dT0GzyUa_Q_6KxMTzNwELPcEVcHOUqyjd0yn0LJqA",
  API:
    // process.env.NODE_ENV === "production"
    // "http://localhost:8000/api",
    "https://realist-node-backend.azurewebsites.net/api",
  AUTH_API:
    // process.env.NODE_ENV === "production"
    //"https://localhost:7298",
    // "https://authbackendservice.azurewebsites.net",
    "https://realist-auth-backend.azurewebsites.net",
  PAYMENT_API: "https://realist-payment-service.azurewebsites.net",
  //  "https://localhost:7067",
  GOOGLE_PLACES_KEY: "AIzaSyD3IfqOASixLFAOqv7dDtwllrpHsa11iTs",
  GOOGLE_MAPS_KEY: "AIzaSyD3IfqOASixLFAOqv7dDtwllrpHsa11iTs",
  STRIPE_PUBLISHABLE_KEY:
    "pk_test_51N5rmAIPzi27NxkuwY7kRWxrd45VLdOlaFpegNGUksbkeGd4CTnOlDcdHwU7u1yv1Cgln0s36kjMtN9XuiLtXbHK00cbwxDnxX",
  // appId: "CCD4D729-FCE1-4D8D-91B1-4BF80A3DF80C",
  emailId: "E4BCBFAA-3258-4934-AA87-891AE86B6E71",

  // PAYSTACK_KEYS = "development"
  REACT_APP_PS_PUBLIC_TEST_KEY:
    "pk_test_sk_test_8b48c4990c2ac49a717cdda794f7104ae4ed56a4",
  REACT_APP_PS_PUBLIC_LIVE_KEY:
    "pk_live_pk_test_6970b3ab22034b9a72ff64c8ffd57e9df76ecb4a",
};

export default config;
