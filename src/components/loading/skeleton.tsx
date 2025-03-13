import React from "react";

interface SkeletonProps {
    width?: string;
    height?: string;
    isCircle?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({ width = "200px", height = "200px", isCircle = false }) => {
    return (
        <div
            className={`flex justify-center items-center bg-gray-300 animate-pulse ${isCircle ? 'rounded-full' : 'rounded-md'}`}
            style={{ width: `${width}`, height: `${height}` }}
        >
        </div>
    )
};

export default Skeleton;