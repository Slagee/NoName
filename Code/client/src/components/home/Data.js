import { Button } from "antd";


function goEmployeeDetail(id) {
  window.location.href = "/employeeDetail/"+id;
}

const columns = [
    { title: 'Jméno', dataIndex: 'name', key: 'name'},
    { title: 'Příjmení', dataIndex: 'surname', key: 'surname'},
    { title: 'Rodné číslo', dataIndex: 'birthNumber', key:'birthNumber', align: 'center' },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: (text, record) => <Button type="primary" onClick={()=>goEmployeeDetail(record.id)}>Zobrazit</Button>, // Na onClick spravne funguji jen funkce ve tvaru ()=>
      align: 'center'
    },
    
  ];

export { columns };