// componant for secure routes for authenticator
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Box, CircularProgress } from "@mui/material";

const ProtectedRoute = ({children}) =>{
    const {isAuthenticated, loading} = useAuth()
    const location = useLocation()

    // show a loader during verification
    if(loading){
        return(
            <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh">
                <CircularProgress/>
            </Box>
        )
    }
    // if no authenticate redirect to Sign-in
    if(!isAuthenticated){
        return <Navigate to="/Sign-in" state={ { from:location } } replace />
    }
    // if anthenticate  show the contenu
    return children
}
export default ProtectedRoute