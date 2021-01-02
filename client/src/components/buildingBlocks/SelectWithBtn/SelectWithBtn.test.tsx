import userEvent from '@testing-library/user-event'
import { render as rtlRender, within, screen, cleanup } from '@testing-library/react'
import React from 'react'
import { unmountComponentAtNode } from 'react-dom'
import { errorMock, getSelectOptions, render } from '../../../common/utils/testUtils'
import selectEvent from 'react-select-event'
import SelectWithBtn from './SelectWithBtn'

describe('<SelectWithBtn />', () => {
    const onClick = jest.fn()
    const onSelectChange = jest.fn()

    it('Renders <SelectWithBtn /> component correctly', () => {
        const div = document.createElement('div')
        render(
            <SelectWithBtn
                btnText="test"
                onBtnClick={onClick}
                onSelectChange={onSelectChange}
                selectData={['', 'test']}
                selectedItem={'test'}
            />,
            { container: div }
        )
        unmountComponentAtNode(div)
    })
    it('On btn click', () => {
        rtlRender(
            <SelectWithBtn
                btnText="testBtn"
                onBtnClick={onClick}
                onSelectChange={onSelectChange}
                selectData={['', 'test']}
                selectedItem={'test'}
            />
        )
        userEvent.click(screen.getByRole('button', { name: 'testBtn' }))
        expect(onClick).toHaveBeenCalledTimes(1)
    })
    it('Shows select options when SelectMenu is open with placeholder item', async () => {
        rtlRender(
            <SelectWithBtn
                selectLbl="Test categories"
                btnText="testBtn"
                onBtnClick={onClick}
                onSelectChange={onSelectChange}
                selectData={['testItem', 'selectedTestItem']}
                selectedItem={'selectedTestItem'}
            />
        )
        selectEvent.openMenu(screen.getByLabelText('Test categories:'))
        const selectOptions = getSelectOptions()
        expect(selectOptions).toEqual(['Please select test categories', 'testItem', 'selectedTestItem'])
    })
    it('Select onChange should not be called if selected element has the current value (value did not change)', async () => {
        rtlRender(
            <SelectWithBtn
                selectLbl="Test categories"
                btnText="testBtn"
                onBtnClick={onClick}
                onSelectChange={onSelectChange}
                selectData={['testItem', 'selectedTestItem']}
                selectedItem={'selectedTestItem'}
            />
        )
        selectEvent.openMenu(screen.getByLabelText('Test categories:'))
        const listbox = within(screen.getByRole('listbox'))
        userEvent.click(listbox.getByText('selectedTestItem'))
        expect(onSelectChange).toHaveBeenCalledTimes(0)
    })
    it('Select onChange called and selected value is changed', async () => {
        rtlRender(
            <SelectWithBtn
                selectLbl="Test categories"
                btnText="testBtn"
                onBtnClick={onClick}
                onSelectChange={onSelectChange}
                selectData={['testItem', 'selectedTestItem']}
                selectedItem={'selectedTestItem'}
            />
        )
        selectEvent.openMenu(screen.getByLabelText('Test categories:'))
        const listbox = within(screen.getByRole('listbox'))
        userEvent.click(listbox.getByText('testItem'))
        expect(onSelectChange).toHaveBeenCalledTimes(1)
        expect(screen.getByText('testItem')).toBeInTheDocument()
    })
    it('When Select options data loading indicator is shown', async () => {
        rtlRender(
            <SelectWithBtn
                selectLbl="Test categories"
                btnText="testBtn"
                onBtnClick={onClick}
                onSelectChange={onSelectChange}
                isSelectDataLoading={true}
                selectData={[]}
                selectedItem={''}
            />
        )
        selectEvent.openMenu(screen.getByLabelText('Test categories:'))
        expect(await screen.findByRole('progressbar')).toBeInTheDocument()
    })
    it('When Select options data failed to load error.message is shown', async () => {
        rtlRender(
            <SelectWithBtn
                selectLbl="Test categories"
                btnText="testBtn"
                onBtnClick={onClick}
                onSelectChange={onSelectChange}
                isSelectDataLoading={false}
                selectDataError={errorMock}
                selectData={[]}
                selectedItem={''}
            />
        )
        expect(screen.getByText(errorMock.message)).toBeInTheDocument()
    })
})
