import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './SuperButton.module.css'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    xType?: string
}

const SuperButton: React.FC<SuperButtonPropsType> = (props) => {
    const {xType, className, disabled, ...restProps} = props

    const finalClassName = `${s.button} ${!xType ? s.default : xType === 'red' ? s.red : xType === 'noted' ? s.disabled : xType === 'secondary' ? s.secondary : ''}`

    return (
        <button disabled={disabled} className={finalClassName} {...restProps} />
    )
}

export default SuperButton
