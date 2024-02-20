import { useParams } from "react-router-dom";
import TaskList from "../../components/task/TaskList";
import SideNavLayout from "../../layouts/SideNavLayout";

const TaskListPage = () => {
    const { kind, status } = useParams();

    return (
        <div>
           <SideNavLayout element={<TaskList kind={kind} status={status} />} />
        </div>
    );
};

export default TaskListPage;