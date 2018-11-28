conf = {
  logo: 'static/img/logo.svg',
  errorPage: 'nomenu',
  webName: ' Quality Cloud - SPC',
  title: 'Quality Cloud - SPC',
  version: "v1.5.0",
  pwReg: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/ //密码正则表达式最少6位，包括至少1个大写字母，1个小写字母，1个数字
}

window.globalConfig = conf;

window.login = 'http://login.jwis.cn';
window.gateway = 'http://gateway.jwis.cn';

window.gatewayspc = window.gateway+'/smartspc';		//云
//window.gatewayspc = '' 							//201跨域

//window.gatewayspc = 'http://192.168.1.201:8000';	//本地

window.platform = window.gateway + '/platform';
window.i18n = window.gateway + '/i18n';
window.dict = window.gateway + '/dict';
window.account = window.gateway + '/account';

window.appkey = '613585b6d6';



