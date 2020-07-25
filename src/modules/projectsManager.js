
import Project from "../factories/Project";

export default (function() {
  
  function createProject(title) {
    const project = Project(title);
    project.storeState();
    return project;
  }

  function getAllProjects() {
    return JSON.parse(sessionStorage.getItem("projects"));
  }

  function getProject(title) {
    const projects = getAllProjects();
    return projects.find(project => project.title == title);
  }

  function isTakenTitle(title) {
    const projects = getAllProjects();
    return projects.some(project => project.title == title);
  }

  function isValidTitle(title) {
    // const regex = //i;
  }

  return {
    createProject,
    getAllProjects,
    getProject,
    isTakenTitle,
  };
})();