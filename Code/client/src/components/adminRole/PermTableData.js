import { Checkbox } from "antd";

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
            for(var i = 0; i < 3; i++){
                if(record.userPermissions[i]){
                    if(record.userPermissions[i].id==1){
                        return <Checkbox defaultChecked></Checkbox>
                    }
                }
            }
            return <Checkbox></Checkbox>
        }
    },
    {
        title: "Mzdový účetní",
        align: "center",
        render: (text, record) => {
            for(var i = 0; i < 3; i++){
                if(record.userPermissions[i]){
                    if(record.userPermissions[i].id==2){
                        return <Checkbox defaultChecked></Checkbox>
                    }
                }
            }
            return <Checkbox></Checkbox>
        }
    },
    {
        title: "Personalista",
        align: "center",
        render: (text, record) => {
            for(var i = 0; i < 3; i++){
                if(record.userPermissions[i]){
                    if(record.userPermissions[i].id==3){
                        return <Checkbox defaultChecked></Checkbox>
                    }
                }
            }
            return <Checkbox></Checkbox>
        }
    }
  ];

export { columns };