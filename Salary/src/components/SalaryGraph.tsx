import { useState } from "react";
import './SalaryGraph.scss';

const months = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

export default function SalaryGraph() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    const handleColumnClick = (index: number) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    const monthColumns = Array.from({ length: 12 }, (_, index: number) => {
        const isCurrentMonth = index === currentMonth;

        return (
            <div
                key={index}
                className={`graphForm-monthColumn ${activeIndex === index ? 'active' : ''}`}
                onClick={() => handleColumnClick(index)}
            >
                <div key={index} className={`graphForm-monthColumn-cyrcle ${isCurrentMonth ? 'currentMonth' : ''} ${activeIndex === index ? 'active' : ''}`} style={{ marginBottom: `${Math.random() * 200}px` }}>
                    {index * 20}
                </div>
            </div>
        );
    });

    return (
        <div className="graphForm">
            <p className={"graphForm-h7"}>Статистика выполненных Story Points</p>
            <div className={"graphForm-graph"}>
                <div className={"graphForm-ordinate"}>
                    <p className={"graphForm-ordinate-text"}>Story Points</p>
                </div>
                <div className={"graphForm-verticalLine"}/>
                {monthColumns}
            </div>
            <div className={"graphForm-abscissa"}>
                {months.map((month, index) => (
                    <div key={index} className={`graphForm-month ${activeIndex === index ? 'active' : ''}`}>{month}</div>
                ))}
            </div>
        </div>
    );
}
