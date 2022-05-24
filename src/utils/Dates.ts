export function getCurrentDate(separator = '') {

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
}

export function getTommorowDate(separator = '') {
    let newDate = new Date();
    
    newDate.setDate(newDate.getDate() + 1);

    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    console.log(newDate)

    return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
}