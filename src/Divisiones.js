import { Radio, Table, Select, Input, Button } from "antd";
import { Grid, Row, Col } from 'react-flexbox-grid';
import { useEffect, useState } from 'react';
import {  PlusOutlined } from '@ant-design/icons';
const { Search } = Input;


const Divisiones = ({ dataTable, filterCheck }) => {
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const [ filterColumns, setFilterConlumns  ] = useState('all')
    const [ searchColumns, setSearchColumns ] = useState('');    
    const [ copyDataTable, setCopyDataTable ] = useState([]);

    const onSelectChange = (newSelectedRowKeys) => {
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

    const handleChange = (_, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    const filterText = (search , column) => {
        if(search === ''){
            setCopyDataTable(dataTable)
            return
        }

        const filterData = dataTable.filter(obj => {
            const { di_nombre, di_colaborador, di_embajador, di_nivel, ds_nombre, cantidadSubdivision } = obj
            if (column === 'all') 
                return di_nombre.includes(search) || `${di_colaborador}`.includes(search) || di_embajador.includes(search)
                        || `${di_nivel}`.includes(search)  || ds_nombre.includes(search) || `${cantidadSubdivision}`.includes(search)

            return `${obj[column]}`.includes(search)
        })
        
        setCopyDataTable(filterData)

    }

    const onSearch = (value) => {
        filterText(value, filterColumns)
    }

    const handleChangeFilter = (e) => {
        filterText(e.target.value, filterColumns)
        setSearchColumns(e.target.value)
    }

    const handleChangeColumns = (value) => {
        setFilterConlumns(value)
        filterText(searchColumns, value)
    }
    
    useEffect(() => {
        setCopyDataTable(dataTable);
    },[dataTable, filterCheck]);

    const columns = [
        {
            title: 'División',
            dataIndex: 'di_nombre',
            key: 'di_nombre',
            filters: filterCheck.division,
            filterSearch: true,
            filteredValue: filteredInfo.di_nombre || null,
            onFilter: (value, record) => record.di_nombre.includes(value),
            sorter: (a, b) => {
                if (a.di_nombre < b.di_nombre) return -1;
                if (a.di_nombre > b.di_nombre) return 1;
                return 0;
            },
            sortOrder: sortedInfo.columnKey === 'di_nombre' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'División Superior',
            dataIndex: 'ds_nombre',
            key: 'ds_nombre',
            sorter: (a, b) => {
                if (a.ds_nombre < b.ds_nombre) return -1;
                if (a.ds_nombre > b.ds_nombre) return 1;
                return 0;
            },
            sortOrder: sortedInfo.columnKey === 'ds_nombre' ? sortedInfo.order : null,
            filters: filterCheck.divisionSuperior,
            filterSearch: true,
            filteredValue: filteredInfo.ds_nombre || null,
            onFilter: (value, record) => record.ds_nombre.includes(value),
            ellipsis: true,
        },
        {
            title: 'Colaboradores',
            dataIndex: 'di_colaborador',
            key: 'di_colaborador',
            sorter: (a, b) => Number(a.di_colaborador) - Number(b.di_colaborador),
            sortOrder: sortedInfo.columnKey === 'di_colaborador' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Nivel',
            dataIndex: 'di_nivel',
            key: 'di_nivel',
            sorter: (a, b) => Number(a.di_nivel) - Number(b.di_nivel),
            sortOrder: sortedInfo.columnKey === 'di_nivel' ? sortedInfo.order : null,
            filters: filterCheck.nivel,
            filterSearch: true,
            filteredValue: filteredInfo.di_nivel || null,
            onFilter: (value, record) => record.di_nivel === value,
            ellipsis: true
        },
        {
            title: 'SubDivisiones',
            dataIndex: 'cantidadSubdivision',
            key: 'cantidadSubdivision',
            sorter: (a, b) => Number(a.cantidadSubdivision) - Number(b.cantidadSubdivision),
            sortOrder: sortedInfo.columnKey === 'cantidadSubdivision' ? sortedInfo.order : null,
            ellipsis: true,
            render:  (_, record) => {
                return (<div>
                    <span>{record.cantidadSubdivision}</span>
                    <span><Button type="default" size="small" className="btn-expand" icon={<PlusOutlined />} /></span>
                </div>)
            }
        },
        {
            title: 'Embajadores',
            dataIndex: 'di_embajador',
            key: 'di_embajador',
            ellipsis: true,
        },
    ];
  
    return (
        <div>
            <Grid fluid>
                <Row between="xs">
                    <Col>
                        <Radio.Group value='listado' onChange={() => {}} style={{ marginBottom: 16 }}>
                            <Radio.Button value="listado">Listado</Radio.Button>
                            <Radio.Button value="arbol">Arbol</Radio.Button>
                        </Radio.Group>
                    </Col>
                    <Col>
                        <Grid fluid>
                            <Row>
                                <Col>
                                    <Select
                                        defaultValue="all"
                                        style={{ width: 160 }}
                                        onChange={handleChangeColumns}
                                        options={[
                                            { value: 'all', label: 'Columnas'},
                                            { value: 'di_nombre', label: 'División' },
                                            { value: 'ds_nombre', label: 'División Superior' },
                                            { value: 'di_colaborador', label: 'Colaboradores' },
                                            { value: 'cantidadSubdivision', label: 'SubDivisión' },
                                            { value: 'di_embajador', label: 'Embajador' }
                                        ]}
                                    />
                                </Col>
                                <Col>
                                    <Search placeholder="Buscar" onSearch={onSearch} onChange={handleChangeFilter} allowClear />
                                </Col>
                            </Row>
                        </Grid>
                    </Col>
                </Row>
            </Grid>
            <div>
                <Table pagination={{
                            position: ['none', 'bottomRight'],
                        }} 
                        rowSelection={rowSelection} columns={columns} dataSource={copyDataTable} onChange={handleChange} 
                        
                        rowKey={(record) => record.di_nombre}
                />
            </div>
        </div>
    )
}

export default Divisiones;