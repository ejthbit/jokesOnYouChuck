/* eslint-disable camelcase */

// ! API response for joke is not written in camelCase, had to disabled eslint rule.
export type Joke = {
    categories: string[]
    created_at: string
    icon_url: string
    id: string
    updated_at: string
    url: string
    value: string
}

export type JokeQueryRes = {
    total: number
    result: Joke[]
}
