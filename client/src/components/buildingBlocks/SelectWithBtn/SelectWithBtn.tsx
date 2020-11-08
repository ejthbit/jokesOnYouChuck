import { Box, Button, CircularProgress, InputLabel, MenuItem, Select, Typography } from '@material-ui/core'
import { nanoid, SerializedError } from '@reduxjs/toolkit'
import React, { ChangeEvent } from 'react'
import useStyles from './SelectWithBtn.styles'

type SelectWithBtnProps = {
    selectLbl?: string
    selectData: string[]
    isSelectDataLoading?: boolean
    selectDataError?: SerializedError
    selectedItem: string
    onSelectChange: (e: ChangeEvent<{ value: unknown }>) => void
    btnText: string
    onBtnClick: () => void
}

type SelectItem = {
    value: string
    text: string
    disabled: boolean
}

const SelectWithBtn = ({
    selectLbl,
    selectData,
    isSelectDataLoading,
    selectDataError,
    selectedItem,
    onSelectChange,
    btnText,
    onBtnClick,
}: SelectWithBtnProps): JSX.Element => {
    const classes = useStyles()
    const getItemsWithDefault = (): SelectItem[] => {
        const arr = [{ value: '', text: `Please select ${selectLbl ? selectLbl.toLowerCase() : 'item'}`, disabled: true }]
        selectData.map((item) => arr.push({ value: item, text: item, disabled: false }))
        return arr
    }

    return (
        <Box className={classes.root}>
            <InputLabel className={classes.selectLabel} id="select-label">
                {`${selectLbl}:`}
            </InputLabel>
            <Select
                labelId="select-label"
                id="Select"
                className={classes.select}
                value={selectedItem}
                onChange={onSelectChange}
                variant="outlined"
                displayEmpty
            >
                {isSelectDataLoading ? (
                    <Box display="flex" justifyContent="center">
                        <CircularProgress />
                    </Box>
                ) : !selectDataError ? (
                    getItemsWithDefault().map((item) => (
                        <MenuItem key={nanoid()} value={item.value} disabled={item.disabled}>
                            {item.text}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem value="" disabled>
                        <Typography color="error" variant="caption">
                            {selectDataError.message}
                        </Typography>
                    </MenuItem>
                )}
            </Select>
            <Button variant="outlined" className={classes.btn} onClick={onBtnClick}>
                {btnText}
            </Button>
        </Box>
    )
}
export default SelectWithBtn
