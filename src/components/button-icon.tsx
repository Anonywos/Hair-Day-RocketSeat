import type React from "react";
import Icon from "./icon";
import { cva, type VariantProps } from "class-variance-authority";

const ButtonIconVariant = cva('', {
    variants: {
        variant: {
            primary: 'fill-yellow hover:fill-yellow-dark'
        },
        size: {
            base: "h-5 w-5"
        }
    },
    defaultVariants: {
        variant: 'primary',
        size: 'base'
    }
})

const IconVariant = cva('', {
    variants: {
        size: {
            base: "h-5 w-5"
        }
    },
    defaultVariants: {
        size: 'base'
    }
})

interface ButtonIconProps extends React.ComponentProps<'button'>
    , VariantProps<typeof ButtonIconVariant> {
    icon: React.FC<React.ComponentProps<'svg'>>
}

export default function ButtonIcon({
    icon,
    size,
    variant,
    className,
    ...props
}: ButtonIconProps) {
    return <button
        className={ButtonIconVariant({variant, size, className})}
        {...props}
    ><Icon svg={icon} className={IconVariant({size})} />
    </button>
}