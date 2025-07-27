export const isSameMonth =  (date: string, month : number, year: number) : boolean => {
    return(
        date.substring(5,7) == month.toString().padStart(2, "0")
        && date.substring(0, 4) == year.toString()
    )
}
