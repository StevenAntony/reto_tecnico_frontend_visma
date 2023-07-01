import React, { useEffect, useState } from 'react';

import mandu from './mandu.svg';
import avatar from './avatar.svg';
import './App.css';
import { Tabs, Layout, Menu, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase,faCircleQuestion, faBell, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Divisiones from './components/Divisiones';
import {listarDivision} from './service/apiService';
import ButtonIcon from './components/ButtonIcon'

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
        <Grid fluid className='w-100'>
          <Row middle="xs">
            <Col lg={1} md={2} className='content-logo'>
              <div className="demo-logo">
                <img src={mandu} alt='Logo' />
              </div>
            </Col>
            <Col lg={5} md={4} xs={12}>
              <Menu
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
            </Col>
            <Col lg={6} md={6} xs={0}>
              <div className='option-right'>
                <Grid fluid>
                  <Row end="xs" middle="xs">
                    <Col >          
                      <ButtonIcon ><FontAwesomeIcon icon={faBriefcase} color='#fff' /></ButtonIcon>
                    </Col>
                    <Col >          
                      <ButtonIcon ><FontAwesomeIcon icon={faCircleQuestion} color='#fff' /></ButtonIcon>
                    </Col>
                    <Col >          
                      <ButtonIcon number={3} > <FontAwesomeIcon icon={faBell} color='#fff' /> </ButtonIcon>
                    </Col>
                    <Col className='avatar-user'>
                      <div className='section-avatar'>
                        <img src={avatar} alt='avatar' />
                        <p>Administrador</p>
                        <FontAwesomeIcon icon={faAngleDown} color='#fff' />
                      </div>
                    </Col>
                    <Col className='logo-right'>
                      <span><img src={mandu}  alt='Logo' /></span>
                    </Col>
                  </Row>
                </Grid>
              </div>
            </Col>
          </Row>
        </Grid>
      </Header>
      <Content className='content-app' style={{ padding: '0 50px' }}>
        <Grid fluid>
            <Row between="xs" middle="xs">
              <Col lg={3} md={6} xs={6}>
                <p className='title-content'>Organización</p>
              </Col>
              <Col lg={3} md={6} xs={6}>
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
    </Layout>
  );
}

export default App;
