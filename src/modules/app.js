import dom from "./dom";
import projectsManager from "./projectsManager";

export default (function() {

  function init() {
    populateSession();
    dom.addAllEventListeners();
    dom.addAllProjects(projectsManager.getAllProjects());
  }

  function onProjectClick(e) {
    const title = e.target.dataset.title;
    const project = projectsManager.getProject(title);
    dom.displayProject(project);
  }

  function onProjectFormSubmit(e) {
    e.preventDefault();
    const titleInput = e.target.lastElementChild;
    const title = titleInput.value;
    dom.clear(titleInput);
    
    if (projectsManager.isTakenTitle(title)) {
      return dom.showTip(".project-form", "This name is already taken");
    }

    const project = projectsManager.createProject(title);
    dom.addProject(project);
  }

  function populateSession() {
    if (sessionStorage.getItem("projects")) return;

    sessionStorage.setItem("projects", JSON.stringify([]));
    sessionStorage.setItem("tasks", JSON.stringify([]));
  }

  return {
    init,
    onProjectClick,
    onProjectFormSubmit,
  };
})();