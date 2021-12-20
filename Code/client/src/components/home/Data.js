import { Button } from "antd";
//import employees from "../../services/employees/employees";

const columns = [
    { title: 'Jméno', dataIndex: 'name', key: 'name'},
    { title: 'Příjmení', dataIndex: 'surname', key: 'surname'},
    { title: 'Rodné číslo', dataIndex: 'birthNumber', key:'birthNumber', align: 'center' },
    //{ title: 'Středisko', dataIndex: '', key: 'birthNumber', align: 'center' },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: () => <Button type="primary">Zobrazit</Button>,
      align: 'center'
    },
    
  ];

export { columns };