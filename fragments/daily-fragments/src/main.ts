import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import './style/common.css'
import 'vant/lib/index.css';
import { Form, Field, CellGroup, Button, Tabbar, TabbarItem, Uploader, Popup, DatePicker, NumberKeyboard, Progress  } from 'vant';
import { remFn } from './rem'
import dayjs from 'dayjs'

// 查询窗口大小，做适配
remFn(window)
const app = createApp(App)

// 全局的时间过滤器
app.config.globalProperties.$filters = {
    transTime(date: any) {
        return dayjs(Number(date)).format('HH:mm')
    },
    transDay(value: any) {
        return dayjs(value).format('MM-DD')
    },
    transYDM(value: any) {
        return dayjs(value).format('YYYY-MM-DD HH:mm')
    }
}

app.use(router)
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.use(Button);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Uploader);
app.use(Popup);
app.use(DatePicker);
app.use(NumberKeyboard)
app.use(Progress )



app.mount('#app')
