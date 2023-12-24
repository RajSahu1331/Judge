import React from 'react';

const ContactMe = () => {
    const openMail = () => {
        window.location.href = `mailto:rajsahu1331@gmail.com?subject=Codify`;
    };

    return (
        <div>
            <button onClick={openMail}>Contact Me</button>
        </div>
    );
};

export default ContactMe;
