import React, {useRef} from "react";

const BasicFileSelectButton = React.forwardRef((props, ref) => {
    const localRef = useRef(null);
    const {onChange, ...others} = props;

    const onChangeEvent = (evt) => {
        const targetRef = ref? ref: localRef;

        onChange(evt);
        targetRef.current.value = "";//同じファイルを選択しても再度イベントが発火するようにする
    }

    return <input type="file" ref={ref? ref: localRef} onChange={onChangeEvent} {...others} />;
});

BasicFileSelectButton.defaultProps = {
    onChange: (evt) => null
}

export default BasicFileSelectButton;


