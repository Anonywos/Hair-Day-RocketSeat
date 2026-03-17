import TimeSelect from "../../components/time-select";

interface ItemList {
    hour: string,
    disabled: boolean,
    selected: boolean
}

interface TimeSelectListProps {
    list: ItemList[],
    handleClick: (i: string) => void
}

export default function TimeSelectList({list, handleClick}: TimeSelectListProps) {

    return <ol className={`grid grid-cols-4 gap-2 items-center`}>
        {list.map((time) => (
            <li key={time.hour}>
                <TimeSelect
                    type="button"
                    // isLoading={true}
                    variant={time.selected ? 'selected' : 'default'}
                    disabled={time.disabled}
                    onClick={() => handleClick(time.hour)}
                >{time.hour}</TimeSelect>
            </li>
        ))}
    </ol>
}