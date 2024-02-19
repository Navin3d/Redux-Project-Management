import { Button, Descriptions } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import { TrophyFilled, ClockCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { toggleProject, requestJoinProject } from '../../services/project-service';
import { projectStatus, requestJoin } from '../../redux/project-slice';


const ProjectHeader = () => {

    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.id);
    const project = useSelector(state => state.project);
    const { id, status, title, description, developers, createdAt, createdBy, tasks, requestedDevelopers, hasRequested, isAdmin, isDeveloper } = project;

    return (
        <PageHeader
            className="site-page-header-responsive"
            onBack={() => window.history.back()}
            title={title}
            subTitle={description}
            extra={[
                <Button disabled={hasRequested} onClick={() => {
                    requestJoinProject(id, userId).then(e => dispatch(requestJoin(!hasRequested))).catch(e => console.log(e));
                }} hidden={isAdmin || isDeveloper || !status} key="1" style={{ backgroundColor: "grey", color: "white" }} >
                    <ClockCircleOutlined /> {hasRequested && status ? "Already Requested" : "Request Join"}
                </Button>,
                <Button key="3" onClick={() => { isAdmin && toggleProject(id, !status).then(_ => dispatch(projectStatus(!status))).catch(e => dispatch(projectStatus(!status))) }} style={{ backgroundColor: "green", color: "white" }} >
                    <TrophyFilled /> {status ? "Active" : "In-Active"}
                </Button>,
            ]}
        >
            <Descriptions size="default" column={2}>
                <Descriptions.Item label="Developers Working">
                    <a>{developers.length}</a>
                </Descriptions.Item>
                <Descriptions.Item label="Developers Requested">
                    <a>{requestedDevelopers.length}</a>
                </Descriptions.Item>
                <Descriptions.Item label="Tasks Count">
                    <a>{tasks.length}</a>
                </Descriptions.Item>
                <Descriptions.Item label="Start Date">
                    <a>{createdAt.split("T")[0]}</a>
                </Descriptions.Item>
                <Descriptions.Item label="Project Owner">
                    <a href={`/developer/${createdBy["id"]}`}>{createdBy["name"]}</a>
                </Descriptions.Item>
                <Descriptions.Item label="Owner Profile">
                    <a href={createdBy["linkedInProfile"]}>Linked IN</a>
                </Descriptions.Item>
            </Descriptions>
        </PageHeader>
    );

}

export default ProjectHeader;
