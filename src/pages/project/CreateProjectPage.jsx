import ProjectForm from "../../components/project/ProjectForm";
import SideNavLayout from "../../layouts/SideNavLayout";
import { getUserId } from "../../services/auth-service";


const PROJECTINITIAL = {
    "tittle": "",
    "description": "",
    "createdBy": getUserId(),
}

const Content = () => {
    return (
        <div>
            <h1>Enterprise Your Idea!</h1><br/>
            <ProjectForm projectData={PROJECTINITIAL} />
        </div>
    );
}

const CreateProjectPage = _ => {
    return (
        <SideNavLayout element={<Content />} />
    );
};

export default CreateProjectPage;
