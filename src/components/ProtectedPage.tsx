import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../lib/useUser";

interface IProtectecdPageProps {
  children: React.ReactNode;
}

export default function ProtectedPage({ children }: IProtectecdPageProps) {
  const { isLoggedIn, userLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading) {
      if (!isLoggedIn) {
        navigate("/");
      }
    }
  }, [isLoggedIn, userLoading, navigate]);
  return <>{children}</>;
}
