"use client";
import React from "react";
import { OrderedListOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
const { Header, Content, Footer, Sider } = Layout;
import Link from "next/link";
const items = [OrderedListOutlined].map((icon, index) => ({
  key: "affiliate",
  icon: React.createElement(icon),
  label: <Link href={"/admin/affiliate"}>Affiliate</Link>,
}));
const App = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <AntdRegistry>
      <Layout style={{ height: "100vh" }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="demo-logo-vertical" />
          <Menu theme="dark" mode="inline" items={items} />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          />
          <Content
            style={{
              margin: "24px 16px 0",
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {children}
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          ></Footer>
        </Layout>
      </Layout>
    </AntdRegistry>
  );
};
export default App;
