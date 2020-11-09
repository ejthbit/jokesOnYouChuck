import React from 'react'
import { unmountComponentAtNode } from 'react-dom'
import { render } from '../../common/utils/testUtils'
import ChuckView from './ChuckView'

describe('<ChuckView />', () => {
    it('Renders <ChuckView /> component correctly', () => {
        const div = document.createElement('div')
        render(<ChuckView />, { container: div })
        unmountComponentAtNode(div)
    })
    it('Contains <ChuckLogo /> component', () => {
        const { getByTestId } = render(<ChuckView />)
        expect(getByTestId('chuck-logo-img')).toBeInTheDocument()
    })
    it('Contains inputField with Query search... placeholder', () => {
        const { getByTestId } = render(<ChuckView />)
        expect(getByTestId('query-search-input')).toHaveTextContent('Query search...')
    })
    it('Contains SelectWithBtn component', () => {
        const { getByTestId } = render(<ChuckView />)
        expect(getByTestId('category-select-with-submitBtn')).toBeInTheDocument()
    })
})
