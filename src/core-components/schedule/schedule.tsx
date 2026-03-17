import Text from "../../components/text";
import TextInput from "../../components/text-input";
import TimeSelectList from "./time-select-list";
import CalendarIcon from "../../assets/icons/calendar-blank.svg?react"
import UserIcon from "../../assets/icons/user-square.svg?react"
import Button from "../../components/button";
import React from "react";
import type { DayShift } from "../../interfaces/interfaces";
import useSchedule from "../../hooks/use-schedule";

export default function Schedule() {
    const { submitSchedule, getAgendaTimes } = useSchedule();
    const [ hourList, setHourList ] = React.useState<DayShift[]>([]);
    const [ date, setDate ] = React.useState<string>('')
    const [ clientName, setClientName ] = React.useState<string>('')
    const [ hour, setHour ] = React.useState<string>('')
    const [ disabledSubmit, setDisabledSubmit ] = React.useState<boolean>(true);

    React.useEffect(() => {
        let cancelled = false;

        async function LoadList() {
            if (date) {
                const list = await getAgendaTimes(date)
                if (!cancelled) {
                    setHourList(list);
                }
            }
        }
        LoadList();

        return () => {
            cancelled = true
        }
    }, [date, getAgendaTimes])

    React.useEffect(() => {
        setClientName('');
        setHour('');
    }, [date])

    function handleClientName(e: React.ChangeEvent<HTMLInputElement>) {
        setClientName(e.target.value);
    }

    function handleScheduleDate(e: React.ChangeEvent<HTMLInputElement>) {
        setDate(e.target.value);
    }

    function handleScheduleHour(i: string) {
        setHourList((prevList) => prevList.map((prevHours) => (
            {
                ...prevHours, hours: prevHours.hours.map(
                    (h) => {
                        if (h.hour === i){
                            setHour(!h.selected ? i : '')
                            return {...h, selected: !h.selected}
                        }else {
                            return {...h, selected: false}
                        }
                    }
                )
            })
        ))
    }

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const schedule = {
            name: clientName,
            date: date,
            hour: hour
        }
        await submitSchedule(schedule);
        setClientName('');
        setDate('');
        handleScheduleHour(hour);
        setHour('');
    }

    React.useEffect(() => {
        if (clientName !== '' && date !== '' && hour !== ''){
            setDisabledSubmit(false)
        }else {
            setDisabledSubmit(true)
        }
    }, [clientName, date, hour])

    return <form onSubmit={handleSubmit} className="flex flex-col items-start gap-6 w-full">
        <div className="flex flex-col gap-8 w-full ">
            <div>
                <Text as='h3' variant='body-md-bold' className="text-gray-200">Data</Text>
                <TextInput 
                    type='date'
                    value={date}
                    onChange={handleScheduleDate}
                    icon={CalendarIcon} 
                />
            </div>
            <div className="flex flex-col gap-2">
                <Text as='h3' variant='body-md-bold' className="text-gray-200">Horários</Text>
                {hourList.length > 0 ?
                    (
                        <ol className="flex flex-col gap-3">
                            {
                                hourList.map((time) => (
                                    <li key={time.name}>
                                        <Text variant='body-sm' className="text-gray-300">{time.name}</Text>
                                        <TimeSelectList list={time.hours} handleClick={handleScheduleHour} />
                                    </li>
                                ))
                            }
                        </ol>
                    ) : (
                        <Text variant='body-sm' className="text-gray-300">Selecione uma data</Text>
                    )
                }
            </div>
            <div>
                <Text as='h3' variant='body-md-bold' className="text-gray-200">Cliente</Text>
                <TextInput 
                    value={clientName}
                    onChange={handleClientName}
                    icon={UserIcon} 
                />
            </div>
        </div>
        <Button
            type="submit"   
            className="w-full"
            disabled={disabledSubmit}
        >AGENDAR</Button>
    </form>
}