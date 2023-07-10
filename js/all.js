import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const app =  Vue.createApp({
    data(){
        return{
            searchDateFrom: '',
            searchDateTo: '',
        }
    },
    methods: {
        search(searchDateFrom, searchDateTo){
            alert("尚未有資料")
        },
        toExcel(){
            alert("功能建置中");
        }
    },
})
app.mount('#app')