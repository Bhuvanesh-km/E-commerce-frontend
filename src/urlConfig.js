const BASE_URL = "https://e-commerce-backend-ibuo.onrender.com";

const urlConfig = {
  LOGIN_URL: `${BASE_URL}/api/auth/login`,
  SIGNUP_URL: `${BASE_URL}/api/auth/signup`,
  FORGOT_PASSWORD_URL: `${BASE_URL}/api/auth/forgot-password`,
  RESET_PASSWORD_URL: `${BASE_URL}/api/auth/reset-password`,
  LOGOUT_URL: `${BASE_URL}/api/auth/logout`,
  GET_PRODUCTS_URL: `${BASE_URL}/api/product`,
  GET_CATEGORIES_URL: `${BASE_URL}/api/product/categories`,
  CHECKOUT_URL: `${BASE_URL}/api/booking`,
  VERIFY_PAYMENT_URL: `${BASE_URL}/api/booking/verify`,
};

export default urlConfig;
