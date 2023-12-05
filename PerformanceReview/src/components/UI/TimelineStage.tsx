import { Flex } from "antd"
import './TimelineStage.scss'

export default function TimelineStage({orderNumber, label, active, done, available}: TimelineStageProps){
    return <Flex vertical align="center" className="stage">
        <div className="stage-number" style={{
            backgroundColor: active ? '#1C51DB' : done ? '#888888' : '#D9D9D9',
            cursor: available ? 'pointer' : 'default'
        }}>
            {orderNumber}
        </div>
        {label && <p className="stage-label">{label}</p>}
    </Flex>
}

interface TimelineStageProps{
    orderNumber: number,
    label?: string,
    active?: boolean,
    done?: boolean,
    available: boolean
}