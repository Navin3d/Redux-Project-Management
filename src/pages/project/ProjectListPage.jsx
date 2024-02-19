import { useParams } from "react-router-dom";

const ProjectListPage = ({ element = "No Element" }) => {
    const { kind } = useParams();

    return (
        <div>
            kind: {kind}
            { element }
        </div>
    );
};

export default ProjectListPage;
