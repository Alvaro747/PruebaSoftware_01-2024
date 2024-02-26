import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "@hooks/useAuth.hook";

const LayoutAuth = () => {
  const {user} = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" />;
  }
  return (
    <>
      {/* Start Content */}
      <Outlet />
      {/* End Content */}
    </>
  );
};

export default LayoutAuth;
