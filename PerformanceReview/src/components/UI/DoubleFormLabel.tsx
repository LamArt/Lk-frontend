import { Flex } from "antd"
import './DoubleFormLabel.scss'

export default function DoubleFormLabel({label, annotation}: DoubleFormLabelProps){
    return <Flex className="doubleLabel" vertical align="center">
        <h3 className="doubleLabel-label">{label}</h3>
        <p className="doubleLabel-annotation">{annotation}</p>
    </Flex>
}

interface DoubleFormLabelProps{
    label: string,
    annotation: string
}