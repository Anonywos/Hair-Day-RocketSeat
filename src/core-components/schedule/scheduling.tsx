import Container from "../../components/container";
import Schedule from "./schedule";
import SchedulingHeader from "./scheduling-header";


export default function Scheduling() {
    return <Container as="section" className="flex flex-col h-full max-w-[35%] rounded-xl bg-gray-700 p-20 gap-8">
        <SchedulingHeader />
        <Schedule />
    </Container>
}