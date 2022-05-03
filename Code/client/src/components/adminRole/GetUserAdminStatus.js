import { useState, useEffect } from 'react'
import users from "../../services/users/users";

export function GetUserAdminStatus() {
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            if(localStorage.getItem('username')){
                const response = await users.getOneUserByMail(localStorage.getItem('username'));
                if (response) {
                    let userInfo = JSON.stringify(response);
                    if(userInfo.includes("ROLE_ADMIN")) {
                        setData(true);
                    }
                    else {
                        setData(false);
                    }
                }
            }
            else return false;
        })();
    }, );

    return data;
}