import React from 'react'
import chuckSignature from '../../../assets/chuckSignature.png'

type ChuckLogoProps = {
    className?: string
}

export const ChuckLogo = ({ className }: ChuckLogoProps): JSX.Element => {
    return <img className={className} src={chuckSignature} />
}
