type dealFn = () => []
// interface IList {

// }
type item = {
    account: string,
    amount: number,
    bill_nums: number,
    date: string,
    icon: string,
    pay_type: number,
    remarks: string | null,
    type_name: string
}
export function dealList(arr:Array<item>){
    let indexId = 0
    let flag = ''
    let list = []
    for (let i = 0; i < arr.length; i++) {
        arr[i].date = arr[i].date.slice(6,10)
    }
    for (let i = 0; i < arr.length; i++) {
        if(arr[i].date === flag) {
            list[indexId-1].dayList.push(arr[i])
            
        } else {
            list.push({
                id: ++indexId,
                date: arr[i].date,
                dayList: [arr[i]]
            })
            flag = arr[i].date
            
        }
    }

    return list
}