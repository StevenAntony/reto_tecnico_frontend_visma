import { Radio, Button, Space, Table } from "antd";
import { useState } from 'react';
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];

const Divisiones = () => {
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
      };
    
    const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        Table.SELECTION_NONE,
        {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
                return false;
            }
            return true;
            });
            setSelectedRowKeys(newSelectedRowKeys);
        },
        },
        {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
                return true;
            }
            return false;
            });
            setSelectedRowKeys(newSelectedRowKeys);
        },
        },
    ],
    };

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    const columns = [
        {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        filters: [
            {
            text: 'Joe',
            value: 'Joe',
            },
            {
            text: 'Jim',
            value: 'Jim',
            },
        ],
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
        ellipsis: true,
        },
        {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) => a.age - b.age,
        sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
        ellipsis: true,
        },
        {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        filters: [
            {
            text: 'London',
            value: 'London',
            },
            {
            text: 'New York',
            value: 'New York',
            },
        ],
        filteredValue: filteredInfo.address || null,
        onFilter: (value, record) => record.address.includes(value),
        sorter: (a, b) => a.address.length - b.address.length,
        sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
        ellipsis: true,
        },
    ];
  
    return (
        <div>
            <Radio.Group value='listado' onChange={() => {}} style={{ marginBottom: 16 }}>
                <Radio.Button value="listado">Listado</Radio.Button>
                <Radio.Button value="arbol">Arbol</Radio.Button>
            </Radio.Group>
            <div>
                <Table pagination={{
          position: ['none', 'bottomRight'],
        }} rowSelection={rowSelection} columns={columns} dataSource={data} onChange={handleChange} />
            </div>
        </div>
    )
}

export default Divisiones;