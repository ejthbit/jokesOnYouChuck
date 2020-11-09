import React from 'react'
import App from './App'
import ReactDOM from 'react-dom'
import { render } from '../common/utils/testUtils'

it('renders without crashing', () => {
    const div = document.createElement('div')
    render(<App />, { container: div })
    ReactDOM.unmountComponentAtNode(div)
})
