import { useParams } from "react-router-dom";
import { useState } from "react";

import useProject from "../hooks/use-project";
import PledgeForm from "../components/PledgeForm";
import rocketloading from "../assets/rocketloading.gif";

function ProjectPage() {
  // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useProject hook.
  const { id } = useParams();
  // useProject returns three pieces of info, so we need to grab them all here
  const { project, isLoading, error } = useProject(id);

  const PledgeButton = () => {
    const [pledgeFormVisible, setPledgeFormVisible] = useState(false);
    const onClick = () => setPledgeFormVisible(true);
    return (
      <div>
        <button
          onClick={onClick}
          style={pledgeFormVisible ? { display: "none" } : null}
        >
          New Pledge
        </button>
        {pledgeFormVisible ? <PledgeForm /> : null}
      </div>
    );
  };

  // console.log({ project });
  // console.log(project.pledges);

  // const [pledges, setPledges] = useState([project.pledges]);

  // const handleNewPledge = (newPledge) => {
  //   setPledges((prevPledges) => [...prevPledges, newPledge]);
  // };

  const showPledgeForm = () => {
    return <PledgeForm />;
  };

  if (isLoading) {
    return (
      <div>
        <img src={rocketloading} />
      </div>
    );
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <h2>{project.title}</h2>
      <h3>Created at: {project.date_created}</h3>
      <h3>{`Status: ${project.is_open}`}</h3>
      <h3>Pledges:</h3>
      <ul>
        {project.pledges.map((pledgeData, key) => {
          return (
            <li key={key}>
              {pledgeData.amount} from {pledgeData.supporter}
            </li>
          );
        })}
      </ul>
      <PledgeButton />
      {/* <PledgeForm /> */}
    </div>
  );
}

export default ProjectPage;
