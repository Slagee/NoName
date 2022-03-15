import { message } from 'antd';

class AuthService {
    async login(credentials) {
        return fetch(process.env.REACT_APP_API + "login",
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

    async register(credentials) {
        return fetch(process.env.REACT_APP_API + "user/registration",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(credentials)
        })
        .then((res) => {
            if (res.ok) {
                message.success("Registrace úspěšná");
                return res.text()
            }
            else {
                message.error("Něco se nepovedlo, uživatel s tímto e-mailem už pravděpodobně existuje");
                console.log(JSON.stringify(credentials))
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