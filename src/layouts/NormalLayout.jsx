import { Breadcrumb, Layout, Menu, theme } from 'antd';
import HeaderComponent from '../components/base/HeaderComponent';
import FooterComponent from '../components/base/Footer';
const { Content } = Layout;

const NormalLayout = ({ element, breadcrumb = [{ title: "/" }] }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
            <HeaderComponent />
            <Content
                style={{
                    padding: '0 48px',
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                    items={breadcrumb}
                />
                <Layout
                    style={{
                        padding: '24px 0',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Content
                        style={{
                            padding: '0 24px',
                            minHeight: 280,
                        }}
                    >
                        {element}
                    </Content>
                </Layout>
            </Content>
            <FooterComponent />
        </Layout>
    );
};
export default NormalLayout;