import axios from "axios"
const MyPlugin = {}
MyPlugin.install = function (Vue, options) {
    // 4. 添加实例方法
    Vue.prototype.$http = axios
    axios.defaults.baseURL="http://localhost:8888/api/private/v1/"
    //拦截器
    axios.interceptors.request.use(function (config) {
        const auth = localStorage.getItem('token');
        config.headers.Authorization = auth
        return config;
      }, function (error) {
        
        return Promise.reject(error);
      });
}
export default MyPlugin