import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IsAuth = () => {
  const token = useSelector<RootState>((state) => state.user.token);
  const isAuth = useSelector<RootState>((state) => state.user.isAuth);
  const navigate = useNavigate();
  useEffect(() => {
    if (token && isAuth) {
      navigate("/app/matchmaker");
    }
  }, []);
};

export default IsAuth;
