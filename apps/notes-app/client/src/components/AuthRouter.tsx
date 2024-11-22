import { useEffect, useState } from "react"
import AuthService from "../services/auth.service";
import { PageLoader } from "yw-icons";
import { Navigate } from "react-router-dom";

export default function AuthRouter({ children }) {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const verifyToken = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await AuthService.authenticateToken()
      const data = await res.json();
      console.log(data);
    } catch (error) {
      setError(true);
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    verifyToken()
    return () => {
      setLoading(false);
      setError(false);
    };
  }, []);

  return loading ? <PageLoader /> : error ? <Navigate to='/login'/> : children
}