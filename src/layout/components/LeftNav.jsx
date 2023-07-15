import React, { useEffect, useState } from 'react'
import {
  HomeOutlined,
	TableOutlined,
	PieChartOutlined,
	FileTextOutlined,
	AreaChartOutlined,
	FundOutlined,
	ShoppingOutlined,
	AppstoreOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;
// 模拟数组结构
const menuList = [
  {
    label: "首页",
    key: "/home",
    icon: <HomeOutlined />
  },
  {
    label: "legoseq",
    key: "/legoseq",
    icon: <AreaChartOutlined />
  },
  {
    label: "legoseq2",
    key: "/legoseq2",
    icon: <AreaChartOutlined />
  },
  {
    label: "嵌套测试",
    key: "/proTable",
    icon: <TableOutlined />,
    children: [
      {
        label: "使用Tabble",
        key: "/legoseq1",
        icon: <AppstoreOutlined />
      },
      {
        label: "使用TabblePage",
        key: "/legoseq2",
        icon: <AppstoreOutlined />
      }
    ]
  },
  

  
]
const rootSubmenuKeys = menuList.map(item => item.key)

export default function LeftNav(props) {
  const Location = useLocation()
  const navigate = useNavigate()
  const whd = (e) => {
    navigate(e.key)
  }
  const [openKeys, setOpenKeys] = useState(['/home']);
  const [selectedKeys, setselectedKeys] = useState([Location.pathname])
  const onOpenChange = (Keys) => {
    const latestOpenKey = Keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(Keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  }
  useEffect(() => {
    setselectedKeys([Location.pathname])
  }, [Location.pathname])
  return (
    <Sider trigger={null} collapsible collapsed={props.zdstate}>
      <div className="logo"><i></i><span style={{ 'display': props.zdstate ? 'none' : '' }}>LegoSeq</span></div>
      <Menu
        theme="dark" 
        mode="inline"
        defaultSelectedKeys={[Location.pathname]}
        items={menuList}
        onClick={whd}
        onOpenChange={onOpenChange}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
      />
    </Sider>
  )
}
