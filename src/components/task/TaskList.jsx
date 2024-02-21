import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Button, List, Modal, Input } from 'antd';
import { commentTask, toggleTaskStatus } from "../../services/task-service";
import { toggleTask } from '../../redux/auth-slice';

const TaskList = ({ kind = 'auth', status = "all" }) => {

    const [taskId, setTaskId] = useState("");
    const [comment, setComment] = useState("");
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.id);
    const isAdmin = useSelector(state => state.project.isAdmin);
    const isDeveloper = useSelector(state => state.project.isDeveloper);
    const allUserTasks = useSelector(state => state[kind].tasks);

    const handleToggleTask = task => {
        let restTasks = allUserTasks.filter(userTask => task.id != userTask.id);
        dispatch(toggleTask({ taskId: task["id"], status: !task.status }));
        setTasks(prev => restTasks);
        toggleTaskStatus(task.id, !task.status).catch(e => console.log(e));
    }

    const onlyAssignedDeveloperOrAdmin = task => {
        if (userId == task.assignedTo || isAdmin)
            return (
                <div>
                    <Button onClick={() => { handleToggleTask(task) }} key="list-loadmore-more">{task.status ? "Close" : "Open"}</Button>&nbsp;
                </div>
            );
    }

    const initTasks = _ => {
        if (status == "completed") {
            setTasks(prev => allUserTasks.filter(task => task.status == false));
        }
        if (status == "pending") {
            setTasks(prev =>  allUserTasks.filter(task => task.status == true));
        }
        if (status == "all") {
            setTasks(allUserTasks);
        }
    }

    useEffect(_ => {
        initTasks();
    }, [kind, status]);

    const showModal = (id) => {
        setIsModalOpen(true);
        setTaskId(id);
    };
    const handleOk = () => {
        if (comment.trim().length > 0)
            commentTask(taskId, comment)
                .then(res => {
                    setTaskId("");
                    setComment("");
                    setIsModalOpen(false);
                })
                .catch(e => {
                    console.log(e);
                });
        setTaskId("");
        setComment("");
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setTaskId("");
        setComment("");
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
                            <Button disabled={!isAdmin && !isDeveloper && kind != "auth"} onClick={() => showModal(item.id)} key="list-loadmore-edit">comment</Button>,
                            onlyAssignedDeveloperOrAdmin(item)
                        ]}
                    >
                        <List.Item.Meta
                            key={item.id}
                            avatar={<Avatar src={"https://avatars.githubusercontent.com/u/71096790?v=4"} />}
                            title={item.tittle}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
            <Modal title="Task Comments" okText="Comment" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <ul>
                    {
                        tasks.filter(task => task.id == taskId)[0]?.comments?.map((comment, j) => <li key={j}>{comment}</li>)
                    }
                </ul>
                <Input placeholder="Your Comment..." name="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
            </Modal>
        </div>
    );
};

export default TaskList;
