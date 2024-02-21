import { useState, useEffect, createElement } from "react";
import { Avatar, List, Space } from 'antd';
import { useSelector } from "react-redux";
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { PROJECTS } from "../../data";
import { fetchProjects } from "../../services/project-service";

const ProjectList = ({ kind = "all" }) => {

    const [projects, setProjects] = useState(PROJECTS);
    const projectsFromState = useSelector(state => state.auth[kind]);

    const initProjects = _ => {
        if (kind == "all") {
            fetchProjects()
                .then(res => {
                    setProjects(prev => res.data?.data?.projects);
                    setProjects(_ => PROJECTS);
                }).catch(e => {
                    console.log(e);
                    setProjects(_ => PROJECTS);
                });
        } 
        else {
            setProjects(projectsFromState);
        }
    }

    useEffect(() => {
        initProjects();
    }, [kind]);

    const IconText = ({ icon, text }) => (
        <Space>
            {createElement(icon)}
            {text}
        </Space>
    );

    return (
        <List
            itemLayout="vertical"
            size="large"
            style={{
                marginBottom: "5%"
            }}
            pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 3,
            }}
            dataSource={projects}
            renderItem={(item) => (
                <List.Item
                    key={item.id}
                    actions={[
                        <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                        <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                        <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                    ]}
                    extra={
                        <img
                            width={272}
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                    }
                >
                    <List.Item.Meta
                        avatar={<Avatar src={item.icon} />}
                        title={<a href={`/project/${item.id}`}>{item.tittle}</a>}
                        description={item.description}
                    />
                    {item.content}
                </List.Item>
            )}
        />
    );
};

export default ProjectList;
