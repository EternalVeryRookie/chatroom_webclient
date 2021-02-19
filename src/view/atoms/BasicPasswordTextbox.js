import React from "react";


export default React.forwardRef((props, ref) => {
    return <input type="password" ref={ref} {...props} />
});