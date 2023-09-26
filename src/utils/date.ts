export const addZero = (val:number): string => val < 10 ? `0${val}` : val.toString()

export const convertDate = (date: Date): string => {
    if (!date) return ''
    let d: Date = new Date(date)
    return `${addZero(d.getHours())}:${addZero(d.getMinutes())} ${addZero(d.getDate())}/${addZero(d.getMonth()+1)}/${d.getFullYear()}`
} 