export const sliderFields: SliderFields[] = [
    {
        label: 'Продуктивность',
        selfAnnotation: 'Как быстро справляешься с задачами?',
        annotation: 'Как быстро он/она справляется с задачами?'
    },
    {
        label: 'Коммуникативность',
        selfAnnotation: 'Как тебе даётся общение с коллегами?',
        annotation: 'Как ему/ей даётся общение с коллегами?'
    },
    {
        label: 'Инициатива',
        selfAnnotation: 'Насколько тебе интересен текущий проект?',
        annotation: 'Насколько ему/ей интересен текущий проект?'
    },
    {
        label: 'Профессиональные навыки ',
        selfAnnotation: 'Насколько твои навыки соотносятся с проектом?',
        annotation: 'Насколько его/ее навыки соотносятся с проектом?'
    },
]

export const leadSliderFields: Omit<SliderFields, 'selfAnnotation'>[] = [
    {
        label: 'Лидерские качества',
        annotation: 'Берёт ли он/она ответственность за решения?'
    },
    {
        label: 'Стрессоустойчивость',
        annotation: 'Как он/она реагирует на сложные ситуации?'
    },
    {
        label: 'Работа с информацией',
        annotation: 'Насколько хорошо он/она умеет преподнести информацию?'
    },
    {
        label: 'Атмосфера в команде',
        annotation: 'Какое участие он/она принимает в создании дружественной атмосферы?'
    },
]

export const textAreaFields: TextAreaFields[] = [
    {
        label: 'Сильные стороны',
        placeholder: 'Напиши навыки, которые могут помочь команде::'
    },
    {
        label: 'Области роста',
        placeholder: 'Напиши навыки, в которых ощущаешь нехватку:'
    }
]

export const selfTextAreaFields: TextAreaFields[] = [
    {
        label: 'Достижения',
        placeholder: 'Напиши решения, которыми гордишься:'
    },
    {
        label: 'Как это было достигнуто?',
        placeholder: 'Качества или обстоятельства, которые позволили достичь этого:'
    },
]


interface TextAreaFields{
    label: string,
    placeholder: string
}

interface SliderFields {
    label: string,
    annotation: string,
    selfAnnotation: string
}