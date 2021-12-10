import { Checkbox } from "@mui/material";
import "./style.scss";
import React, { useState } from "react";
import { DetailTask } from "../component/DetailTask";

export const ListTask = ({
  title,
  description,
  id,
  dataListTask,
  piority,
  date,
  onChange,
  isChecked
}) => {
  const [opent, setOpent] = useState(false);
  const getListTask = localStorage.getItem("listTask");
  const listTask =
    JSON.parse(getListTask) == null ? [] : JSON.parse(getListTask);
  const removeTask = () => {
    const removeTaskItem = listTask?.filter((item) => {
      return item?.id !== id;
    });
    localStorage.setItem("listTask", JSON.stringify(removeTaskItem));
    dataListTask(removeTaskItem);
  };
  

  return (
    <div>
      <div className="list-task-item">
        <div className="flex">
          <div>
            <Checkbox checked={isChecked.includes(id)} onChange={onChange} value={id}/>
          </div>
          <div>
            <h5>{title}</h5>
          </div>
        </div>
        <div className="flex">
          <div className="detail-button">
            <button onClick={() => setOpent(!opent)}>Detail</button>
          </div>
          <div className="remove-button">
            <button onClick={removeTask}>Remove</button>
          </div>
        </div>
      </div>
      {opent ? (
        <div style={{ border: "1px solid", borderTop: 0, padding: 20 }}>
          <DetailTask
            title="update"
            textTitle={title}
            description={description}
            date={date}
            piority={piority}
            id={id}
          />
        </div>
      ) : null}
    </div>
  );
};
