const config = {
  AdminEmail: "#{REACT-APP-ADMIN-EMAIL}#",

  // APIS_PROTECT: "#{NODE-PROTECT-API-KEY}#",
  APIS_PROTECT: "Fm2dT0GzyUa_Q_6KxMTzNwELPcEVcHOUqyjd0yn0LJqA",

  // AUTH_API_KEY: "#{AUTH-API-KEY}#",
  AUTH_API_KEY: "d6cf4f00-773e-40b6-aed1-1960691e954e",

  // CLIENT_BASE_URL: "#{REACT-CLIENT-BASE-URL}#",
  CLIENT_BASE_URL: "https://realistclientapp2.azurewebsites.net",
  // API: "#{REACT-NODE-API}#",
  API:
    // process.env.NODE_ENV === "production"
    "http://localhost:8000/api",
  // AUTH_API: "#{REACT-AUTH-API}#",
  AUTH_API:
    // process.env.NODE_ENV === "production"
    "https://localhost:7298",
  PAYMENT_API: "#{REACT-PAYMENT-API}#",

  GOOGLE_PLACES_KEY: "#{REACT-APP-GOOGLE-MAPS-KEY}#",
  GOOGLE_MAPS_KEY: "#{REACT-APP-GOOGLE-MAPS-KEY}#",
  STRIPE_PUBLISHABLE_KEY: "#{STRIPE-PUBLISHABLE-KEY}#",
  // appId: "#{REACT-appId}#",
  emailId: "#{REACT-APP-EMAIL-ID}#",

  // PAYSTACK_KEYS = "development"
  REACT_APP_PS_PUBLIC_TEST_KEY: "#{REACT-APP-PS-PUBLIC-TEST-KEY-DEV}#",
  REACT_APP_PS_PUBLIC_LIVE_KEY: "#{REACT-APP-PS-PUBLIC-LIVE-KEY-DEV}#",
};

export default config;
