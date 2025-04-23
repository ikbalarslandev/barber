import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

const request = (credentials: {
  type: "get" | "put" | "post" | "delete";
  endpoint: string;
  payload?: any;
  params?: any; // Add the params property
}) => {
  const config = {
    method: credentials.type,
    url: `/api/${credentials.endpoint}`,
    data: credentials.payload,
    params: credentials.params,
  };

  return axiosInstance.request(config);
};

const rwg_request = (credentials: {
  endpoint: "debug/collect" | "collect";
  token?: string;
}) => {
  const defaultToken =
    "AJKvS9WeONmWKEwjG0--HdpzMq0yAVNL8KMxbb44QtbcxMhSx_NUud5b8PLUBFehAIxOBO-iYRIJOknEFkIJmdsofdVJ6uOweQ==";

  const rwgInstance = axios.create({
    baseURL: "https://www.google.com/maps/conversion",
    withCredentials: false,
    headers: {
      "Content-Type": "text/plain",
    },
  });

  const config = {
    method: "post",
    url: `/${credentials.endpoint}`,
    data: JSON.stringify({
      conversion_partner_id: "20003529",
      rwg_token: credentials.token ?? defaultToken,
      merchant_changed: "2",
    }),
  };

  return rwgInstance.request(config);
};

export { request, rwg_request };
