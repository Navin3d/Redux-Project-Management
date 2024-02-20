import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Col, Divider, Drawer, List, Row } from 'antd';
import { toggleProfile } from "../../redux/profile-slice";


const Profile = _ => {

    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile);
    const onClose = () => {
        dispatch(toggleProfile());
    };

    const DescriptionItem = ({ title, content }) => (
        <div className="site-description-item-profile-wrapper">,
            <p className="site-description-item-profile-p-label">{title}:</p>
            {content}
        </div>
    );

    return (
        <Drawer width={640} placement="right" closable={false} onClose={onClose} open={profile.showProfile}>
            <p
                className="site-description-item-profile-p"
                style={{
                    marginBottom: 24,
                }}
            >
                User Profile
            </p>
            <p className="site-description-item-profile-p">Personal</p>
            <Row>
                <Col span={12}>
                    <DescriptionItem title="Full Name" content={profile.name} />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="Account" content={profile.email} />
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <DescriptionItem title="City" content="Chennai" />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="Country" content="India" />
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <DescriptionItem title="Birthday" content="September 9,2002" />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="Website" content="-" />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <DescriptionItem
                        title="Message"
                        content="Make things as simple as possible but no simpler."
                    />
                </Col>
            </Row>
            <Divider />
            <p className="site-description-item-profile-p">Company</p>
            <Row>
                <Col span={12}>
                    <DescriptionItem title="Position" content="Programmer" />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="Responsibilities" content="Coding" />
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <DescriptionItem title="Department" content="Finance and Marketting" />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="Supervisor" content={<a>Manoj Kumar</a>} />
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <DescriptionItem title="Working Project" content={profile.backlogProjectCount} />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="Backlog Tasks" content={profile.backlogTaskCount} />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <DescriptionItem
                        title="Skills"
                        content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
                    />
                </Col>
            </Row>
            <Divider />
            <p className="site-description-item-profile-p">Working Projects</p>
            <Row>
                {profile.projects.map(project => (
                    <Col span={6}>
                        <a target="_blank" href={`/project/${project.id}`}>{project.tittle}</a>
                    </Col>
                ))}
            </Row>
            <Divider />
            <p className="site-description-item-profile-p">Created Projects</p>
            <Row>
                {profile.createdProjects.map(project => (
                    <Col span={6}>
                        <a target="_blank" href={`/project/${project.id}`}>{project.tittle}</a>
                    </Col>
                ))}
            </Row>
            <Divider />
            <p className="site-description-item-profile-p">Contacts</p>
            <Row>
                <Col span={12}>
                    <DescriptionItem title="Email" content={profile.email} />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="Phone Number" content="+91 944 2807 217" />
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <DescriptionItem
                        title="Github"
                        content={
                            <a href={profile.githubProfile}>
                                {profile.githubProfile}
                            </a>
                        }
                    />
                </Col>
                <Col span={12}>
                    <DescriptionItem
                        title="Linked IN"
                        content={
                            <a href={profile.linkedInProfile}>
                                {profile.linkedInProfile}
                            </a>
                        }
                    />
                </Col>
            </Row>
        </Drawer>
    );
}

export default Profile;
