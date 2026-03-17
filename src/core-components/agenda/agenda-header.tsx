import Text from "../../components/text";
import TextInput from "../../components/text-input";
import CalendarIcon from "../../assets/icons/calendar-blank.svg?react"
import type React from "react";

interface AgendaHeaderProps {
    date: string,
    handleDate: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

export default function AgendaHeader({date, handleDate}: AgendaHeaderProps) {
    return <header className="flex flex-row items-center justify-between">
        <div className="flex flex-col w-[76%] gap-1">
            <Text as="h2" variant='body-lg-bold' className="text-gray-100">Sua agenda</Text>
            <Text variant='body-sm' className="text-gray-300">Consulte os seus cortes de cabelo agendados por dia</Text>
        </div>
        <TextInput
            type="date"
            value={date}
            onChange={handleDate}
            icon={CalendarIcon}
        />
    </header>
}