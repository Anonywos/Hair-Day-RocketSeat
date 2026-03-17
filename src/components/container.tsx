import React from "react";

interface ContainerProps {
    as?: keyof React.JSX.IntrinsicElements;
    className?: string;
    children?: React.ReactNode;
}

export default function Container({
    as = 'div',
    className,
    children,
    ...props
}: ContainerProps) {
    return React.createElement(as, { className, ...props }, children);
}