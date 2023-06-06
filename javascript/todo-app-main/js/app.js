const inputNewTask = document.querySelector(".newTask");
const taskList = document.querySelector(".task__list");

//GLOBALES
let tasks = [];

//FUNCION PRINCIPAL
const agregarTarea = (titulo) => {
  const taskItem = {
    identifier: new Date().getTime(),
    title: titulo,
    state: "Pendiente",
    date: new Date(),
  };
  tasks.push(taskItem);

  agregarTareaDom(
    taskItem.identifier,
    taskItem.title,
    taskItem.state,
    taskItem.date
  );
  showQuantity();
};

//FUNCION DOM y EVENTOS en la lista de tareas
const agregarTareaDom = (identifier, title, state, date) => {
  const newLi = document.createElement("li");
  newLi.setAttribute("class", "list__item");
  newLi.setAttribute("id", identifier);

  //CHECK
  newLi.addEventListener("click", (e) => {
    newLi.classList.toggle("list__item--active");

    const completedTasks = tasks.find((taskItem) => {
      return taskItem.identifier === parseInt(newLi.id);
    });
    completedTasks.state =
      completedTasks.state === "Pendiente" ? "Completado" : "Pendiente;";
  });

  if (state === "Completado") {
    newLi.classList.toggle("list__item--active");
  }

  //CIRCLE
  const spanCircle = document.createElement("span");
  spanCircle.setAttribute("class", "circle");
  newLi.appendChild(spanCircle);

  //TEXTO
  const spanTitle = document.createElement("span");
  spanTitle.setAttribute("class", "item__title");
  spanTitle.textContent = title;
  newLi.appendChild(spanTitle);

  //IMAGEN X
  const acrossImg = document.createElement("img");
  acrossImg.setAttribute("class", "item__img");
  acrossImg.setAttribute("src", "./images/icon-cross.svg");
  //EVENTO X (HOVER)
  newLi.addEventListener("mouseover", (e) => {
    acrossImg.classList.add("class", "item__img--visible");
  });
  newLi.addEventListener("mouseleave", (e) => {
    acrossImg.classList.remove("class", "item__img--visible");
  });
  //EVENTO X (ELIMINAR TAREA)
  acrossImg.addEventListener("click", (e) => {
    e.stopPropagation();
    const taskDeleted = newLi.getAttribute("id");
    newLi.remove(); //hasta aqui se elimina visualmente pero no del DOM
    tasks = tasks.filter((taskItem) => {
      return taskItem.identifier !== parseInt(taskDeleted);
    });
    showQuantity();

    //e.target.parentElement.remove(); //OTRA OPCION (DESDE EL PADRE y si
    //la funcion estuviera afuera)
  });
  newLi.appendChild(acrossImg);

  taskList.insertAdjacentElement("afterbegin", newLi);
};

//HELPERS
const spanQuantity = document.querySelector(".number");

const showQuantity = (quantityListTask) => {
  spanQuantity.textContent = quantityListTask ?? tasks.length;
};

//OTROS EVENTOS fuera de la lista
inputNewTask.addEventListener("keyup", (e) => {
  if (
    (e.code === "Enter" || e.code === "NumpadEnter") &&
    e.target.value.length > 0
  ) {
    agregarTarea(inputNewTask.value);
    inputNewTask.value = "";
  }
});

//Evento CLEAR COMPLETED
const spanClear = document.querySelector(".clear");

spanClear.addEventListener("click", (e) => {
  tasks = tasks.filter((taskItem) => {
    return taskItem.state !== "Completado";
  }); //hasta aqui se elimina de consola pero sigue en el DOM y visualmente

  const listTaskActive = document.querySelectorAll(".list__item--active");
  listTaskActive.forEach((taskItem) => {
    taskItem.remove();
  });
  showQuantity();
});

//Eventos FILTRAR LAS TAREAS
const spanFilter = document.querySelectorAll(".filter");
const taskInfo = document.querySelector(".task__info");

spanFilter.forEach((filterItem) => {
  filterItem.addEventListener("click", (e) => {
    const filterActive = document.querySelectorAll(".filter--active");
    filterActive.forEach((filterActiveItem) => {
      filterActiveItem.classList.remove("filter--active");
    }); //Ya que viene por defecto uno seleccionado, esto se lo quita

    filterItem.classList.add("filter--active"); //Esto le anhade el estilo solo al que se haga click
    taskList.textContent = ""; //Se pone todo el UL vacio para que al hacer click salga una nueva lista segun lo seleccionado

    //ACTIVE FILTER
    if (filterItem.textContent === "Active") {
      const pendients = tasks.filter((taskItem) => {
        return taskItem.state === "Pendiente";
      });

      pendients.forEach((taskItem) => {
        agregarTareaDom(
          taskItem.identifier,
          taskItem.title,
          taskItem.state,
          taskItem.date
        );
      });
      showQuantity(pendients.length);
    } //COMPLETED FILTER
    else if (filterItem.textContent === "Completed") {
      const completed = tasks.filter((taskItem) => {
        return taskItem.state === "Completado";
      });

      completed.forEach((taskItem) => {
        agregarTareaDom(
          taskItem.identifier,
          taskItem.title,
          taskItem.state,
          taskItem.date
        );
      });
      showQuantity(completed.length);
    } //ALL FILTER
    else if (filterItem.textContent === "All") {
      tasks.forEach((taskItem) => {
        agregarTareaDom(
          taskItem.identifier,
          taskItem.title,
          taskItem.state,
          taskItem.date
        );
      });
      showQuantity();
    }

    taskList.appendChild(taskInfo);
  });
});

//THEME LIGHT OR DARK
const theme = document.querySelectorAll('.theme');
const container = document.querySelector('.container');

theme.forEach( (icon) => {
  icon.addEventListener('click', (e) => {
    container.classList.toggle('light');
    icon.classList.toggle('theme--active');
    icon.classList.add('theme--hidden');
    if (e.target.parentNode.nextElementSibling) {
      e.target.parentNode.nextElementSibling.classList.toggle('theme--hidden');
      e.target.parentNode.nextElementSibling.classList.add('theme--active')
    } else{
      e.target.parentNode.previousElementSibling.classList.toggle('theme--hidden');
      e.target.parentNode.previousElementSibling.classList.add('theme--active')
    }
  });
})