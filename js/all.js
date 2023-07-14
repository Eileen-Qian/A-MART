import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const Api = 'https://8060-114-36-43-252.ngrok-free.app';

const app = Vue.createApp({
    data() {
        return {
            // 時段流量
            searchFlowDateFrom: '',
            searchFlowDateTo: '',
            searchFlowDate: '',
            // 交易明細
            today: '',
            transactionDetails: [
                // {
                //     id: 1,
                //     plate: 'EAC-1017', // 車號
                //     priceClass: '汽車', // 車種
                //     carType: '計時臨停', // 身分別
                //     isElectric: true, // 是否為電動車
                //     enterTime: '2023-07-01 12:47', // 進場時間
                //     transTime: '2023-07-01 13:06', //出場時間
                //     stay: 19,
                //     payAmount: 0,
                //     discounts: [
                //         {
                //             discountid: 1,
                //             serialNumber: 'EC111111111', // 消費發票
                //             expense: 1000, // 消費金額
                //             who: '愛買', // 消費店家
                //             hours: 10
                //         },
                //         {
                //             discountid: 2,
                //             serialNumber: 'EC222222222', // 消費發票
                //             expense: 150, // 消費金額
                //             who: '吉野家', // 消費店家
                //             hours: 5
                //         }
                //     ]
                // },
            ],
            // 搜尋交易明細
            searchTransactionDetailsData: {
                "isElectric": true,
                "Time": ''
            },
        }
    },
    methods: {
        searchFlow(searchFlowDateFrom, searchFlowDateTo) {
            alert("尚未有資料")
        },
        // 交易明細
        // 交易明細 - 當天為電動車的資料
        isToday(searchTransactionDetailsData) {
            const YYYY = new Date().getFullYear();
            const MM = (new Date().getMonth() + 1).toString().padStart(2, '0');
            const dd = new Date().getDate();
            this.today = YYYY + '-' + MM + '-' + dd;
            // console.log(this.today);
            const getTransactionApi = `${Api}/transaction`;
            const cantFindArea = document.querySelector('.cantFind-Area');
            this.searchTransactionDetailsData.isElectric = true;
            this.searchTransactionDetailsData.Time = this.today;
            axios
                .post(getTransactionApi, { target: this.searchTransactionDetailsData })
                .then((response) => {
                    this.transactionDetails = response.data;
                    // 搜尋結果
                    this.transactionDetails.length > 0
                        ? cantFindArea.classList.remove('block')
                        : cantFindArea.classList.add('block');
                })
        },
        // 交易明細 - 搜尋
        searchTransactionDetails(searchTransactionDetailsData) {
            const getTransactionApi = `${Api}/transaction`;
            const cantFindArea = document.querySelector('.cantFind-Area');
            axios
                .post(getTransactionApi, { target: this.searchTransactionDetailsData })
                .then((response) => {
                    this.transactionDetails = response.data;
                    this.transactionDetails.length > 0
                        ? cantFindArea.classList.remove('block')
                        : cantFindArea.classList.add('block');
                })
        },
        // 交易明細 -  監聽是否為電動車
        checkIsElectric() {
            const checked = document.getElementById('isElectric');
            this.isElectric = checked.checked;
            checked.addEventListener('change', handleChange);
            function handleChange() {
                this.isElectric = checked.checked;
            }
        },
        // 交易明細 - 匯出報表
        transactionDetailstoExcel(type, fn, dl) {
            var elt = document.getElementById('transactionDetailsTable');
            var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
            return dl ?
                XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }) :
                XLSX.writeFile(wb, fn || ('統計報表.' + (type || 'xlsx')));
        }
    },
    mounted() {
        // 交易明細 - 當天為電動車的資料
        this.isToday()
        this.checkIsElectric()
    }
})

app.mount('#app');