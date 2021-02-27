import React from "react";

export default React.forwardRef((props, ref) => {
    return  <label ref={ref} {...props}></label>
});