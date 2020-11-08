import { Box, TextField } from '@material-ui/core'
import _ from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChuckLogo } from '../../components/buildingBlocks/ChuckLogo/ChuckLogo'
import { Navbar } from '../../components/buildingBlocks/Navbar/Navbar'
import SelectWithBtn from '../../components/buildingBlocks/SelectWithBtn/SelectWithBtn'
import ChuckContent from '../../components/ChuckContent/ChuckContent'
import { fetchJokeCategories, fetchJokesByQuery, fetchRandomJoke } from '../../redux/actions/jokesActions'
import { RootState } from '../../redux/store/store'
import useStyles from './ChuckView.styles'

const ChuckView = (): JSX.Element => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const { data: jokeCategoriesApiData, error: jokeCategoriesError, isLoading: jokeCategoriesIsLoading } = useSelector(
        (state: RootState) => state.chuck.categories
    )
    const [inputValue, setInputValue] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState<string>('')

    useEffect(() => {
        dispatch(fetchRandomJoke())
        dispatch(fetchJokeCategories())
    }, [dispatch])

    const debounceChange = useCallback(
        _.debounce((nextValue) => dispatch(nextValue !== '' ? fetchJokesByQuery(nextValue) : fetchRandomJoke()), 500),
        []
    )
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { value: nextValue } = e.target
        setInputValue(nextValue)
        debounceChange(nextValue)
    }

    return (
        <>
            <Navbar className={classes.navbar} logo={<ChuckLogo className={classes.logo} />}>
                <Box className={classes.navbarItems}>
                    <TextField
                        className={classes.querySearch}
                        label="Query search..."
                        variant="outlined"
                        value={inputValue}
                        onChange={handleChange}
                    />
                    <SelectWithBtn
                        selectLbl="Joke category"
                        selectData={jokeCategoriesApiData}
                        selectedItem={selectedCategory}
                        isSelectDataLoading={jokeCategoriesIsLoading}
                        selectDataError={jokeCategoriesError}
                        onSelectChange={(e) => {
                            setSelectedCategory(e.target.value as string)
                        }}
                        btnText="Chuck make a joke"
                        onBtnClick={() => dispatch(fetchRandomJoke(selectedCategory))}
                    />
                </Box>
            </Navbar>
            <ChuckContent />
        </>
    )
}
export default ChuckView
