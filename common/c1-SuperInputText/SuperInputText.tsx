import React, {
    ChangeEvent,
    DetailedHTMLProps,
    InputHTMLAttributes,
    KeyboardEvent,
    ReactNode,
} from 'react'
import s from './SuperInputText.module.css'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута, кроме type
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = Omit<DefaultInputPropsType, 'type'> & {
    // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: ReactNode
    spanClassName?: string
}

const SuperInputText: React.FC<SuperInputTextPropsType> = (props) => {

    const {onChange, onChangeText, onKeyDown, onEnter, error, className, spanClassName, id, ...restProps} = props

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e)// если есть пропс onChange, то передать ему е (поскольку onChange не обязателен)

        onChangeText?.(e.currentTarget.value)
    }
    const onKeyDownCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyDown?.(e)

        onEnter && // если есть пропс onEnter
        e.key === 'Enter' && // и если нажата кнопка Enter
        onEnter() // то вызвать его
    }

    const finalSpanClassName = `${error ? s.error : ''}`
    const finalInputClassName = `${s.input} ${error ? s.errorInput : ''}`

    return (
        <div className={s.inputWrapper}>
            <input id={id} type={'text'} onChange={onChangeCallback} onKeyDown={onKeyDownCallback}
                className={finalInputClassName}
                {...restProps}/>
            <span id={id ? id + '-span' : undefined} className={finalSpanClassName}>{error}</span>
        </div>
    )
}

export default SuperInputText
