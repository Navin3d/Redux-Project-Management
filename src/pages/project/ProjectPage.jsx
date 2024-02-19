import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { notification, Tabs } from "antd";
import { BugOutlined, FieldTimeOutlined, MailOutlined } from "@ant-design/icons";
import { fetchProject } from "../../services/project-service";
import SideNavLayout from "../../layouts/SideNavLayout";
import ProjectHeader from "../../components/project/ProjectHeader";
import { useDispatch, useSelector } from "react-redux";
import { init, setFilter } from "../../redux/project-slice";
import { userProjectFilter } from "../../services/filters/project-filter";
import TaskList from "../../components/task/TaskList";
import DeveloperList from "../../components/developer/DeveloperList";
import { PROJECTS } from "../../data";


const Content = _ => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.id);
    const [notice, contextHolder] = notification.useNotification();

    const initPoject = (projectId) => {
        fetchProject(projectId)
            .then(res => {
                let projectData = res.data["data"];
                var filter = userProjectFilter(userId, projectData);
                projectData.isAdmin = filter.isAdmin;
                projectData.isDeveloper = filter.isDeveloper;
                projectData.hasRequested = filter.hasRequested;
                dispatch(init(projectData));
                // console.log("filter ", filter);
            })
            .catch(e => {
                let filter = userProjectFilter(userId, PROJECTS[0]);
                dispatch(setFilter(filter));
                console.log("filter ", filter);
                notice.warning({
                    message: "Showing Dummy Datas",
                    description: "Error fetching data from backend showing dummy datas.",
                    placement: 'topRight',
                });
            });
    }

    const tabItems = [
        {
            key: "1",
            label: "Developers",
            children: <DeveloperList />,
            icon: <BugOutlined />
        },
        {
            key: "2",
            label: "Tasks",
            children: <TaskList kind={"project"} />,
            icon: <MailOutlined />
        },
        {
            key: "3",
            label: "Requests",
            children: <DeveloperList kind="requestedDevelopers" />,
            icon: <FieldTimeOutlined />
        },
    ];

    useEffect(() => {
        initPoject(id);
    }, []);

    return (
        <div>
            {contextHolder}
            <div className="course-header">
                <ProjectHeader />
            </div>
            <Tabs
                defaultActiveKey="1"
                items={tabItems}
            />
        </div>
    );
}

const ProjectPage = _ => {
    const { id } = useParams();
    return (
        <SideNavLayout element={<Content />} breadcrumb={[{ title: "Projects" }, { title: "Project" }, { title: id }]} />
    );
}

export default ProjectPage;