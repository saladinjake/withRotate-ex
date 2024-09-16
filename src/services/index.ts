import axios from "axios";
import { UpdateProfileDataType ,UserDataType, CompanyInfoDataType} from "./types"
const APP_URL = "https://api.stg.withrotate.com/api";
const axiosInstanceObject = axios.create({
  APP_URL,
});

const getBearerConfig = (config) => {
   const accessTokenData = localStorage.getItem("accessToken");
    if (accessTokenData) {
      config.headers["Authorization"] = `Bearer ${accessTokenData}`;
    }
    return config;
}
axiosInstanceObject.interceptors.request.use(
  (config) => {
   return getBearerConfig(config)
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getAllUsers = () => {
  return axiosInstanceObject.get<UserDataType[]>("/user_management/list_users");
};

export const getCompanyInfoData = () => {
  return axiosInstanceObject.get<CompanyInfoDataType>("/org_management/get_org_data");
};

export const updateProfileData = (data: UpdateProfileDataType) => {
  return axiosInstanceObject.put<CompanyInfoDataType>("/org_management/update_profile", data);
};


