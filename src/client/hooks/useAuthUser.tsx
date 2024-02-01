import { decodeToken } from "react-jwt";
import { useAppSelector } from "./reduxHooks";

const useAuthUser = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  let isAdmin = false;
  let accessRight = "User";

  if (accessToken) {
    const decodedToken = decodeToken(accessToken) as {
      roles: string[];
      id: string;
    };
    const { roles } = decodedToken;

    isAdmin = roles.includes("Admin");
    if (isAdmin) {
      accessRight = "Admin";
    }

    return { roles, isAdmin, accessRight };
  }

  return { roles: [], isAdmin, accessRight };
};

export default useAuthUser;
