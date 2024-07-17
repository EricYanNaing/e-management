import { redirect } from "react-router-dom";

const isLogin = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/");
  }
  const response = await fetch(`${import.meta.env.VITE_API}/status`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    alert("Not Authorized !");
    return redirect("/login");
  } else {
    return null;
  }
};

export default isLogin;
