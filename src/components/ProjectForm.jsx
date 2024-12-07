import { useState } from "react";

import postProject from "../api/post-project";
import { useNavigate } from "react-router-dom";

function ProjectForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [projectDetails, setProjectDetails] = useState({
    title: "",
    description: "",
    game_type: "",
    goal: "",
    image:
      "https://variety.com/wp-content/uploads/2024/01/featured_videogame_SR_v3.jpg?w=910&h=511&crop=1",
    is_open: true,
    start_date: "",
    end_date: "",
  });

  console.log(projectDetails);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setProjectDetails((prevProjectDetails) => ({
      ...prevProjectDetails,
      [id]: value,
    }));
  };

  console.log(projectDetails);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (
      projectDetails.title &&
      projectDetails.description &&
      projectDetails.game_type &&
      projectDetails.goal &&
      projectDetails.image &&
      projectDetails.is_open &&
      projectDetails.start_date &&
      projectDetails.end_date
    ) {
      postProject(
        projectDetails.title,
        projectDetails.description,
        projectDetails.game_type,
        projectDetails.goal,
        projectDetails.image,
        projectDetails.is_open,
        projectDetails.start_date,
        projectDetails.end_date
      )
        .then((response) => {
          console.log(response);
          navigate("/");
        })
        .catch((error) => {
          setIsLoading(false);
          window.alert(error.message);
        });
    }
  };

  return (
    <form>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Enter title"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          placeholder="Enter description"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="game_type">Game Type:</label>
        <select id="game_type" onChange={handleChange}>
          <option value="video">Video Game</option>
          <option value="tabletop">Tabletop Game</option>
          <option value="mobile">Mobile Game</option>
          <option value="cards">Playing Cards</option>
        </select>
      </div>
      <div>
        <label htmlFor="goal">Goal:</label>
        <input
          type="number"
          id="goal"
          placeholder="Enter goal amount"
          min="1"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="start_date">Start Date:</label>
        <input type="date" id="start_date" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="end_date">End Date:</label>
        <input type="date" id="end_date" onChange={handleChange} />
      </div>
      <button type="submit" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Creating..." : "Create"}
      </button>
    </form>
  );
}

export default ProjectForm;
