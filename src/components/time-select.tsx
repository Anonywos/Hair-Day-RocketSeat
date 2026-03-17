import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import Text from "./text";
import Skeleton from "./skeleton";

const TimeSelectVariant = cva(`
        flex items-center justify-center rounded-lg 
        px-4.5 py-2
    `, {
        variants: {
            variant: {
                none: '',
                default: 'bg-gray-600 hover:bg-gray-500',
                selected: 'bg-gray-600 border border-yellow',
            },
            size: {
                md: 'h-10 w-19.5'
            },
            disabled: {
                true: 'border border-gray-500'
            }

        }, defaultVariants: {
            variant: 'default',
            size: 'md',
            disabled: false
        }
    }
);

const TimeSelectTextVariant = cva('', {
    variants: {
        variant: {
            none: '',
            default: 'text-gray-200',
            selected: 'text-yellow'
        },
        disabled: {
            true: 'text-gray-500'
        }

    }, defaultVariants: {
        variant: 'default',
        disabled: false,
    }
})

interface TimeSelectProps extends Omit<React.ComponentProps<"button">, 'disabled'>
    , VariantProps<typeof TimeSelectVariant>{
        isLoading?: boolean
}

export default function TimeSelect({
    variant,
    size,
    disabled,
    isLoading,
    className,
    children,
    ...props
}: TimeSelectProps) {
    if (isLoading){
        variant = 'default'
        disabled = true
        return <Skeleton className={TimeSelectVariant({variant, size, disabled, className})} />
    }
    variant = disabled ? 'none' :  variant
    return <button
        className={TimeSelectVariant({variant, size, disabled, className})}
        disabled={disabled ?? false}
        {...props}
    ><Text variant='body-md' className={TimeSelectTextVariant({variant, disabled})}>{children}</Text>
    </button>
}