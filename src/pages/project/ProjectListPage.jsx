import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ProjectList from "../../components/project/ProjectList";
import SideNavLayout from "../../layouts/SideNavLayout";
import { init } from "../../redux/auth-slice";
import { getDeveloper } from "../../services/auth-service";

const ProjectListPage = () => {

    const dispatch = useDispatch();
    const { kind } = useParams();

    const initUser = _ => getDeveloper()
        .then(res => {
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
            <SideNavLayout element={<ProjectList kind={kind} />} breadcrumb={[{ title: "Projects" }, { title: "List" }]} />
        </div>
    );
};

export default ProjectListPage;
