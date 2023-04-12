const base_url = import.meta.env.VITE_BASE_URL;

const mutateFetch = async (
  url: string,
  body: Object,
  method: "POST" | "PUT" | "DELETE"
) => {
  const access_token = localStorage.getItem("accessToken");
  const tokenExpiredCode = 403;

  return await fetch(`${base_url + url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({ ...body }),
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
          mutateFetch(url, body, "POST");
        });
      //       return (window.location.href = "/login");
    }
    if (!res.ok) {
      throw new Error("Request Failed");
    }

    return res.json();
  });
};

export default mutateFetch;
