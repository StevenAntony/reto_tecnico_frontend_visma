import React, { useEffect, useState } from 'react';

import mandu from './mandu.svg';
import avatar from './avatar.svg';
import './App.less';
import { Tabs, Layout, Menu, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase,faCircleQuestion, faBell, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Divisiones from './Divisiones';
import {listarDivision} from './service/apiService';

const { Header, Content } = Layout;

const menuApp = ['Dashboard', 'Organización', 'Modelos', 'Seguimiento']

function App() {
  const [ isDivisiones, setDivisiones ] = useState([]);
  const [ isFilterCheck, setFilterCheck ] = useState({
    division: [],
    divisionSuperior: [],
    nivel: [],
  });

  const listar = async () => {
    const service = await listarDivision();
    setDivisiones(service);

    let di_nombres = [], ds_nombres = [], di_niveles = [];
    service.forEach(element => {
      di_nombres.push(element.di_nombre);
      ds_nombres.push(element.ds_nombre);
      di_niveles.push(element.di_nivel);
    });
    

    const nameDivision = [...new Set(di_nombres)];
    const nameDivisionSuperior = [...new Set(ds_nombres)];
    const nameNiveles = [...new Set(di_niveles)];
    
    const filtersNombre = nameDivision.map(element => ({ text: element, value: element }));
    const filtersNombreSuperior = nameDivisionSuperior.map(element => ({ text: element, value: element }));
    const filtersNombreNivel = nameNiveles.map(element => ({ text: element, value: element }));

    setFilterCheck({
      division: filtersNombre,
      divisionSuperior: filtersNombreSuperior,
      nivel: filtersNombreNivel
    });
  }

  useEffect(() => {
    listar();
  },[])

  return (
    <Layout className="layout">
      <Header className='header-app' style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo">
          <img src={mandu} alt='Logo' />
        </div>
        <Menu
          // theme=""
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={menuApp.map((element, index) => {
            const key = index + 1;
            return {
              key,
              label: `${element}`,
            };
          })}
        />
        <div className='option-right'>
          <Grid fluid>
            <Row end="xs" middle="xs">
              <Col >          
                <FontAwesomeIcon icon={faBriefcase} color='#fff' />
              </Col>
              <Col >          
                <FontAwesomeIcon icon={faCircleQuestion} color='#fff' />
              </Col>
              <Col >          
                <FontAwesomeIcon icon={faBell} color='#fff' />
              </Col>
              <Col >
                <div className='section-avatar'>
                  <img src={avatar} alt='avatar' />
                  <p>Administrador</p>
                  <FontAwesomeIcon icon={faAngleDown} color='#fff' />
                </div>
              </Col>
              <Col className='logo-right'>
                <img src={mandu}  alt='Logo' />
              </Col>
            </Row>
          </Grid>
        </div>
      </Header>
      <Content className='content-app' style={{ padding: '0 50px' }}>
        <Grid fluid>
            <Row between="xs" middle="xs">
              <Col xs={3}>
                <p className='title-content'>Organización</p>
              </Col>
              <Col xs={3}>
                <div className='d-flex group-button-gap'>
                  <Button type="primary" icon={<PlusOutlined />} size='large' />
                  <Button type="default" icon={<DownloadOutlined />} size='large' />
                  <Button type="default" icon={<DownloadOutlined />} size='large' />
                </div>
              </Col>
            </Row>
        </Grid>
        <div>
          <Tabs defaultActiveKey="1" items={[
            {
              key:1,
              label:'Divisiones',
              children:<Divisiones dataTable={isDivisiones} filterCheck={isFilterCheck} />
            },
            {
              key:2,
              label:'Colaboradores',
              children:'colaboradores'
            }
          ]} onChange={() => {}} />
        </div>
      </Content>
      {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer> */}
    </Layout>
  );
}

export default App;
