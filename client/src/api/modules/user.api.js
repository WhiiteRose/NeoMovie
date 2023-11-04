import privateClient from "../client/private.client.js";
import publicClient from "../client/public.client.js";

const userEndpoints = {
  signin: "user/signin",
  signup: "user/signup",
  getInfo: "user/info",
  passwordUpdate: "user/update-password",
};

const userApi = {
  signin: async ({ username, password, rememberMe }) => {
    console.log("userApi.signin");
    try {
      const response = await publicClient.post(userEndpoints.signin, {
        username,
        password,
        rememberMe,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  signup: async ({
    username,
    password,
    confirmPassword,
    displayName,
    rememberMe,
  }) => {
    try {
      const response = await publicClient.post(userEndpoints.signup, {
        username,
        password,
        confirmPassword,
        displayName,
        rememberMe,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getInfo);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  passwordUpdate: async ({ password, newPassword, confirmNewPassword }) => {
    try {
      const response = await privateClient.put(userEndpoints.passwordUpdate, {
        password,
        newPassword,
        confirmNewPassword,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default userApi;
