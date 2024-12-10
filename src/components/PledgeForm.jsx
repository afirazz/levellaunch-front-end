import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import postPledge from "../api/post-pledge";

function PledgeForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const [pledgeDetails, setPledgeDetails] = useState({
    amount: "",
    comment: "",
    anonymous: false,
    project: id,
  });

  console.log(pledgeDetails);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setPledgeDetails((prevPledgeDetails) => ({
      ...prevPledgeDetails,
      [id]: value,
    }));
  };

  console.log(pledgeDetails);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (pledgeDetails.amount && pledgeDetails.project) {
      postPledge(
        pledgeDetails.amount,
        pledgeDetails.comment,
        pledgeDetails.anonymous,
        pledgeDetails.project
      )
        .then((response) => {
          console.log(response);
          window.location.reload(true);
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
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          placeholder="0"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="comment">Comment:</label>
        <input
          type="text"
          id="comment"
          placeholder="Comment"
          onChange={handleChange}
        />
      </div>
      {/* <div>
        <label htmlFor="anonymous">Anonymous:</label>
        <input
          type="checkbox"
          id="anonymous"
          onChange={handleChange}
          value={true}
        />
      </div> */}
      <button type="submit" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Pledging..." : "Pledge"}
      </button>
    </form>
  );
}

export default PledgeForm;
