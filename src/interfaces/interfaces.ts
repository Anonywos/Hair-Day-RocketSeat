export interface ClientSubmit {
    name: string,
    hour: string,
    date: string
}

export interface ItemList {
    hour: string,
    disabled: boolean,
    selected: boolean
}

export interface DayShift {
    name: string,
    hours: ItemList[]
}

export interface Client {
    id: string,
    name: string,
    hour: string
}

export interface TimeDay {
    hourDay: string,
    clients: Client[]
}

export interface Agenda {
    date: string,
    timesDay: TimeDay[]
}