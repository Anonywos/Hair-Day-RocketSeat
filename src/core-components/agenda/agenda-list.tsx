import Icon from "../../components/icon"
import SunIcon from "../../assets/icons/sun-horizon.svg?react"
import AfternoonIcon from "../../assets/icons/cloud-sun.svg?react"
import EveningIcon from "../../assets/icons/moon-stars.svg?react"
import Text from "../../components/text"
import ButtonIcon from "../../components/button-icon"
import TrashIcon  from "../../assets/icons/trash.svg?react"
import useSchedule from "../../hooks/use-schedule"
import React from "react"
import type { TimeDay } from "../../interfaces/interfaces"

interface AgendaListHeader{
    date: string
}

export default function AgendaList({date}: AgendaListHeader) {
    const { getAgendaByDay, deleteClient } = useSchedule();
    const [ agenda, setAgenda ] = React.useState<TimeDay[]>()

    React.useEffect(() => {
        let cancelled = false

        async function getAgenda(){
            const a = await getAgendaByDay(date);
            if (a && !cancelled) {
                const sortTimes = a.timesDay.sort((a, b) => {
                    const order = ["Manhã", "Tarde", "Noite"];
                    return order.indexOf(a.hourDay) - order.indexOf(b.hourDay);
                })
                const sortHours = sortTimes.map((time) => ({
                    ...time,
                    clients: time.clients.sort((a, b) => {
                        const hourA = Number(a.hour.split(':')[0])
                        const hourB = Number(b.hour.split(':')[0])
                        return hourA - hourB;
                    })
                }))
                setAgenda(sortHours)
            } else {
                setAgenda([])
            }
        }
        getAgenda()

        return () => {
            cancelled = true
        }
    }, [date, getAgendaByDay])

    function SwitchIcon(hourDay: string){
        if (hourDay === 'Manhã') {
            return SunIcon;
        }else if (hourDay === 'Tarde') {
            return AfternoonIcon;
        }else if (hourDay === 'Noite') {
            return EveningIcon;
        }else {
            return SunIcon;
        }
    }

    function HoursDays(hourDay: string){
        if (hourDay === 'Manhã') {
            return '09h-12h';
        }else if (hourDay === 'Tarde') {
            return '13h-18h';
        }else if (hourDay === 'Noite') {
            return '18h-21h';
        }else {
            return '';
        }
    }

    function handleDeleteClient(hour: string, id: string) {
        deleteClient(date, hour, id);
    }

    return <ol className="flex flex-col gap-3 overflow-y-auto">
        {(agenda && agenda.length > 0) ? (agenda.map((time, index) => (
            <li key={index}>
                <div className="flex flex-col rounded border border-gray-600">
                    <div className="flex flex-row items-center justify-between border-b border-gray-600 py-3 px-5 gap-3">
                        <Icon svg={SwitchIcon(time.hourDay)} className="fill-yellow-dark" />
                        <Text variant='body-sm' className="flex-1 text-gray-300">{time.hourDay}</Text>
                        <Text variant='body-sm' className="text-gray-400">{HoursDays(time.hourDay)}</Text>
                    </div>
                    <ol className="flex flex-col gap-1 p-5">
                        {time.clients.map((client) => ( 
                            <li key={client.id} className="flex gap-5 items-center">
                                <Text variant='body-md-bold' className="flex w-10 text-gray-200 items-center">{client.hour}</Text>
                                <Text variant='body-md' className="flex-1 text-gray-200">{client.name}</Text>
                                <ButtonIcon 
                                    icon={TrashIcon} 
                                    variant='primary' 
                                    size='base' 
                                    onClick={() => handleDeleteClient(time.hourDay, client.id)}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </li>
        ))) : (
            <>
                <Text variant='body-md-bold' className="text-gray-200">Você ainda não tem agendamentos cadastrados nesse período.</Text>
            </>
        )}
    </ol>
}