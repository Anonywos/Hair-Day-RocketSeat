import { cx } from "class-variance-authority";
import type React from "react";


interface MainContainerProps extends React.ComponentProps<'main'>{}

export default function MainContainer({
    className,
    children,
    ...props
}: MainContainerProps) {
    return <main 
        className={cx('flex flex-row h-screen justify-between items-center p-2 bg-gray-800 ', className)} 
        {...props}
    >{children}</main>
}