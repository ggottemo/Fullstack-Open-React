
import React from "react";
import Header from "./header";
const Section = ({title, content, classname}) => {
    return (
        <div className={classname}>
        <Header text={title} />
        {content}
        </div>
    );
    }

export default Section;