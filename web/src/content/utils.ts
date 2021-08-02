export const isEnter = (key: string): boolean => key === 'Enter'

export const round5 = (x: number): number => {
    return x % 5 >= 2.5
        ? parseInt((x / 5) as any) * 5 + 5
        : parseInt((x / 5) as any) * 5
}
