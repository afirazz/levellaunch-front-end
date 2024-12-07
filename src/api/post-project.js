async function postProject(title, description, game_type, goal, start_date, end_date) {
    const url = `${import.meta.env.VITE_API_URL}/projects/`;
    const token = window.localStorage.setItem("token")

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authotization": `Token ${token}`,
      },
      body: JSON.stringify({
        "title": title,
        "description": description,
        "game_type": game_type,
        "goal": goal,
        "image": "",
        "is_open": true,
        "start_date": start_date,
        "end_date": end_date
      }),
    });
  
    if (!response.ok) {
      const fallbackError = `Error creating project`;
  
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
  
      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
    }
  
    return await response.json();
  }
  
  export default postProject;