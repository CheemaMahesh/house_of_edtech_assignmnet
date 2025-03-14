import React from "react";

interface SpinnerProps {
    children?: React.ReactNode;
    isLoading?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ children, isLoading }) => {
    return (
        <div className="flex justify-center items-center w-full h-full">
            {isLoading && <div className="flex justify-center items-center w-full h-full absolute bg-gray-100 opacity-40"><div className="spinner fixed"></div></div>}
            <div className="w-full h-full">
                {children}
            </div>
        </div>
    );
};

export default Spinner;