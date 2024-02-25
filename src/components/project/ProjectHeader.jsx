import { Button, Descriptions } from 'antd';
import { Link } from 'react-router-dom';
import { PageHeader } from '@ant-design/pro-layout';
import { TrophyFilled, ClockCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { toggleProject, requestJoinProject } from '../../services/project-service';
import { projectStatus, requestJoin } from '../../redux/project-slice';
import { getProfile } from '../../services/auth-service';
import { setProfile } from '../../redux/profile-slice';
import { DEVELOPER } from '../../data';


const ProjectHeader = () => {

    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.id);
    const project = useSelector(state => state.project);
    const { id, status, tittle, description, developers, createdAt, createdBy, tasks, requestedDevelopers, hasRequested, isAdmin, isDeveloper } = project;

    const openProfile = id => {
        getProfile(id)
            .then(res => {
                dispatch(setProfile(res.data?.data?.developer))
            })
            .catch(e => {
                console.log(e);
                dispatch(setProfile(DEVELOPER))
            });
    }

    const handleToggleProject = _ => {
        isAdmin &&
            toggleProject(id, !status).then(_ => dispatch(projectStatus(!status))).catch(e => dispatch(projectStatus(!status)));
    }

    const handleRequestJoin = _ => {
        requestJoinProject(id, userId).then(res => {
            dispatch(requestJoin(!hasRequested));
        }).catch(e => console.log(e));
    }

    return (
        <PageHeader
            className="site-page-header-responsive"
            onBack={() => window.history.back()}
            title={tittle}
            extra={[
                <Button disabled={hasRequested} onClick={() => { handleRequestJoin(); }} hidden={isAdmin || isDeveloper || !status} key="1" style={{ backgroundColor: "grey", color: "white" }} >
                    <ClockCircleOutlined /> {hasRequested && status ? "Already Requested" : "Request Join"}
                </Button>,
                <Button key="3" onClick={() => { handleToggleProject() }} style={{ backgroundColor: "green", color: "white" }} >
                    <TrophyFilled /> {status ? "Active" : "In-Active"}
                </Button>,
            ]}
        >
            <Descriptions size="default" column={2}>
                <Descriptions.Item label="Developers Working">
                    <Link>{developers.length}</Link>
                </Descriptions.Item>
                <Descriptions.Item label="Developers Requested">
                    <Link>{requestedDevelopers.length}</Link>
                </Descriptions.Item>
                <Descriptions.Item label="Tasks Count">
                    <Link>{tasks.length}</Link>
                </Descriptions.Item>
                <Descriptions.Item label="Start Date">
                    <Link>{createdAt.split("T")[0]}</Link>
                </Descriptions.Item>
                <Descriptions.Item label="Project Owner">
                    <Link onClick={() => { openProfile(createdBy["id"]) }}>{createdBy?.name}</Link>
                </Descriptions.Item>
                <Descriptions.Item label="Owner Profile">
                    <Link target="_blank" to={createdBy?.linkedInProfile}>Linked IN</Link>
                </Descriptions.Item>
            </Descriptions>
        </PageHeader>
    );

}

export default ProjectHeader;
