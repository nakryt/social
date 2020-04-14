const changeCamelString = (str: string) =>
  firstLetterUpperCase(
    str.split('').map((letter, index) => {
        if (index) {
            if (letter.toUpperCase() === letter) {
                return ` ${letter}`
            }
        }
        return letter
    }).join(''))

const firstLetterUpperCase = (str: string) => `${str[0].toUpperCase()}${str.slice(1)}`

type TObj = {
    [key: string]: null | string | number | boolean | object
}
const changeEmptyValues = (obj: TObj) => {
    let outAcc: TObj = {}
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (value instanceof Object) {
            acc[key] = changeEmptyValues(value as TObj)
            return acc
        }
        if (value || typeof value === 'boolean') {
            acc[key] = value
            return acc    
        }
        acc[key] = '...'
        return acc
        
    }, outAcc)
}

export default {
    firstLetterUpperCase,
    changeCamelString,
    changeEmptyValues
}