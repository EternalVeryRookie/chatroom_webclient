import React from "react";

const BasicTextArea = React.forwardRef((props, ref) => {
    const {onChange, deleteNewLine, ...others} = props;

    const _onChange = (evt) => {
        if (deleteNewLine)
            evt.target.value = evt.target.value.replace("\n", "");
        
        onChange(evt);
    }

    return <textarea type="textarea" ref={ref} {...others} onChange={_onChange}/>
});

BasicTextArea.defaultProps = {
    deleteNewLine: false,
    onChange: evt => null
}

export default BasicTextArea;