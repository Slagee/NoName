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

const onChange = (roleId, record) => {
    /*for(var i = 0; i < 3; i++){
        if(record.userPermissions[i]  && record.userPermissions[i].id <= 3){
            updatedUser.permissionNames.push(record.userPermissions[i].name)
        }
    }
    if(updatedUser.permissionNames.includes(roleName)){
        let index = updatedUser.permissionNames.indexOf(roleName);
        updatedUser.permissionNames.splice(index, 5);
    }
    else updatedUser.permissionNames.push(roleName);*/

    console.log(roleId)
    users.editUser(roleId, record.id).then( (res) => {
        if (res === true) {
            console.log("true", res);
            //window.location.reload();

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
                <Switch size={"small"} disabled={disableOption(record.email)} onClick={() => onChange(1, record)} defaultChecked={checkForRole(record, 1)}/>
            </>
        }
    },
    {
        title: "Mzdový účetní",
        align: "center",
        render: (text, record) => {
            return <>
                <Switch size={"small"} onClick={() => onChange(2, record)} defaultChecked={checkForRole(record, 2)}/>
            </>
        }
    },
    {
        title: "Personalista",
        align: "center",
        render: (text, record) => {
            return <>
                <Switch size={"small"} onClick={() => onChange(3, record)} defaultChecked={checkForRole(record, 3)}/>
            </>
        }
    }
  ];

export { columns };