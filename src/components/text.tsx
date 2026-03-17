import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const TextVariants = cva('font-sans', {
    variants: {
        variant: {
            "body-lg-bold": "text-[32px] font-bold leading-6",
            "body-md-bold": "text-base font-bold leading-6",
            "body-sm-bold": "text-sm font-bold leading-5",
            "body-md": "text-base font-normal leading-6",
            "body-sm": "text-sm font-normal leading-5",
        }
    },
    defaultVariants: {
        variant: "body-md",
    }
})

interface TextProps extends VariantProps<typeof TextVariants> {
    as?: keyof React.JSX.IntrinsicElements;
    className?: string;
    children?: React.ReactNode;
}
 
export default function Text ({
    as = "span",
    variant,
    className,
    children,
    ...props
}: TextProps) {
    return React.createElement(as, {className: TextVariants({variant, className}), ...props}, children);
}