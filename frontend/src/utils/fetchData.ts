import mutateFetch from "./mutateFetch";
const base_url = import.meta.env.VITE_BASE_URL;

const fetchData = async (url: string) => {
  const access_token = localStorage.getItem("accessToken");
  const tokenExpiredCode = 403;

  return await fetch(`${base_url + url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  }).then((res) => {
    // If token expired, hit refresh token api and rerun the function
    if (res.status === tokenExpiredCode) {
      const refresh_token = localStorage.getItem("refreshToken");
      mutateFetch("/refresh", { refreshToken: refresh_token }, "POST")
        .then((res) => {
          if (!res.ok) {
            console.log("Token Expired");
            return (window.location.href = "/login");
          }
          return res.json();
        })
        .then((result) => {
          localStorage.setItem("accessToken", result.data.accessToken);
          fetchData(url);
        });
    }
    if (!res.ok) {
      throw new Error("Request Failed");
    }

    return res.json();
  });
};

export default fetchData;
