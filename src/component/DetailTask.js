import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import "./style.scss";
import { makeStyles } from "@material-ui/core/styles";
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const DetailTask = (props) => {
  const classes = useStyles();
  const getListItem = localStorage.getItem("listTask");
  const [listItem, setListItem] = useState(
    JSON.parse(getListItem) == null ? [] : JSON.parse(getListItem)
  );
  const title = props?.title;
  const textTitle = props?.textTitle;
  const description = props?.description;
  const dataListTask = props?.dataListTask;
  const date = props?.date;
  const piority = props?.piority;
  const id = props?.id;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (value) => {
    if (title === "update") {
      const updateTask = listItem.map((item) => {
        if (item?.id === id) {
          return {
            title: value.title,
            description: value.description,
            date: value.date,
            piority: value.piority,
            id: id,
          };
        }else{
          return item
        }
      });
      setListItem(updateTask)
    }else{
      setListItem([
        ...listItem,
        {
          title: value.title,
          description: value.description,
          date: value.date,
          piority: value.piority,
          id: Math.random()
            .toString(36)
            .replace(/[^a-z]+/g),
        },
      ]);
    }

    
  };
  // localStorage.removeItem('listTask')
  useEffect(() => {
    if (listItem) {
      localStorage.setItem("listTask", JSON.stringify(listItem));
      if (dataListTask) {
        dataListTask(listItem);
      }
    }
  }, [listItem]);

  return (
    <form className="detail-task" onSubmit={handleSubmit(onSubmit)}>
      <div className="margin">
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          defaultValue={textTitle ? textTitle : null}
          render={({ field: { onChange, onBlur, value } }) => (
            <input
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              placeholder="Add new task..."
              className="input-title"
              defaultValue={textTitle ? textTitle : null}
            />
          )}
          name="title"
        />
        {errors?.title && <h5 className="error-text">required title</h5>}
      </div>
      <div className="margin">
        <h5>Description</h5>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          defaultValue={description ? description : null}
          render={({ field: { onChange, onBlur, value } }) => (
            <textarea
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              className="input-desciption"
            />
          )}
          name="description"
        />
      </div>
      <div className="margin">
        <div className="flex">
          <div style={{ width: "46%" }}>
            <h5>Due date</h5>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value = "" } }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    inputFormat="MM/dd/yyyy"
                    value={value}
                    onChange={onChange}
                    renderInput={(params) => (
                      <TextField {...params} className={classes.root} />
                    )}
                  />
                </LocalizationProvider>
              )}
              defaultValue={date ? date : null}
              name="date"
            />
          </div>
          <div style={{ width: "46%", position: "relative" }}>
            <h5>Piority</h5>
            <Controller
              name="piority"
              control={control}
              defaultValue={piority ? piority : null}
              render={({ field: { onChange, onBlur, value } }) => (
                <select
                  className="select-piority"
                  onChange={onChange}
                  value={value}
                >
                  <option selected value="normal">
                    normal
                  </option>
                  <option value="low">low</option>
                  <option value="height">height</option>
                </select>
              )}
            />
            {/* <div style={{position:'absolute'}}> <ArrowDropDownIcon /></div> */}
          </div>
        </div>
      </div>
      <div className="margin">
        <button className="button">{title === "add" ? "Add" : "Update"}</button>
      </div>
      
    </form>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 0,
      border: "1px solid",
      height: 40,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
}));
