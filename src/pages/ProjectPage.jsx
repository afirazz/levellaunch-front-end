import { useParams } from "react-router-dom";
import { useState } from "react";

import useProject from "../hooks/use-project";
import PledgeForm from "../components/PledgeForm";
import rocketloading from "../assets/rocketloading.gif";

import "./ProjectPage.css";

function ProjectPage() {
  // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useProject hook.
  const { id } = useParams();
  // useProject returns three pieces of info, so we need to grab them all here
  const { project, isLoading, error } = useProject(id);

  const gameTypeChoices = {
    video: "Video Game",
    tabletop: "Tabletop Game",
    mobile: "Mobile Game",
    cards: "Playing Cards",
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

  console.log(project);

  const [pledgeList, setPledgeList] = [project.pledges];
  console.log(pledgeList);

  // const userDetails = []

  const PledgeButton = () => {
    const [pledgeFormVisible, setPledgeFormVisible] = useState(false);
    const showPledgeForm = () => setPledgeFormVisible(true);
    const hidePledgeForm = () => setPledgeFormVisible(false);

    return (
      <div>
        <button
          onClick={showPledgeForm}
          style={pledgeFormVisible ? { display: "none" } : null}
        >
          New Pledge
        </button>
        {pledgeFormVisible ? <button onClick={hidePledgeForm}>x</button> : null}
        {pledgeFormVisible ? <PledgeForm /> : null}
      </div>
    );
  };

  return (
    <div className="project-page-container">
      <section className="project-details">
        <h1>{project.title}</h1>
        <p>{gameTypeChoices[project.game_type]}</p>
        <img src={project.image} />
        <p>
          By {project.owner.first_name} {project.owner.last_name}
        </p>
        <progress value="1000" max={project.goal} />
      </section>
      <div className="description-pledges-container">
        <section className="project-description">
          <h2>Description</h2>
          <p>{project.description}</p>
        </section>
        <section className="project-pledges">
          <PledgeButton />
          <h3>Pledges:</h3>
          <ul>
            {project.pledges.map((pledgeData, key) => {
              return (
                <li key={key}>
                  ${pledgeData.amount} from {pledgeData.supporter.first_name} -{" "}
                  {pledgeData.comment}
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default ProjectPage;
