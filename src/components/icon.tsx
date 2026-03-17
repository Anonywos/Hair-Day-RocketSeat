import type React from "react"


interface IconProps extends React.ComponentProps<'svg'> {
    svg: React.FC<React.ComponentProps<'svg'>>
}

export default function Icon({
    svg: SvgComponent,
    className,
    ...props
}: IconProps) {
    return <SvgComponent className={className} {...props}/>
}