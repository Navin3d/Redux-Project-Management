import { useParams } from "react-router-dom";
import ProjectList from "../../components/project/ProjectList";
import SideNavLayout from "../../layouts/SideNavLayout";

const ProjectListPage = () => {
    const { kind } = useParams();

    return (
        <div>
            <SideNavLayout element={<ProjectList kind={kind} />} />
        </div>
    );
};

export default ProjectListPage;
