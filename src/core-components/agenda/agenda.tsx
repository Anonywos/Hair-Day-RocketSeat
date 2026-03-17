import React from "react";
import Container from "../../components/container";
import AgendaHeader from "./agenda-header";
import AgendaList from "./agenda-list";


export default function Agenda() {
    const [ date, setDate ] = React.useState<string>('');

    function handleDate(e: React.ChangeEvent<HTMLInputElement>) {
        setDate(e.target.value);
    }

    return <Container as="section" className="flex flex-1 flex-col h-full py-20 px-28 gap-8">
        <AgendaHeader date={date} handleDate={handleDate} />
        <AgendaList date={date} />
    </Container>
}