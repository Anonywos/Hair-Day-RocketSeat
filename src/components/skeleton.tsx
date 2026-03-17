import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";

const SkeletonVariants = cva('animate-pulse pointer-events-none')

interface SkeletonProps extends React.ComponentProps<'div'> 
    , VariantProps<typeof SkeletonVariants>{}

export default function Skeleton({
    className,
    ...props
}: SkeletonProps) {
    return <div className={SkeletonVariants({className})} {...props} ></div>
}