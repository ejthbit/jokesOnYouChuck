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
        expect(screen.getByTestId('chuck-logo-img')).toBeInTheDocument()
    })
    it('Contains inputField with Query search... placeholder', () => {
        expect(screen.getByTestId('query-search-input')).toHaveTextContent('Query search...')
    })
    it('Contains SelectWithBtn component', () => {
        expect(screen.getByTestId('category-select-with-submitBtn')).toBeInTheDocument()
    })
})
