import React, { useState, useEffect } from 'react';
import './SalaryGraph.scss';
import { useGetStatisticQuery } from '../../store/Api/Salary.ts';

interface CircleCenter {
    x: number;
    y: number;
}

interface SalaryGraphProps {}

const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const monthsEng = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const SalaryGraph: React.FC<SalaryGraphProps> = () => {
    const [circleCenters, setCircleCenters] = useState<CircleCenter[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [dataLoaded, setDataLoaded] = useState(false);
    const { data } = useGetStatisticQuery();

    const resultArray: number[] = Array.from({ length: 12 }).map((_, index) => {
        const month = monthsEng[index];
        return data && data[month] ? parseInt(data[month], 10) : 0;
    });

    useEffect(() => {
        if (data) {
            setDataLoaded(true);
            getCircleCenters();
        }
    }, [data]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [dataLoaded]);

    const handleResize = () => {
        getCircleCenters();
    };

    const handleColumnClick = (index: number) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    const getCircleCenters = () => {
        const circleElements = document.querySelectorAll('.graphForm-monthColumn-cyrcle');
        const centers = Array.from(circleElements).map((circle: Element) => {
            const boundingBox = (circle as HTMLElement).getBoundingClientRect();
            const centerX = boundingBox.left + boundingBox.width / 2;
            const centerY = boundingBox.top + boundingBox.height / 2;
            return { x: centerX, y: centerY };
        });
        setCircleCenters(centers);
    };

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    const reorderedMonths = [
        ...months.slice(currentMonth + 1),
        ...months.slice(0, currentMonth + 1),
    ];

    const monthColumns = resultArray.map((value, index) => {
        const isCurrentMonth = index === currentMonth;
        return {
            value,
            isCurrentMonth,
            jsx: (
                <div
                    key={index}
                    className={`graphForm-monthColumn ${activeIndex === index ? 'active' : ''}`}
                    onClick={() => handleColumnClick(index)}
                >
                    <div
                        key={index}
                        className={`graphForm-monthColumn-cyrcle ${isCurrentMonth ? 'currentMonth' : ''} ${activeIndex === index ? 'active' : ''}`}
                        style={{ marginBottom: `${value * 0.5}rem` }}
                    >
                        {value}
                    </div>
                </div>
            ),
        };
    });

    const reorderedMonthColumns = [
        ...monthColumns.slice(currentMonth + 1),
        ...monthColumns.slice(0, currentMonth + 1),
    ];

    const lines = dataLoaded ? (
        circleCenters.map((center, index) => {
            if (index < circleCenters.length - 1) {
                const nextCenter = circleCenters[index + 1];
                return (
                    <line
                        key={index}
                        x1={center.x}
                        y1={center.y}
                        x2={nextCenter.x}
                        y2={nextCenter.y}
                        style={{ stroke: '#1C51DB', strokeWidth: 3 }}
                    />
                );
            }
            return null;
        })
    ) : null;

    return (
        <div className="graphForm">
            <p className={'graphForm-h7'}>Статистика выполненных Story Points</p>
            <div className={'graphForm-graph'}>
                <div className={'graphForm-ordinate'}>
                    <p className={'graphForm-ordinate-text'}>Story Points</p>
                </div>
                <div className={'graphForm-verticalLine'} />
                {reorderedMonthColumns.map((monthColumn) => monthColumn.jsx)}
            </div>
            <div className={'graphForm-abscissa'}>
                {reorderedMonths.map((month, index) => (
                    <div key={index} className={`graphForm-month ${activeIndex === months.indexOf(month) ? 'active' : ''}`}>
                        {month}
                    </div>
                ))}
            </div>
            <svg className="graphForm-svg">{lines}</svg>
        </div>
    );
};

export default SalaryGraph;