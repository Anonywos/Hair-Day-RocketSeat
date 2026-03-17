import Agenda from "../core-components/agenda/agenda";
import MainContainer from "../core-components/main-container";
import Scheduling from "../core-components/schedule/scheduling";
import Logo from "../../public/Logo.svg?react"

export default function MainPage() {
    return <MainContainer>
        <div className="absolute top-0 left-0 rounded-br-lg bg-gray-600 px-5 py-3"><Logo /></div>
        <Scheduling />
        <Agenda />
    </MainContainer>
}