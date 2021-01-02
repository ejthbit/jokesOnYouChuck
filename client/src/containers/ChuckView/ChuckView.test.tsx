import React from 'react'
import { unmountComponentAtNode } from 'react-dom'
import { render, screen } from '../../common/utils/testUtils'
import ChuckView from './ChuckView'

describe('<ChuckView />', () => {
    beforeEach(() => {
        render(<ChuckView />)
    })
    it('Renders <ChuckView /> component correctly', () => {
        const div = document.createElement('div')
        render(<ChuckView />, { container: div })
        unmountComponentAtNode(div)
    })
    it('Contains <ChuckLogo /> component', () => {
        expect(screen.getByAltText('chuck-logo-img')).toBeInTheDocument()
    })
    it('Contains inputField with Query search... placeholder', () => {
        expect(screen.getByLabelText('Query search...')).toBeInTheDocument()
    })
    it('Contains SelectWithBtn component', () => {
        expect(screen.getByLabelText('Joke category')).toBeInTheDocument()
    })
})
