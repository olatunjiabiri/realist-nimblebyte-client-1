const config = {
  AdminEmail: process.env.REACT_APP_AdminEmail,

  APIS_PROTECT: "Fm2dT0GzyUa_Q_6KxMTzNwELPcEVcHOUqyjd0yn0LJqA",
  AUTH_API_KEY: "d6cf4f00-773e-40b6-aed1-1960691e954e",
  CLIENT_BASE_URL: "https://realistclientapp2.azurewebsites.net",
  API: process.env.REACT_APP_NODE_API,
  AUTH_API:
    // process.env.NODE_ENV === "production"
    //"https://localhost:7298",
    // "https://authbackendservice.azurewebsites.net",
    "https://realist-auth-backend.azurewebsites.net",
  PAYMENT_API: "https://realist-payment-service.azurewebsites.net",
  //  "https://localhost:7067",

  GOOGLE_PLACES_KEY: process.env.REACT_APP_GOOGLE_API_KEY,
  GOOGLE_MAPS_KEY: process.env.REACT_APP_GOOGLE_API_KEY,

  STRIPE_PUBLISHABLE_KEY: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,

  emailId: process.env.REACT_APP_emailId,

  // PAYSTACK_KEYS = "development"
  REACT_APP_PS_PUBLIC_TEST_KEY: process.env.REACT_APP_PS_PUBLIC_TEST_KEY,
  REACT_APP_PS_PUBLIC_LIVE_KEY: process.env.REACT_APP_PS_PUBLIC_LIVE_KEY,
};

export default config;
