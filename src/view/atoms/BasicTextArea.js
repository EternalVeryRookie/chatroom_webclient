import React from "react";


export default React.forwardRef((props, ref) => {
    const onChange = (evt) => {
        console.log(evt.target.value = evt.target.value.replace("\n", ""));
        props.onChange(evt);
    }

    return <textarea type="textarea" ref={ref} {...props} onChange={(evt) => onChange(evt)}/>
});