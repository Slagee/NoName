import { Button } from "antd"
import { Navigate } from "react-router-dom";
import authenticationService from "../../services/authentication/authentication";

export default function Home() {    
    var user = localStorage.getItem('user')

    function logout()  {
        authenticationService.logout();
        return (
            <Navigate to="/login" />
        )
    }

    return (
        <div>
            <h1>
                Hello {user}
            </h1>
            <div>
                <Button onClick={() => logout()}>Logout</Button>
            </div>
        </div>
    )
}