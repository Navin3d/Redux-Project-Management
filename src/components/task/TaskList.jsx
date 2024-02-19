import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, List, Modal } from 'antd';
import { init } from "../../redux/project-slice";
import { toggleTaskStatus } from "../../services/task-service";
import { fetchProject } from "../../services/project-service";

const TaskList = ({ kind = 'auth', status = "all" }) => {
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const project = useSelector(state => state.project);
    const userId = useSelector(state => state.auth.id);
    const isAdmin = useSelector(state => state.project.isAdmin);
    const isDeveloper = useSelector(state => state.project.isDeveloper);
    let tasks = useSelector(state => state[kind].tasks);

    console.log("tasks ", tasks);
    console.log("project ", project);
    console.log("kind ", kind);
    console.log("status ", status);
    // console.log("isAdmin ", isAdmin);
    // console.log("isDeveloper ", isDeveloper);

    const onlyAssignedDeveloperOrAdmin = task => {
        if (userId == task.assignedTo || isAdmin)
            return (
                <div>
                    <Button onClick={() => {
                        toggleTaskStatus(task.id, !task.status);
                        if (kind == "project") {
                            // const project = fetchProject(task.projectId);
                            // project
                            //     .then(res => {
                            //         dispatch(init(res.data["data"]));
                            //     })
                            //     .catch(e => console.log(e));
                        }
                    }} key="list-loadmore-more">{task.status ? "Close" : "Open"}</Button>&nbsp;
                </div>
            );
    }

    useEffect(_ => {
        if(status == "completed") {
            tasks = tasks.filter(task => !task.status);
        }
        if(status == "pending") {
            tasks = tasks.filter(task => task.status);
        }
    }, [kind, status]);

    const showModal = (id) => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <List
                itemLayout="horizontal"
                dataSource={tasks}
                renderItem={(item) => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <Button disabled={!isAdmin || !isDeveloper} onClick={() => showModal(item.id)} key="list-loadmore-edit">comment</Button>,
                            onlyAssignedDeveloperOrAdmin(item)
                        ]}
                    >
                        <List.Item.Meta
                            key={item.id}
                            avatar={<Avatar src={"https://avatars.githubusercontent.com/u/71096790?v=4"} />}
                            title={item.title}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <input placeholder="Comment" name="comment" value="" />
            </Modal>
        </div>
    );
};

export default TaskList;
