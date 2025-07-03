/* eslint-disable @typescript-eslint/no-explicit-any */
export function sortObject(obj: Record<string, any>): Array<{ key: string; value: any }> {
    const arr: Array<{ key: string; value: any }> = [];
    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'key': prop,
                'value': obj[prop]
            });
        }
    }

    arr.sort(function (a, b) {
        return b.value.prize_value - a.value.prize_value;
    });

    return arr; // returns array
}