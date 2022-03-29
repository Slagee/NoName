import { Button } from "antd";


function goEmployeeDetail(id) {
  window.location.href = "/employeeDetail/"+id;
}

const columns = [
    { title: 'Jméno', dataIndex: 'name'},
    { title: 'Příjmení', dataIndex: 'surname'},
    { title: 'Rodné číslo', dataIndex: 'birthNumber', align: 'center' },
    {
      title: '',
      dataIndex: '',
      render: (text, record) => <Button type="primary" onClick={()=>goEmployeeDetail(record.id)}>Zobrazit</Button>, // Na onClick spravne funguji jen funkce ve tvaru ()=>
      align: 'center'
    },
    
  ];

export { columns };