import { useParams } from "react-router-dom";
import SideNavLayout from "../../layouts/SideNavLayout";

const TaskListPage = ({ element }) => {
    const { kind } = useParams();

    return (
        <div>
            kind: {kind}
            [ element ]
        </div>
    );
};

export default TaskListPage;
