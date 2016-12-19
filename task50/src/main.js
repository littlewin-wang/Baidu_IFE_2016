import vue from "vue";
import Router from "vue-router";
import data from './data';             // app

import see from "./components/see";
import stati from "./components/statistics";
import edit from "./components/edit";
import App from './components/app';             // app
import List from './components/list';               // 列表页
import Home from './components/home';      // 主页
import No from './components/404';          // 404界面
import New from './components/new';          // 404界面

vue.config.devtools = true;
vue.use(Router);
// 创建新实例
const router = new Router(); 
router.map({
    "/" : {
        name:"Home",
        component : Home
    },
    "/404": {
        name: "404",
        component: No
    },
    "/list" : {
        name: "list",
        component : List
    },
    "/new" : {
        name: "new",
        component : New
    },
    "/see/:id":{
        name:"see",
        component:see
    },
    "/edit/:id":{
        name:"edit",
        component:edit
    },
    "/stati/:id":{
        name:"stati",
        component:stati
    }
})
router.redirect({
    "*" : "/404"
})
router.start(App, '#app');    