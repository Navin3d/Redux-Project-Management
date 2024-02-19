import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Avatar, Button, List } from 'antd';


const DeveloperList = ({ kind = 'developers' }) => {
    const isAdmin = useSelector(state => state.project.isAdmin);
    const developers = useSelector(state => state.project[kind]);
    // console.log("developers ", developers);
    // console.log("develoepr kind ", kind);

    const ProjectAdminAction = _ => (
        <div hidden={!isAdmin && kind != "requestedDevelopers"}>
            <Button key="list-loadmore-edit">Accept</Button>&nbsp;
            <Button key="list-loadmore-Reject">Reject</Button>&nbsp;
        </div>
    );

    useEffect(_ => {
        console.log(`DeveloperList Refreshed to use kind: ${kind}.`);
    }, [kind]);

    return (
        <List
            itemLayout="horizontal"
            dataSource={developers}
            renderItem={(item) => (
                <List.Item
                    key={item.id}
                    actions={[<a key="list-loadmore-more" href={`/developer/${item.id}`} >Profile</a>, <ProjectAdminAction />]}
                >
                    <List.Item.Meta
                        key={item.id}
                        avatar={<Avatar src={item.profilePicUrl || "https://content.tupaki.com/twdata/2020/0920/news/Rajni-To-Not-Come-Out-For-Shooting-Till-Vaccine-Arrives--1601448273-1492.jpg"} />}
                        title={item.name}
                        description={item.email}
                    />
                </List.Item>
            )}
        />
    );
};

export default DeveloperList;
