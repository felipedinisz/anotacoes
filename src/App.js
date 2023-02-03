import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(!modal);
  };

  const closeModal = () => {
    setModal(!modal);
  };

  const saveTask = (e) => {
    e.preventDefault();

    const task = document.querySelector("#taskDescription");

    setTasks([
      ...tasks,
      {
        id: new Date().getTime(),
        task: task.value,
        finished: false,
      },
    ]);

    task.focus();

    window.localStorage.setItem(
      "tasks",
      JSON.stringify([
        ...tasks,
        {
          id: new Date().getTime(),
          task: task.value,
          finished: false,
        },
      ])
    );
  };

  const mark = (id) => {
    const p = document.querySelector("#taskP")
    const newTasks = tasks.filter((val) => {

      if (val.id === id && p.style.textDecoration !== "line-through") val.finished = true;
      if(val.id === id && p.style.textDecoration === "line-through") val.finished = false

      return val;
    });

    setTasks(newTasks);

    window.localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((val) => {
      if (val.id === id) val = null;

      return val;
    });

    setTasks(newTasks);
    window.localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  useEffect(() => {
    if (window.localStorage.getItem("tasks") !== undefined)
      setTasks(JSON.parse(window.localStorage.getItem("tasks")));
  }, []);
  return (
    <div className="App">
      <div onClick={() => openModal()} className="addTask">
        +
      </div>
      <div className="Flex">
        {modal ? (
          <div className="modal">
            <div className="closeModal" onClick={() => closeModal()}>
              x
            </div>
            <div className="modalContent">
              <h3>Adicionar sua tarefa</h3>
              <form onSubmit={(e) => saveTask(e)}>
                <input type="text" id="taskDescription" />
                <button>Salvar</button>
              </form>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <div className="box">
          <h2>Minhas tarefas</h2>
          {tasks.map((val) => {
            return !val.finished ? (
              <div className="single">
                <p id="taskP" onClick={() => mark(val.id)}>{val.task}</p>
                <button onClick={() => deleteTask(val.id)}>Deletar</button>
              </div>
            ) : (
              <div className="single">
              <p id="taskP"
                onClick={() => mark(val.id)}
                style={{ textDecoration: "line-through", color: "rgb(231, 55, 55)" }}
              >
                {val.task}
              </p>
              <button onClick={() => deleteTask(val.id)}>Deletar</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
