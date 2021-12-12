import { Button } from "antd";

const columns = [
    { title: 'Jméno', dataIndex: 'name', key: 'name', width: 300 },
    { title: 'Datum narození', dataIndex: 'dob', key: 'dob', align: 'center' },
    { title: 'Středisko', dataIndex: 'department', key: 'department', align: 'center' },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: () => <Button type="primary">Zobrazit</Button>,
      align: 'center'
    },
    
  ];
  
  const data = [
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

  export { data, columns };