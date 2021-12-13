import { message } from 'antd';

class AuthService {
    async login(credentials) {
        return fetch("login",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify(credentials)
        })
        .then((res) => {
            if (res.ok) {
                message.success("Přihlášení úspěšné!");
                return res.text()
            }
            else {
                message.error("Zadali jste špatné přihlašovací údaje!");
                return ""
            }
        })
        .catch((err) => {
            console.log(err)
        });
    }

    logout() {
        localStorage.removeItem("username");
        localStorage.removeItem('token');
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();