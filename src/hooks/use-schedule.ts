import type { ClientSubmit, Agenda } from "../interfaces/interfaces";
import useLocalStorage from "use-local-storage";
import { SCHEDULE_KEY } from "../models/schedule-model";
import { useCallback } from "react";

export default function useSchedule() {
    const [ scheduleList, setScheduleList ] = useLocalStorage<Agenda[]>(SCHEDULE_KEY, []);

    async function submitSchedule(i: ClientSubmit){
        const hour = Number(i.hour.split(':')[0]);
        const existAgenda = scheduleList.some((agenda) => agenda.date === i.date);
        const scheduleClient = {
            id: Math.random().toString(36).substring(2, 9),
            name: i.name,
            hour: i.hour
        }

        function updateAgenda() {
            function submitClient(time: string){
                setScheduleList((agendas) => agendas?.map(
                    (agenda) => {
                        if(agenda.date !== i.date) return agenda;
                        if(agenda.timesDay.some((t) => t.hourDay === time)){
                            return {
                                ...agenda,
                                timesDay: agenda.timesDay.map(
                                    (t) => t.hourDay === time 
                                        ? {...t, clients: [...t.clients, scheduleClient]} 
                                        : t
                                )   
                            }
                        }else {
                            return {
                                ...agenda,
                                timesDay: [...agenda.timesDay, {hourDay: time, clients: [scheduleClient]}] 
                            }
                        }
                    }
                ))
            }

            if(hour <= 12){
                submitClient('Manhã');
            }else if (hour > 12 && hour <19) {
                submitClient('Tarde');
            }else {
                submitClient('Noite');
            }
        }

        if (existAgenda) {
            updateAgenda();
        }else {
            setScheduleList((prev) => (
                prev ? [...prev, {date: i.date, timesDay: []}] 
                : [{date: i.date, timesDay: []}]
            ));
            updateAgenda();
        }
    }

    const getAgendaByDay = useCallback(async (date:string) => {
        return scheduleList.filter((prev) => prev.date === date)[0];
    }, [scheduleList])

    const getAgendaTimes = useCallback(async (date:string) => {
        const agenda = await getAgendaByDay(date);
        let existTimes = new Array<string>();
        if (agenda) {
            existTimes = agenda.timesDay.map((times) => times.clients.map((client) => client.hour)).flat();
        }
        
        
        function ExistTime(t: string) {
            return existTimes.find((time) => time === t) ? true : false;
        }

        const timesList = [
            {
                name: 'Manhã',
                hours: [
                    {
                        hour: '09:00',
                        disabled: ExistTime('09:00'),
                        selected: false
                    },
                    {
                        hour: '10:00',
                        disabled: ExistTime('10:00'),
                        selected: false
                    },
                    {
                        hour: '11:00',
                        disabled: ExistTime('11:00'),
                        selected: false
                    },
                    {
                        hour: '12:00',
                        disabled: ExistTime('12:00'),
                        selected: false
                    },
                ]
            },
            {
                name: 'Tarde',
                hours: [
                    {
                        hour: '13:00',
                        disabled: ExistTime('13:00'),
                        selected: false
                    },
                    {
                        hour: '14:00',
                        disabled: ExistTime('14:00'),
                        selected: false
                    },
                    {
                        hour: '15:00',
                        disabled: ExistTime('15:00'),
                        selected: false
                    },
                    {
                        hour: '16:00',
                        disabled: ExistTime('16:00'),
                        selected: false
                    },
                    {
                        hour: '17:00',
                        disabled: ExistTime('17:00'),
                        selected: false
                    },
                    {
                        hour: '18:00',
                        disabled: ExistTime('18:00'),
                        selected: false
                    },
                ]
            },
            {
                name: 'Noite',
                hours: [
                    {
                        hour: '19:00',
                        disabled: ExistTime('19:00'),
                        selected: false
                    },
                    {
                        hour: '20:00',
                        disabled: ExistTime('20:00'),
                        selected: false
                    },
                    {
                        hour: '21:00',
                        disabled: ExistTime('21:00'),
                        selected: false
                    },
                ]
            }
        ]
        return timesList 
    }, [getAgendaByDay])

    async function deleteClient(date: string, hourDay: string, idClient: string) {
        setScheduleList((prev) => prev?.map((agenda) => (
            agenda.date === date
            ? ({
                ...agenda,
                timesDay: agenda.timesDay.map((time) => (
                    time.hourDay === hourDay 
                    ? {
                        ...time,
                        clients: time.clients.filter((client) => client.id !== idClient)
                    }
                    : time
                ))
            })
            : agenda
        )))
    }

    return {
        submitSchedule,
        getAgendaByDay,
        getAgendaTimes,
        deleteClient
    }
}