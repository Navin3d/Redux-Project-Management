import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import TaskList from "../../components/task/TaskList";
import SideNavLayout from "../../layouts/SideNavLayout";
import { init } from "../../redux/auth-slice";
import { getDeveloper } from "../../services/auth-service";

const TaskListPage = () => {
    const { kind, status } = useParams();

    const dispatch = useDispatch();

    const initUser = _ => getDeveloper()
        .then(res => {
            console.log(res)
            const developer = res.data["data"]["developer"];
            dispatch(init(developer));
            return developer;
        })
        .catch(e => console.log(e));

    useEffect(() => {
        initUser();
    }, []);

    return (
        <div>
           <SideNavLayout element={<TaskList kind={kind} status={status} />} breadcrumb={[{ title: "Tasks" }, { title: "List" }]} />
        </div>
    );
};

export default TaskListPage;
