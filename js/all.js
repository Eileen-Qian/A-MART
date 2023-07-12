import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const app = Vue.createApp({
    data() {
        return {
            // 時段流量
            searchFlowDateFrom: '',
            searchFlowDateTo: '',
            searchFlowDate: '',
            // 交易明細
            transactionDetails: [
                {
                    id: 1,
                    plate: 'EAC-1017', // 車號
                    priceClass: '汽車', // 車種
                    carType: '計時臨停', // 身分別
                    isElectric: true, // 是否為電動車
                    enterTime: '2023-07-01 12:47', // 進場時間
                    transTime: '2023-07-01 13:06', //出場時間
                    stay: 19,
                    payAmount: 0,
                    discounts: [
                        {
                            discountid: 1,
                            serialNumber: 'EC111111111', // 消費發票
                            expense: 1000, // 消費金額
                            who: '愛買', // 消費店家
                            hours: 10
                        },
                        {
                            discountid: 2,
                            serialNumber: 'EC222222222', // 消費發票
                            expense: 150, // 消費金額
                            who: '吉野家', // 消費店家
                            hours: 5
                        }
                    ]
                },
                {
                    id: 2,
                    plate: 'EAC-0346', // 車號
                    priceClass: '汽車', // 車種
                    carType: '計時臨停', // 身分別
                    isElectric: true, // 是否為電動車
                    enterTime: '2023-07-01 12:47', // 進場時間
                    transTime: '2023-07-01 13:06', //出場時間
                    stay: 19,
                    payAmount: 0,
                    discounts: [
                        {
                            discountid: 1,
                            serialNumber: 'EC333333333', // 消費發票
                            expense: 1000, // 消費金額
                            who: '愛買', // 消費店家
                            hours: 10
                        }
                    ]
                },
                {
                    id: 3,
                    plate: 'EAC-0422', // 車號
                    priceClass: '汽車', // 車種
                    carType: '計時臨停', // 身分別
                    isElectric: false, // 是否為電動車
                    enterTime: '2023-07-01 12:47', // 進場時間
                    transTime: '2023-07-01 13:06', //出場時間
                    stay: 19,
                    payAmount: 0,
                    discounts: [
                        {
                            discountid: 1,
                            serialNumber: 'EC444444444', // 消費發票
                            expense: 1000, // 消費金額
                            who: '愛買', // 消費店家
                            hours: 10
                        },
                        {
                            discountid: 2,
                            serialNumber: 'EC444444444', // 消費發票
                            expense: 1000, // 消費金額
                            who: '吉野家', // 消費店家
                            hours: 10
                        },
                        {
                            discountid: 3,
                            serialNumber: 'EC555555555', // 消費發票
                            expense: 1000, // 消費金額
                            who: '吉野家', // 消費店家
                            hours: 10
                        }
                    ]
                },
            ],
            searchTransactionDetailsDate: '',
            isElectric: true, //是否為電動車
        }
    },
    methods: {
        searchFlow(searchFlowDateFrom, searchFlowDateTo) {
            alert("尚未有資料")
        },
        // 交易明細
        // 匯出報表
        transactionDetailstoExcel(type, fn, dl) {
            var elt = document.getElementById('transactionDetailsTable');
            var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
            return dl ?
                XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }) :
                XLSX.writeFile(wb, fn || ('MySheetName.' + (type || 'xlsx')));
        },
        checkIsElectric(){
            const checked = document.getElementById('isElectric');
            this.isElectric = checked.checked;
            console.log('isElectric',this.isElectric);
            checked.addEventListener('change',handleChange);
            function handleChange (){
                this.isElectric = checked.checked;
                console.log('isElectric',this.isElectric);
            }
        }
    },
    mounted(){
        this.checkIsElectric();
    }
})

app.mount('#app');