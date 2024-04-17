import React, { PureComponent } from "react";

const Gig = ({gig}) => {
    if (!gig) {
        return <></>;
    }
    return (
        <div style={{color: 'black'}}>
            <p>
                {gig.id} {gig.title} {gig.place}
            </p>
            <p>{gig.link}</p>
        </div>
    );
};

export default Gig;
