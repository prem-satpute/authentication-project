import { getData } from "@/context/userContext";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AuthSuccess() {
  const { setUser } = getData();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search);

      const accessToken = params.get("token");
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        try {
          const res = await axios.get("http://localhost:8080/auth/me", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (res.data.success) {
            setUser(res.data.user); // user in cotext api store
            navigate("/");
          }
        } catch (err) {
          console.error("Error fetching user :", err);
        }
      }
    };
    handleAuth();
  }, [navigate]);

  return <h2>Logging in....</h2>;
}

export default AuthSuccess;
