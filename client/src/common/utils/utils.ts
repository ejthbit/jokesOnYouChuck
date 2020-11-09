export const wait = (delay = 0): Promise<number> => new Promise((resolve) => setTimeout(resolve, delay))
