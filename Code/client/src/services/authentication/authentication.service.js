import axios from "axios";

class AuthService {
    login(username, password) {
        let axiosConfig = {
            headers: {
                'Content-Type':'application/json',
                'Access-Control-Request-Headers': 'Authorization'
            },
            
        }
        console.log(username)
        return axios
            .post(process.env.REACT_APP_API_URL + '/login', {
                username,
                password
            },
            axiosConfig,
            {withCredentials: true})
            .then(response => {
                console.log(response.data);
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            })
        
    }

    logout() {
        localStorage.removeItem('user');
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();