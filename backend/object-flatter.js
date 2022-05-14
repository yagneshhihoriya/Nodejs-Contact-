exports.flatObject = (input, header = 'user') => {
    function flat(res, key, val, pre = '') {
        const prefix = [pre, key].filter(v => v).join('_');
        return typeof val === 'object'
            ? Object.keys(val).reduce((prev, curr) => flat(prev, curr, val[curr], prefix), res)
            : Object.assign(res, { [prefix]: val });
    }
    let obj = {}
    obj[header] = input
    return Object.keys(obj).reduce((prev, curr) => flat(prev, curr, obj[curr]), {});
}

const user = {
    name: "yagnesh hihoriya",
    address: {
        personal: {
            city: "Manali",
            state: "Himachal",
            area: "Naggar"
        },
        office: {
            city: "Sissu",
            area: {
                landmard: "Waterfall"
            }
        }
    },
}

console.log(this.flatObject(user));