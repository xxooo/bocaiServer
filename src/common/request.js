import axios from 'axios';
import cookieParser from './cookie';
import qs from 'qs';

// 傻逼IE9， 不支持带下划线的 header， 所以这里全部换成 access_token
export default {
    install: function(Vue, options) {
        // 1. 添加全局方法或属性
        Vue.prototype.$get = async function(url, data = {}, headers = {}) {
            let accesstoken = cookieParser.getCookie('accesstoken');
            let urlArr = url.split('?');

            axios.defaults.timeout = 1000*10*18; 

            let account = cookieParser.getCookie('account');

            let language = Lockr.get('locale');

            if (document.documentMode && document.documentMode < 10) {
                let search = qs.parse(urlArr[1]);
                search.time = new Date().getTime();
                headers.accesstoken = accesstoken;
                (!headers['content-type']) && (headers['content-type'] = 'application/json');

                Object.assign(search, data, headers);

                url = urlArr[0] + '?' + encodeURI(decodeURIComponent(qs.stringify(search)));
            }
            let opts = {
                headers: {
                    accesstoken,
                    'account': account,
                    'language': language
                }
            };
            let res = await axios.get(url, opts);

            if (res.data.code == '1') {
                if(res.data.msg == '') {
                    if(language == 'en-US') {
                        this.$warning('No Data');
                    } else if(language == 'zh-CN') {
                        this.$warning('没有数据');
                    } else {
                        this.$warning('沒有數據');
                    }
                } else {
                    this.$warning(res.data.msg);
                }
                
            } else if(res.data.code == -1) {
                this.$error(res.data.msg);
            }

            return res.data; // {code: 0, result: {count: 0, rows: []}}
        };

        Vue.prototype.$handelResponse = async function(res, cb, errCb) {
          //目前微服务没有统一返回
          //_g.closeGlobalLoading()
          cb(res)
        };

        let $fileupload;
        Vue.prototype.$upload = async function(url, formname, onsuccess, data = {}, headers = {}) {
            let that = this;
            !$fileupload && ($fileupload = document.querySelector('#file-upload'));

            let onchange = async function(){
                $fileupload.removeEventListener('change', onchange); // 当触发后，就移除该事件，避免多次提交


                let fdata = new window.FormData();

                // 将原来的数据封装到 form data 里面
                for(var k in data){
                    fdata.append(k, data[k]);
                }

                fdata.append(formname, $fileupload.files[0]);

                let res = await that.$post(url, fdata, headers);
                $fileupload.value = ''; // 上传完毕后，将文件置空，防止上传同样文件的时候出错

                if(res.code == 0){
                    onsuccess();
                }
            };

            $fileupload.addEventListener('change', onchange);
            $fileupload.click();
        };

      Vue.prototype.$postHeaders = function(){
          let accesstoken = cookieParser.getCookie('accesstoken');
          let account = cookieParser.getCookie('account');
          let language = Lockr.get('locale');
          return {
          accesstoken,
          'account': account,
          'language': language,
          'Accept': 'application/json',
        }
        };

        Vue.prototype.$post = async function(url, data, headers = {}) {
            let accesstoken = cookieParser.getCookie('accesstoken');
            let urlArr = url.split("?");

            axios.defaults.timeout = 1000*10*18;   

            let account = cookieParser.getCookie('account');
            let language = Lockr.get('locale');

            if (document.documentMode && document.documentMode < 10) {
                let search = qs.parse(urlArr[1]);

                headers.token = accesstoken;
                (!headers['content-type']) && (headers['content-type'] = 'application/json');

                Object.assign(search, headers);

                url = urlArr[0] + '?' + encodeURI(decodeURIComponent(qs.stringify(search)));
            }
            let opts = {
                headers: {
                    accesstoken,
                    'account': account,
                    'language': language,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };

            let res = await axios.post(url, data, opts);


            if (res.data.code == '1') {
                if(res.data.msg == '') {
                    if(language == 'en-US') {
                        this.$warning('No Data');
                    } else if(language == 'zh-CN') {
                        this.$warning('没有数据');
                    } else {
                        this.$warning('沒有數據');
                    }
                } else {
                    this.$warning(res.data.msg);
                }
                
            } else if(res.data.code == -1) {
                this.$error(res.data.msg);
            }

            return res.data; // {code: 0, result: {count: 0, rows: []}}
        };

    }
};
