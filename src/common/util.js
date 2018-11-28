import cookie from 'js-cookie';
import qs from 'qs';
import Lockr from 'lockr';
import $cookie from './cookie.js';

let notify = function(title, msg, type, position = 'bottom-right'){
    this.$notify({
        title: title,
        message: msg,
        type: type,
        duration: 1000,
        position: position
    });
};

let currUser;


export default {
    install: function (Vue, options) {

        let en = Lockr.get('locale');

        Vue.prototype.$success = function(msg){
            if(en == 'en-US') {
                notify.call(this, 'success', (msg || 'operation success!'), 'success');
            } else {
                notify.call(this, '成功', (msg || '操作成功!'), 'success'); 
            }
        };

        Vue.prototype.$warning = function(msg){
            if(en == 'en-US') {
                notify.call(this, 'warning', (msg || 'operation not correct!'), 'warning');
            } else if(en == 'zh-CN') {
                notify.call(this, '警告', (msg || '操作有误!'), 'warning');
            } else {
                notify.call(this, '警告', (msg || '操作有誤!'), 'warning');
            }
        };

        Vue.prototype.$error = function(msg){
            if(en == 'en-US') {
                notify.call(this, 'error', (msg || 'operation not correct!'), 'error');
            } else if(en == 'zh-CN') {
                notify.call(this, '错误', (msg || '操作失败!'), 'error');
            } else {
                notify.call(this, '錯誤', (msg || '操作失敗!'), 'error');
            }
        };

        Vue.prototype.$c_confirm = function(

            successHandler, 
            title = en == 'en-US' ? 'Tips'  : (en == 'zh-CN' ? '提示' : '提示'),
            msg = en == 'en-US' ? 'Are you sure you want to remove ? ' : (en == 'zh-CN' ? '确定删除?' : '確定刪除?'),
            ){
            let that = this;
            that.$confirm(msg, title, {
                confirmButtonText: en == 'en-US' ? 'Ok' : (en == 'zh-CN' ? '确认' : '確認'),
                cancelButtonText: en == 'en-US' ? 'Cancel' : (en == 'zh-CN' ? '取消' : '取消')
            }).then(async () => {
                await successHandler();
            }).catch(() => {});
        };

        Vue.prototype.$currUser = async function(){
            currUser = currUser || JSON.parse(cookie.get('currUser'));
            if(currUser) return currUser;
            let res = await this.$get(`${window.account}/user/profile`);
            cookie.setCookie("currUser", res.result)
            currUser = res.result;

            let roleCodes = currUser.roleCodes;
            currUser.isAdmin = roleCodes.indexOf('platform-admin') != -1;

            return currUser;
        };

        Vue.prototype.$download = function(src){
            let query = {}, uri;
            if(src.indexOf('?') != -1){
                let segment = src.split('?');
                uri = segment[0];
                query = qs.parse(src.split('?')[1]);
            }
            query.access_token = cookie.get('accesstoken');
            
            src = (uri || src)  + '?' + qs.stringify(query);
            document.querySelector('#frm-download').setAttribute('src', src);
        };

        let $fileupload;
        Vue.prototype.$upload = function(opts){
            opts = {
                url: ''
            };
            !$fileupload && ($fileupload = document.querySelector('#file-upload'));

            $fileupload.addEventListener('change', function(){
            });
            $fileupload.click();
        };
    }
};










