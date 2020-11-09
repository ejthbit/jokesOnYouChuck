import userEvent from '@testing-library/user-event'
import { render as rtlRender, within } from '@testing-library/react'
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
        const { getByText } = rtlRender(
            <SelectWithBtn
                btnText="testBtn"
                onBtnClick={onClick}
                onSelectChange={onSelectChange}
                selectData={['', 'test']}
                selectedItem={'test'}
            />
        )
        userEvent.click(getByText('testBtn'))
        expect(onClick).toHaveBeenCalledTimes(1)
    })
    it('Shows select options when SelectMenu is open with placeholder item', async () => {
        const { getByLabelText } = rtlRender(
            <SelectWithBtn
                selectLbl="Test categories"
                btnText="testBtn"
                onBtnClick={onClick}
                onSelectChange={onSelectChange}
                selectData={['testItem', 'selectedTestItem']}
                selectedItem={'selectedTestItem'}
            />
        )
        selectEvent.openMenu(getByLabelText('Test categories:'))
        const selectOptions = getSelectOptions()
        expect(selectOptions).toEqual(['Please select test categories', 'testItem', 'selectedTestItem'])
    })
    it('Select onChange should not be called if selected element has the current value (value did not change)', async () => {
        const { getByLabelText, getByRole } = rtlRender(
            <SelectWithBtn
                selectLbl="Test categories"
                btnText="testBtn"
                onBtnClick={onClick}
                onSelectChange={onSelectChange}
                selectData={['testItem', 'selectedTestItem']}
                selectedItem={'selectedTestItem'}
            />
        )
        selectEvent.openMenu(getByLabelText('Test categories:'))
        const listbox = within(getByRole('listbox'))
        userEvent.click(listbox.getByText('selectedTestItem'))
        expect(onSelectChange).toHaveBeenCalledTimes(0)
    })
    it('Select onChange called and selected value is changed', async () => {
        const { getByLabelText, getByRole, findByText } = rtlRender(
            <SelectWithBtn
                selectLbl="Test categories"
                btnText="testBtn"
                onBtnClick={onClick}
                onSelectChange={onSelectChange}
                selectData={['testItem', 'selectedTestItem']}
                selectedItem={'selectedTestItem'}
            />
        )
        selectEvent.openMenu(getByLabelText('Test categories:'))
        const listbox = within(getByRole('listbox'))
        userEvent.click(listbox.getByText('testItem'))
        expect(onSelectChange).toHaveBeenCalledTimes(1)
        expect(await findByText('testItem')).toBeInTheDocument()
    })
    it('When Select options data loading indicator is shown', async () => {
        const { getByLabelText, findByTestId } = rtlRender(
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
        selectEvent.openMenu(getByLabelText('Test categories:'))
        expect(await findByTestId('loadingIndicator')).toBeInTheDocument()
    })
    it('When Select options data failed to load error.message is shown', async () => {
        const { getByTestId } = rtlRender(
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
        expect(await getByTestId('select-options-errorMsg')).toBeInTheDocument()
    })
})
