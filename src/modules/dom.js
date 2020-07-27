import emptyBoxVector from "../assets/images/empty-box-500.jpg";

import app from "./app";
import tippy from "tippy.js";

export default (function() {

  const placeholderContainer = document.querySelector(".placeholder-container");
  const projectForm = document.querySelector(".project-form");
  const projectDescription = document.querySelector(".project-display__description");
  const projectTitle= document.querySelector(".project-display__title");
  const projectsList = document.querySelector(".projects-list");
  const taskForm = document.querySelector(".task-form");
  const taskTitleInput = document.querySelector(".task-form__title-input");
  const projectTitleInput = document.querySelector(".project-form__title-input");

  function addAllEventListeners() {
    listen(projectForm, "submit", app.onProjectFormSubmit);
    listen(projectTitleInput, "focus", (e) => editPlaceholder(e, "Choose a title"));
    listen(projectTitleInput, "blur", (e) => editPlaceholder(e, "+ New Project"));
    listen(taskTitleInput, "focus", (e) => editPlaceholder(e, "What task did you have in mind ?"));
    listen(taskTitleInput, "blur", (e) => editPlaceholder(e, "+ New Task"));
  }

  function addAllProjects(projects) {
    removeAllChildren(projectsList);
    projects.forEach(project => addProject(project));
  }

  function addProject(project) {
    const li = document.createElement("li");
    li.classList.add("project-list__item");

    const btn = document.createElement("button");
    btn.classList.add("project-btn");
    btn.setAttribute("data-title", project.title);
    btn.textContent = project.title;
    listen(btn, "click", app.onProjectClick);

    li.appendChild(btn);
    projectsList.appendChild(li);
  }

  function clear(element) {
    if (element.textContent) element.textContent = "";
    if (element.value) element.value = "";
  }

  function displayDefaultProject() {
    projectTitle.textContent = "Welcome back";
    projectDescription.textContent = "Here is an overview of all your current tasks";
    displayPlaceholderImage(emptyBoxVector);
    displayPlaceholderPara();
    taskForm.style.display = "none";
  }

  function displayPlaceholderImage(imgSrc) {
    if (document.querySelector(".placeholder-container img")) return;
    
    const image = new Image();
    image.src = imgSrc;
    placeholderContainer.appendChild(image);
  }

  function displayPlaceholderPara() {
    if (document.querySelector(".placeholder-container p")) return;

    const p = document.createElement("p");
    p.textContent = "There is nothing in here...";
    placeholderContainer.appendChild(p);
  }

  function displayProject({title, description, tasks}) {
    projectTitle.textContent = title;
    projectDescription.textContent = description;

    if (taskForm.style.display = "none") {
      taskForm.style.display = "block";
    }

    if (tasks.length > 0) {
      displayTasks(tasks);
    } else {
      displayPlaceholderImage(emptyBoxVector);
      displayPlaceholderPara();
    }
  }

  function displayTasks(tasks) {
    console.log("displayTasks");
  }

  function editPlaceholder(e, placeholder) {
    const input = e.target;
    input.setAttribute("placeholder", placeholder); 
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
    const tip = tippy(target);
      
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
    displayDefaultProject,
    displayProject,
    listen,
    listenAll,
    showTip,
  };
})();