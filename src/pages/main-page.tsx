import Agenda from "../core-components/agenda/agenda";
import MainContainer from "../core-components/main-container";
import Scheduling from "../core-components/schedule/scheduling";


export default function MainPage() {
    return <MainContainer>
        <Scheduling />
        <Agenda />
    </MainContainer>
}