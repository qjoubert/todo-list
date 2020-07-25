import app from "./app";
import tippy from "tippy.js";

export default (function() {

  const projectForm = document.querySelector(".project-form");
  const projectsList = document.querySelector("ul.projects");

  function addAllEventListeners() {
    listen(projectForm, "submit", app.onProjectFormSubmit);
  }

  function addAllProjects(projects) {
    removeAllChildren(projectsList);
    projects.forEach(project => addProject(project));
  }

  function addProject(project) {
    const li = document.createElement("li");
    li.classList.add("project");
    li.setAttribute("data-title", project.title);
    li.textContent = project.title;
    listen(li, "click", app.onProjectClick);
    projectsList.appendChild(li);
  }

  function clear(element) {
    if (element.textContent) element.textContent = "";
    if (element.value) element.value = "";
  }

  function listen(target, event, action) {
    target.addEventListener(event, (e) => action(e));
  }

  function listenAll(targets, event, action) {
    targets.forEach(target => {
      target.addEventListener(event, (e) => action(e));
    });
  }

  function removeAllChildren(element) {
    while (element.firstChild) {
      element.firstChild.remove();
    }
  }

  function showTip(target, content) {
    const tip = tippy(document.querySelector(target));
      
    tip.setProps({
      content,
      placement: "top-start",
      theme: "light",
      animation: "shift-toward"
    })

    tip.show();
    setTimeout(tip.hide, 2000);
    setTimeout(tip.destroy, 2500);
  }

  return {
    addAllEventListeners,
    addAllProjects,
    addProject,
    clear,
    listen,
    listenAll,
    showTip,
  };
})();