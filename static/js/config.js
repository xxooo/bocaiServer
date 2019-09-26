conf = {
  logo: '',
  errorPage: 'nomenu',
  webName: 'Server',
  title: 'Server',
  version: "v1.0.0",
  pwReg: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/ //密码正则表达式最少6位，包括至少1个大写字母，1个小写字母，1个数字
}

window.globalConfig = conf;

window.url = 'http://47.106.13.12:8014';		//部署  凤凰
//window.url = 'http://154.209.15.202:8080';		//部署  上线
//window.url = ''; 								//本地
//获取博彩信息刷新频率					
window.refreshTime = 200000;





