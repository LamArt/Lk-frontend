import { EmployeeFormData } from "../store/reviewApi/reviewApi"

export const sliderFields: SliderFields[] = [
    {
        label: 'Продуктивность',
        selfAnnotation: 'Как быстро справляешься с задачами?',
        annotation: 'Как быстро он/она справляется с задачами?',
        fieldName: 'productivity_rate'
    },
    {
        label: 'Коммуникативность',
        selfAnnotation: 'Как тебе даётся общение с коллегами?',
        annotation: 'Как ему/ей даётся общение с коллегами?',
        fieldName: 'communication_rate'
    },
    {
        label: 'Инициатива',
        selfAnnotation: 'Насколько тебе интересен текущий проект?',
        annotation: 'Насколько ему/ей интересен текущий проект?',
        fieldName: 'initiative_rate'
    },
    {
        label: 'Профессиональные навыки ',
        selfAnnotation: 'Насколько твои навыки соотносятся с проектом?',
        annotation: 'Насколько его/ее навыки соотносятся с проектом?',
        fieldName: 'hard_skills_rate'
    },
]

// export const leadSliderFields: Omit<SliderFields, 'selfAnnotation'>[] = [
//     {
//         label: 'Лидерские качества',
//         annotation: 'Берёт ли он/она ответственность за решения?',
//         fieldName: ''
//     },
//     {
//         label: 'Стрессоустойчивость',
//         annotation: 'Как он/она реагирует на сложные ситуации?',
//         fieldName: ''
//     },
//     {
//         label: 'Работа с информацией',
//         annotation: 'Насколько хорошо он/она умеет преподнести информацию?',
//         fieldName: ''
//     },
//     {
//         label: 'Атмосфера в команде',
//         annotation: 'Какое участие он/она принимает в создании дружественной атмосферы?',
//         fieldName: ''
//     },
// ]

export const textAreaFields: TextAreaFields[] = [
    {
        label: 'Что понравилось:',
        placeholder: 'Напиши навыки, которые могут помочь команде:',
        fieldName: 'strengths'
    },
    {
        label: 'Что могло быть лучше:',
        placeholder: 'Напиши навыки, в которых ощущаешь нехватку:',
        fieldName: 'weaknesses'
    }
]

interface TextAreaFields{
    label: string,
    placeholder: string,
    fieldName: keyof EmployeeFormData
}

interface SliderFields {
    label: string,
    annotation: string,
    selfAnnotation: string,
    fieldName: keyof EmployeeFormData
}