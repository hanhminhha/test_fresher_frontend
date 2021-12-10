import "./App.css";
import "./style.scss";
import { DetailTask } from "./component/DetailTask";
import { ListTask } from "./component/ListTask";
import React, { useState } from "react";

function App() {
  const aaa = localStorage.getItem("listTask");
  const ccc = JSON.parse(aaa) == null ? [] : JSON.parse(aaa);
  const [getListTask, setListTask] = useState([]);
  const dataListTask = (value) => {
    setListTask(value);
  };
  const [isChecked, setIsChecked] = useState([]);
  const onChange = (event) => {
    if (event.target.checked) {
      setIsChecked([...isChecked, event.target.value]);
    } else {
      const removeChecked = isChecked.filter((item) => {
        return item !== event.target.value;
      });
      setIsChecked(removeChecked);
    }
  };
  const removeManyTask=()=>{
    const removeTaskItem = ccc?.filter((item) => {
      return isChecked?.includes(item?.id)===false
    });
    console.log('removeTaskItem',removeTaskItem)
    localStorage.setItem("listTask", JSON.stringify(removeTaskItem));
    setListTask(removeTaskItem);
    setIsChecked([])
  }


  return (
    <div className="wrapper_todo_list">
      <div className="content">
        <div className="new-task">
          <div className="title-header">New Task</div>
          <div>
            <DetailTask title="add" dataListTask={dataListTask} />
          </div>
        </div>
        <div className="list-task">
          <div className="title-header">to do list</div>
          <div>
            <input placeholder="Search..." className="input-title" />
            {ccc?.map((item, index) => {
              return (
                <div className="content-list-task" key={index}>
                  <ListTask
                    title={item?.title}
                    description={item?.description}
                    id={item?.id}
                    dataListTask={dataListTask}
                    date={item?.date}
                    piority={item?.piority}
                    onChange={onChange}
                    isChecked={isChecked}
                  />
                </div>
              );
            })}
          </div>
          {isChecked?.length > 0 ? (
            <div className="delete-many-task">
              <div className="list-task-item">
                <div className="flex">
                  <div></div>
                  <div>
                    <h5 style={{ color: "#7A8085" }}>Bulk Action</h5>
                  </div>
                </div>
                <div className="flex">
                  <div className="detail-button">
                    <button>Done</button>
                  </div>
                  <div className="remove-button">
                    <button onClick ={removeManyTask}>Remove</button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
