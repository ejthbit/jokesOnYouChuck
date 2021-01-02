import React from 'react'
import clsx from 'clsx'
import chuckApproved from '../../../assets/chuckApproved.png'
import useStyles from './SpinningChuck.styles'

type SpinningChuckProps = {
    className?: string
}
const SpinningChuck = ({ className }: SpinningChuckProps): JSX.Element => {
    const classes = useStyles()
    return <img alt="SpinningChuck" className={clsx(classes.imgSpin, className)} src={chuckApproved} />
}
export default SpinningChuck
