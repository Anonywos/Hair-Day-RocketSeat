import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import Text from "./text";

const ButtonVariant = cva(
    `flex h-14 items-center justify-center p-4 rounded-lg`,
    {
        variants: {
            variant: {
                primary: "bg-yellow hover:border-2 hover:border-yellow-light",
            },
            disabled: {
                true: 'bg-yellow-dark pointer-events-none'
            },
        },
        defaultVariants: {
            variant: "primary",
            disabled: false
        }
    }
);

interface ButtonProps extends Omit<React.ComponentProps<"button">, 'disabled'>,
    VariantProps<typeof ButtonVariant> {

}

export default function Button({
    variant,
    disabled,
    className,
    children,
    ...props
}: ButtonProps) {
    return <button 
        disabled={disabled ? true : false}
        className={ButtonVariant({variant, disabled, className})}
        {...props}
    ><Text variant='body-sm-bold' className="text-gray-900">{children}</Text></button>
}