const config = {
  AdminEmail: "#{REACT-APP-ADMIN-EMAIL}#",

  // APIS_PROTECT: "Fm2dT0GzyUa_Q_6KxMTzNwELPcEVcHOUqyjd0yn0LJqA",
  APIS_PROTECT: "#{NODE-PROTECT-API-KEY}#",

  AUTH_API_KEY: "#{AUTH-API-KEY}#",
  CLIENT_BASE_URL: "https://realistclientapp2.azurewebsites.net",
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
  GOOGLE_PLACES_KEY: "#{REACT-APP-GOOGLE-MAPS-KEY}#",
  GOOGLE_MAPS_KEY: "#{REACT-APP-GOOGLE-MAPS-KEY}#",
  STRIPE_PUBLISHABLE_KEY: "#{STRIPE-PUBLISHABLE-KEY}#",
  // appId: "CCD4D729-FCE1-4D8D-91B1-4BF80A3DF80C",
  emailId: "#{REACT-APP-EMAIL-ID}#",

  // PAYSTACK_KEYS = "development"
  REACT_APP_PS_PUBLIC_TEST_KEY: "#{REACT-APP-PS-PUBLIC-TEST-KEY-DEV}#",
  REACT_APP_PS_PUBLIC_LIVE_KEY:
    "pk_live_pk_test_6970b3ab22034b9a72ff64c8ffd57e9df76ecb4a",
};

export default config;
