import React from 'react';

const Greeting = ({name}) => {

    const today = new Date();
    let hrs = today.getHours();

    let greet;

    if (hrs < 12)
        greet = 'Good Morning';
    else if (hrs >= 12 && hrs <= 17)
        greet = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24)
        greet = 'Good Evening';

    return (
        <>
            <h2 className="greeting">{greet}, {name}</h2>
        </>

    )
}

export default Greeting;