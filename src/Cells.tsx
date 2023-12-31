import React from "react";

function Cells(props) {
    return(
        <>
        <div id={`${props.id}`} className={`${props.colorClass} h-64 flex justify-center items-center`}>
            <div className={`${props.insideColorClass} rounded-full w-[30%] h-[30%] hover:w-[80%] hover:h-[80%] flex justify-center items-center transition-all duration-100`}>
                {/*props.text*/}
            </div>
        </div>
        </>
    );
}

export default Cells;