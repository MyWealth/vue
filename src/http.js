import axios from "axios"
const MyPlugin = {}
MyPlugin.install = function (Vue, options) {
    // 4. 添加实例方法
    Vue.prototype.$http = axios
    axios.defaults.baseURL="http://localhost:8888/api/private/v1/"
}
export default MyPlugin