import { Button } from "antd";
//import employees from "../../services/employees/employees";


function goEmployeeDetail(id) {
  window.location.href = "/employeeDetail"
}

const columns = [
    { title: 'Jméno', dataIndex: 'name', key: 'name'},
    { title: 'Příjmení', dataIndex: 'surname', key: 'surname'},
    { title: 'Rodné číslo', dataIndex: 'birthNumber', key:'birthNumber', align: 'center' },
    //{ title: 'Středisko', dataIndex: '', key: 'birthNumber', align: 'center' },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: (text, record) => <Button type="primary" onClick={goEmployeeDetail(record.id)}>Zobrazit</Button>,
      align: 'center'
    },
    
  ];

export { columns };