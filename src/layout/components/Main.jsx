import React from 'react'
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom'


const { Content } = Layout;
export default function Main() {
  return (
    <Content
    // style={contentStyle}
      className="site-layout-background"
      style={{
        margin: '15px',
        padding: 15,
        minHeight: 280,
        overflowY: 'auto'
      }}
    >
      <Outlet />
    </Content>
  )
}
