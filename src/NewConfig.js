const config = {
  AdminEmail: process.env.REACT_APP_AdminEmail,

  APIS_PROTECT: process.env.REACT_APP_APIS_PROTECT,
  AUTH_API_KEY: process.env.REACT_APP_AUTH_API,

  CLIENT_BASE_URL: process.env.REACT_APP_CLIENT_BASE_URL,

  API: process.env.process.env.REACT_APP_NODE_API,
  AUTH_API: useGridPipeProcessing.env.REACT_APP_AUTH_API,
  PAYMENT_API: process.env.REACT_APP_PAYMENT_API,

  GOOGLE_PLACES_KEY: process.env.REACT_APP_GOOGLE_API_KEY,
  GOOGLE_MAPS_KEY: process.env.REACT_APP_GOOGLE_API_KEY,

  STRIPE_PUBLISHABLE_KEY: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,

  emailId: process.env.REACT_APP_emailId,

  // PAYSTACK_KEYS = "development"
  REACT_APP_PS_PUBLIC_TEST_KEY: process.env.REACT_APP_PS_PUBLIC_TEST_KEY,
  REACT_APP_PS_PUBLIC_LIVE_KEY: process.env.REACT_APP_PS_PUBLIC_LIVE_KEY,
};

export default config;
