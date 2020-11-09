import { render as rtlRender } from '@testing-library/react'
import React from 'react'
import { unmountComponentAtNode } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { errorMock, render } from '../../common/utils/testUtils'
import { getJokeInitState, getJokeQueryInitState, jokeByQueryNotFound } from '../../redux/helpers/chuckSliceHelpers'
import ChuckContent from './ChuckContent'

const mockStore = configureStore([])

describe('<ChuckContent />', () => {
    it('Renders <ChuckContent /> component correctly', () => {
        const div = document.createElement('div')
        render(<ChuckContent />, { container: div })
        unmountComponentAtNode(div)
    })
    it('Contains <SpinningChuck /> component', () => {
        const { getByTestId } = render(<ChuckContent />)
        expect(getByTestId('SpinningChuck')).toBeInTheDocument()
    })
    it('Shows Loading indicator when joke is loading', async () => {
        const storeState = {
            chuck: {
                joke: {
                    data: getJokeInitState(),
                    queryJokes: getJokeQueryInitState(),
                    isLoading: true,
                    error: undefined,
                },
            },
        }
        const store = mockStore(storeState)
        const { findByTestId } = rtlRender(
            <Provider store={store}>
                <ChuckContent />
            </Provider>
        )
        expect(await findByTestId('loadingIndicator')).toBeInTheDocument()
    })
    it('When joke fails to load, error message is shown', async () => {
        const storeState = {
            chuck: {
                joke: {
                    data: getJokeInitState(),
                    queryJokes: getJokeQueryInitState(),
                    isLoading: false,
                    error: errorMock,
                },
            },
        }
        const store = mockStore(storeState)
        const { findByText } = rtlRender(
            <Provider store={store}>
                <ChuckContent />
            </Provider>
        )
        expect(await findByText('Chuck is tired today, please try it later.')).toBeInTheDocument()
    })
    it('User is noticed with message when joke for query does not exists', async () => {
        const storeState = {
            chuck: {
                joke: {
                    data: jokeByQueryNotFound(),
                    queryJokes: { ...getJokeQueryInitState(), total: 0 },
                    isLoading: false,
                    error: undefined,
                },
            },
        }
        const store = mockStore(storeState)
        const { findByText } = rtlRender(
            <Provider store={store}>
                <ChuckContent />
            </Provider>
        )
        expect(await findByText('Sorry, joke for this query was not found :(')).toBeInTheDocument()
    })
    it('Joke is shown on render', async () => {
        const storeState = {
            chuck: {
                joke: {
                    data: { ...getJokeInitState(), value: 'Chuck is testing his jokes' },
                    queryJokes: getJokeQueryInitState(),
                    isLoading: false,
                    error: undefined,
                },
            },
        }
        const store = mockStore(storeState)
        const { findByText } = rtlRender(
            <Provider store={store}>
                <ChuckContent />
            </Provider>
        )
        expect(await findByText('Chuck is testing his jokes')).toBeInTheDocument()
    })
})
