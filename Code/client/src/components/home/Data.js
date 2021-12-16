import { Button } from "antd";
//import employees from "../../services/employees/employees";

const columns = [
    { title: 'Jméno', dataIndex: 'name', key: 'name', width: 300 },
    { title: 'Rodné číslo', dataIndex: 'birthNumber', key: 'birthNumber', align: 'center' },
    //{ title: 'Středisko', dataIndex: '', key: 'birthNumber', align: 'center' },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: () => <Button type="primary">Zobrazit</Button>,
      align: 'center'
    },
    
  ];
  
  const dataHard = [
    {
      key: 1,
      name: 'Adam Novák',
      dob: '11.08.1974',
      department: '100-RÚT Karviná'
    },
    {
        key: 2,
        name: 'František Dobrák',
        dob: '08.02.1979',
        department: '1033-CHANA Bruntál'
    },
    {
        key: 3,
        name: 'Veronika Kupcová',
        dob: '28.06.1984',
        department: '1071-EFFATHA Krnov'
    },
    {
        key: 4,
        name: 'Ondřej Tlustý',
        dob: '01.04.1980',
        department: '2062-KARMEL Tichá'
    },
    {
      key: 5,
      name: 'Jana Novotná',
      dob: '22.10.1990',
      department: '1017-BENJAMÍN Krnov'
  },
  ];

/*const data = employees.getEmployeesPaged()
  .then((res) => {
  var employees = {data: []};

  for(var i in res.content) {    
    var item = res.content[i];   
    employees.data.push({ 
      "name" : item.name + " " + item.surname,
      "birthNumber" : item.birthNumber
    });
  }
  return employees.data;
});*/

export { dataHard, columns };