import { Fragment } from "react";
import { Navigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Spinner from "./Spinner";
import { User } from "../entities/User";

type PrivateRouteProps = {
  isUserLoggedIn: boolean;
  isLoading: boolean;
  user: User;
  logout: () => void;
  children?: React.ReactNode | null;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isUserLoggedIn,
  user,
  logout,
  isLoading,
  children,
}) => {
  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          {isUserLoggedIn ? (
            <Fragment>
              <NavigationBar user={user} logout={logout} />
              {children}
            </Fragment>
          ) : (
            <Navigate to="/sign-in" replace />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
