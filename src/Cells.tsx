import React from "react";

function Cells(props) {
    return(
        <>
        <div id={`${props.id}`} className={`${props.colorClass} h-64 flex justify-center items-center`}>
            {props.text}
        </div>
        </>
    );
}

export default Cells;