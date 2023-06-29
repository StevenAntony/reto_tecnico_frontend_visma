import React from 'react';

import mandu from './mandu.svg';
import avatar from './avatar.svg';
import './App.less';
import { Tabs, Layout, Menu, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase,faCircleQuestion, faBell, faAngleDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DownloadOutlined } from '@ant-design/icons';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Divisiones from './Divisiones';

const { Header, Content, Footer } = Layout;

const menuApp = ['Dashboard', 'Organización', 'Modelos', 'Seguimiento']

function App() {

  return (
    <Layout className="layout">
      <Header className='header-app' style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo">
          <img src={mandu} />
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
                  <img src={avatar} />
                  <p>Administrador</p>
                  <FontAwesomeIcon icon={faAngleDown} color='#fff' />
                </div>
              </Col>
              <Col className='logo-right'>
                <img src={mandu} />
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
                <div className='d-flex'>
                  <Button type="primary" icon={<DownloadOutlined />} size='large' />
          
                </div>
              </Col>
            </Row>
        </Grid>
        <div>
          <Tabs defaultActiveKey="1" items={[
            {
              key:1,
              label:'Divisiones',
              children:<Divisiones />
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
