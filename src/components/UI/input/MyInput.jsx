import React from "react";
import classes from "./MyInput.module.css";

const MyInput = React.forwardRef((props, ref) => {
    return <input ref={ref} className={classes.myInput} {...props} />;
}); // ref- это сама ссылка, React.forwardRef() позволяет компоненту получить ссылку на дом-элемент и передать его дочернему компоненту

export default MyInput;
