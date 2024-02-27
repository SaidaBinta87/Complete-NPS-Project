import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const loginStatus = sessionStorage.getItem("isLoggedIn");

    if(!loginStatus) {
        return (
            <Navigate to="/login" />
        )
    }

    return <div>{children}</div>
}

export default ProtectedRoute;