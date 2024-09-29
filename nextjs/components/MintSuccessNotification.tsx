import React, { useEffect, useState } from 'react';

const MintSuccessNotification = ({ isVisible, setVisibility }) => {
    // const [fadeOut, setFadeOut] = useState(false);
    if (isVisible) {
        console.log('hi');
    }
    useEffect(() => {
        // If isVisible, After 5 seconds setVisibility(false);
        // if(isVisible) {
        //     setTimeout(() => {
        //         setVisibility(false)
        //     }, 3000);
        // }
    });
    return (
        // Design the popup
        <div
            className="fixed z-400 text-[#000000] bg-[#ffffff] overflow-y-auto top-[20%] w-[80] left-0 font-lato"
            id="modal"
        >
            <div className="flex items-center justify-center min-height-100vh pt-[400px] px-4 pb-20 text-center sm:block sm:p-0">
                {isVisible && (
                    <div>
                        <div>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Inventore cum error incidunt adipisci quisquam
                            id voluptates eius, rem officiis voluptas ipsam
                            beatae cumque molestiae similique doloribus,
                            exercitationem nobis culpa provident.
                        </div>
                        <button
                            onClick={() => {
                                setVisibility(false);
                            }}
                        >
                            close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MintSuccessNotification;
