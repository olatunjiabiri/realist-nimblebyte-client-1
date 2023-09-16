const config = {
  API:
    process.env.NODE_ENV !== "production"
      ? "http://localhost:8000/api"
      : "https://realist-node-backend.azurewebsites.net/api",
  AUTH_API:
    process.env.NODE_ENV !== "production"
      ? "http://localhost:5001"
      : "https://nimblebyte-website-node-backend.azurewebsites.net/api",

  GOOGLE_PLACES_KEY: "AIzaSyD3IfqOASixLFAOqv7dDtwllrpHsa11iTs",
  GOOGLE_MAPS_KEY: "AIzaSyD3IfqOASixLFAOqv7dDtwllrpHsa11iTs",
  STRIPE_PUBLISHABLE_KEY:
    "pk_test_51N5rmAIPzi27NxkuwY7kRWxrd45VLdOlaFpegNGUksbkeGd4CTnOlDcdHwU7u1yv1Cgln0s36kjMtN9XuiLtXbHK00cbwxDnxX",
  appId: "CCD4D729-FCE1-4D8D-91B1-4BF80A3DF80C",
};

export default config;
