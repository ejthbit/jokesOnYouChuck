import { render, RenderOptions, RenderResult, within } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../../redux/store/store'

export type WrapperProps = {
    children: React.ReactElement
}
const AllTheProviders = ({ children }: WrapperProps): React.ReactElement => {
    return <Provider store={store}>{children}</Provider>
}

const customRender = (ui: React.ReactElement, options?: RenderOptions): RenderResult =>
    render(ui, { wrapper: AllTheProviders as React.ComponentType, ...options })

export const getSelectOptions = (): (string | null)[] => {
    const listbox = document.body.querySelector('ul[role=listbox]') as HTMLElement

    if (listbox) {
        const optionNodes = within(listbox).getAllByRole('option')
        return optionNodes.map((optionNode) => optionNode.textContent)
    }
    return []
}
export const errorMock = {
    name: 'Error',
    message: 'Request failed with status code 404',
    stack: 'Error: Request failed with status code 404\n',
    code: '404',
}

// Re-export everything
export * from '@testing-library/react'
// Override render method
export { customRender as render }
