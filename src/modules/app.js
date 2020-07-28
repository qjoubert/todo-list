import dom from "./dom";
import form from "./form";
import projectsManager from "./projectsManager";

export default (function() {

  function init() {
    populateSession();

    const defaultProject = projectsManager.getProject("All Tasks");
    const projects = projectsManager.getAllProjects();
    
    dom.initEventListeners();
    dom.addAllProjects(projects);
    dom.displayProject(defaultProject);    
  }

  function onProjectClick(e) {
    const title = e.target.dataset.title;
    const project = projectsManager.getProject(title);
    dom.displayProject(project);
  }

  function onProjectFormSubmit(e) {
    e.preventDefault();
    form.validate(e.target);
    const titleInput = e.target.firstElementChild;
    const title = titleInput.value;
    dom.clear(titleInput);
    
    if (projectsManager.isTakenTitle(title)) {
      return dom.showTip(titleInput, "This title is already taken");
    }

    const project = projectsManager.createProject(title);
    dom.addProject(project);
  }

  function onTaskFormSubmit(e) {
    e.preventDefault;
    form.validate(e.target);
    const descriptionInput = e.target.firstElementChild;
    const description = descriptionInput.value;
    dom.clear(descriptionInput);
  }

  function populateSession() {
    if (sessionStorage.getItem("projects")) return;

    sessionStorage.setItem("projects", JSON.stringify([{
      title: "All Tasks", description: "", tasks: []
    }]));
    sessionStorage.setItem("tasks", JSON.stringify([]));
  }

  return {
    init,
    onProjectClick,
    onProjectFormSubmit,
    onTaskFormSubmit,
  };
})();