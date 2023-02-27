// 写法一
// interface IType {
//     expend: Array<item>,
//     income: Array<item>
// }
// 写法二
interface IType {
    expend: item[],
    income: item[],
}

type item = {
 id: number,
 name: string,
 icon: string,
}

export const typeMap: IType = {
    expend: [

        {
            id: 1,
            name: "餐饮",
            icon: "icon-canyin",
        },

        {
            id: 2,
            name: "购物",
            icon: "icon-gouwu",
        },
        {
            id: 3,
            name: "日用",
            icon: "icon-shenghuoriyong",
        },
        {
            id: 4,
            name: "交通",
            icon: "icon-jiaotongyunshu",
        },
        {
            id: 5,
            name: "蔬菜",
            icon: "icon-shucai",
        },
        {
            id: 6,
            name: "水果",
            icon: "icon-shuiguo",
        },
        {
            id: 7,
            name: "零食",
            icon: "icon-lingshi",
        },
        {
            id: 8,
            name: "运动",
            icon: "icon-yundong",
        },
        {
            id: 9,
            name: "娱乐",
            icon: "icon-yule",
        },
        {
            id: 10,
            name: "通讯",
            icon: "icon-tongxun",
        },
        {
            id: 11,
            name: "服饰",
            icon: "icon-fushi",
        },
        {
            id: 12,
            name: "美容",
            icon: "icon-meirong-heicopy",
        },
        {
            id: 13,
            name: "住房",
            icon: "icon-zhufang",
        },
        {
            id: 14,
            name: "社交",
            icon: "icon-13",
        },
        {
            id: 15,
            name: "烟酒",
            icon: "icon-yanjiu",
        },
        {
            id: 16,
            name: "医疗",
            icon: "icon-yiliao",
        },
        {
            id: 17,
            name: "书籍",
            icon: "icon-shuji",
        },
        {
            id: 18,
            name: "宠物",
            icon: "icon-xiedaichongwu",
        },
        {
            id: 19,
            name: "礼金",
            icon: "icon-shengjilijin",
        },
        {
            id: 20,
            name: "维修",
            icon: "icon-weixiufuwu_o",
        },
        {
            id: 21,
            name: '捐赠',
            icon: "icon-019-donation",
        },

    ],
    income: [
        {
            id: 1,
            name: "工资",
            icon: "icon-shengjilijin",
        },
        {
            id: 2,
            name: "兼职",
            icon: "icon-jianzhi",
        },
        {
            id: 3,
            name: "理财",
            icon: "icon-licai",
        },
        {
            id: 4,
            name: "其它",
            icon: "icon-qianqian"
        }
    ]
}