import Text from "../../components/text";

export default function SchedulingHeader(){
    return <header className="flex flex-col gap-3">
        <Text as="h2" variant='body-lg-bold' className="text-gray-100">Agende um atendimento</Text>
        <Text variant='body-sm' className="text-gray-300">Selecione data, horário e informe o nome do cliente para criar o agendamento</Text>
    </header>
}