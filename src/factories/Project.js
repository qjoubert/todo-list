
export default function(title) {

  let description = "";
  let tasks = [];

  function storeState() {
    const state = {
      title,
      description,
      tasks,
    };

    const projects = JSON.parse(sessionStorage.getItem("projects"));
    projects.push(state);
    sessionStorage.setItem("projects", JSON.stringify(projects));
  }

  return {
    title,
    storeState,
  };
}