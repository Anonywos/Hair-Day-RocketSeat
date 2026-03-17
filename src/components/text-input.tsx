import React from "react";
import Icon from "./icon";
import { cva, cx, type VariantProps } from "class-variance-authority";
import ButtonIcon from "./button-icon";
import CaretDownIcon from "../assets/icons/caret-down.svg?react"

const TextInputCardVariant = cva(`
        relative flex flex-row items-center justify-start rounded-lg
        gap-2 p-3 
    `,
    { 
        variants: {
            variant: {
                primary: 'border-2 border-gray-400 focus-within:border-yellow'
            }
        },
        defaultVariants: {
            variant: 'primary'
        }
    }
);

const TextInputIconVariant = cva('h-5 w-5', {
    variants: {
        variant: {
            primary: 'fill-yellow'
        }
    },
    defaultVariants: {
        variant: 'primary'
    }
})

const TextInputVariant = cva(`
        w-full h-5 [&::-webkit-calendar-picker-indicator]:hidden 
    `, {
    variants: {
        variant: {
            primary: 'text-gray-200 placeholder:text-gray-400 outline-none'
        }
    },
    defaultVariants: {
        variant: 'primary'
    }
})

interface TextInputProps extends React.ComponentProps<'input'>
    , VariantProps<typeof TextInputVariant> {
    icon?: React.FC<React.ComponentProps<'svg'>>
}

export default function TextInput({
    type = 'text',
    icon,
    variant,
    className,
    ...props
}: TextInputProps) {
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const openDatePicker = () => {
        const input = inputRef.current;
        if (!input) return;

        const pickerInput = input as HTMLInputElement & {
            showPicker?: () => void;
        };

        if (typeof pickerInput.showPicker === "function") {
            pickerInput.showPicker();
        } else {
            input.focus();
            input.click();
        }
    };

    return <div className={TextInputCardVariant({variant})}>
        {icon && <Icon svg={icon} className={TextInputIconVariant({variant})} />}
        <input 
            ref={inputRef}
            type={type} 
            className={TextInputVariant({variant, className})} 
            placeholder={type==='text' ? 'Nome do cliente' : undefined} 
            {...props} 
        />
        {type === 'date' && (
            <ButtonIcon
                type="button"
                icon={CaretDownIcon}
                className="absolute top-1/2 -translate-y-1/2 right-2" 
                onClick={openDatePicker}
            />
        )}
    </div>
}