import { Checkbox, List, Switch, message } from "antd";
import users from "../../services/users/users";

const yourEmail = localStorage.getItem("username")

const disableOption = (recordEmail) => {
    if (yourEmail === recordEmail) return true;
    else return false;
}

const checkForRole = (record, roleId) => {
    for(var i = 0; i < 3; i++){
        if(record.userPermissions[i]){
            if(record.userPermissions[i].id==roleId){
                return true;
            }
        }
    }
    return false;
}

const onChange = (roleName, record) => {
    let updatedUser = {"permissionNames":[]}
    
    for(var i = 0; i < 3; i++){
        if(record.userPermissions[i]  && record.userPermissions[i].id <= 3){
            updatedUser.permissionNames.push(record.userPermissions[i].name)
        }
    }
    if(updatedUser.permissionNames.includes(roleName)){
        let index = updatedUser.permissionNames.indexOf(roleName);
        updatedUser.permissionNames.splice(index, 5);
    }
    else updatedUser.permissionNames.push(roleName);

    console.log(updatedUser.permissionNames)
    users.editUser(updatedUser, record.id).then( (res) => {
        if (res === true) {
            console.log("true", res);
            window.location.reload();

        } else {
          message.error(res);
        }
      });
    }

const columns = [
    {
        title: "E-mail",
        dataIndex: "email",
        width: 350,
    },
    {
        title: "Administrátor",
        align: "center",
        render: (text, record) => {
            return <>
                <Switch disabled={disableOption(record.email)} onClick={() => onChange("ROLE_ADMIN", record)} defaultChecked={checkForRole(record, 1)}></Switch>
            </>
        }
    },
    {
        title: "Mzdový účetní",
        align: "center",
        render: (text, record) => {
            return <>
                <Switch onClick={() => onChange("ROLE_ACCOUNTANT", record)} defaultChecked={checkForRole(record, 2)}></Switch>
            </>
        }
    },
    {
        title: "Personalista",
        align: "center",
        render: (text, record) => {
            return <>
                <Switch onClick={() => onChange("ROLE_HR", record)} defaultChecked={checkForRole(record, 3)}></Switch>
            </>
        }
    }
  ];

export { columns };