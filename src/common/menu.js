import cookie from './cookie';
const axios = require('axios');
let currLang = 'en';

export let menus = [
    {
        path: '/board',
        name: 'Quality Dashboard',
        code: 'board',
        icon: 'icon-shebei',
        isDisplay: false,
        expend: true,
        children: [{
                path: '/dashboard/boardDefinition',
                name: 'Dashboard Definition',
                isDisplay: false,
                code: 'board/boardDefinition'
            },
            {
                path: '/dashboard/boardShow',
                name: 'Dashboard Show',
                isDisplay: false,
                code: 'board/boardShow'
            }
        ]
    },
    {
        path: '/alarm',
        name: 'Real-time Alarm',
        code: 'alarm',
        icon: 'icon-alarm',
        isDisplay: false,
        expend: true,
        children: [{
            path: '/alarm/alarmBoard',
            name: 'Alarm Board',
            code: 'alarm/alarmBoard',
            isDisplay: false
        },{
            path: '/alarm/alarmStatistics',
            name: 'Alarm Statistics',
            code: 'alarm/alarmStatistics',
            isDisplay: false
        },{
            path: '/alarm/alarmConfiguration',
            name: 'Alarm Configuration',
            code: 'alarm/alarmConfiguration',
            isDisplay: false
        },{
            path: '/alarm/alarmProcess',
            name: 'Alarm Process',
            code: 'alarm/alarmProcess',
            isDisplay: false
        }]
    },
    {
        path: '/analysis',
        name: 'Intelligent Analysis',
        code: 'analysis',
        icon: 'icon-icon-report',
        isDisplay: false,
        expend: true,
        children: [{
                path: '/analysis/correlationAnalysis',
                name: 'Correlation Analysis',
                code: 'analysis/correlationAnalysis',
                isDisplay: false
            },
            {
                path: '/analysis/analysisBetweenBatches',
                name: 'Quality time series analysis between batches',
                code: 'analysis/analysisBetweenBatches',
                isDisplay: false
            },
            {
                path: '/analysis/analysisiInBatch',
                name: 'Quality time series analysis in batch',
                code: 'analysis/analysisiInBatch',
                isDisplay: false
            },
            {
                path: '/analysis/failureWarning',
                name: 'Failure rate prediction and early warning',
                code: 'analysis/failureWarning',
                isDisplay: false
            },
            {
                path: '/analysis/productQualification',
                name: 'Analysis of product qualification rate trend',
                code: 'analysis/productQualification',
                isDisplay: false
            },
            {
                path: '/analysis/CpkTrendAnalysis',
                name: 'Cpk trend analysis',
                code: 'analysis/CpkTrendAnalysis',
                isDisplay: false
            },
            {
                path: '/analysis/measuredValueDistribution',
                name: 'Analysis of measured value distribution',
                code: 'analysis/measuredValueDistribution',
                isDisplay: false
            }
        ]
    },
    {
      path: '/spc/report',
      name: 'Report Forms',
      code: 'report',
      icon: 'icon-baobiaofenxi',
      isDisplay: false,
      expend: false
    },
    {
        path: '/data',
        name: 'Base Data',
        code: 'data',
        icon: 'icon-pdm70',
        isDisplay: false,
        expend: true,
        children: [{
                path: '/baseData/attributeDefinition',
                name: 'Attribute Definition',
                code: 'data/attributeDefinition',
                isDisplay: false
            },
            {
                path: '/baseData/attributeValueSetting',
                name: 'Attribute Value Setting',
                code: 'data/attributeValueSetting',
                isDisplay: false
            },
            {
                path: '/baseData/parameterConfiguration',
                name: 'Parameter Configuration',
                code: 'data/parameterConfiguration',
                isDisplay: false
            },
            {
                path: '/baseData/controlLimitsManagement',
                name: 'Control Limits Management',
                code: 'data/controlLimitsManagement',
                isDisplay: false
            },
            {
                path: '/baseData/sampleConfiguration',
                name: 'Sample Configuration',
                code: 'data/sampleConfiguration',
                isDisplay: false
            }
        ]
    },
    {
      path: '/spc/poc',
      name: 'POC',
      code: 'poc',
      icon: 'icon-xiangmuguanli',
      isDisplay: false,
      expend: false
    }

];

let getFirstLanguage = function() {
    var language = navigator.languages && navigator.languages[0] || // Chrome / Firefox
        navigator.language || // All browsers
        navigator.userLanguage; // IE <= 10

        if (!Lockr.get('locale')) {

                Lockr.set('locale', language);
                return language;
            } else {
                return Lockr.get('locale');
            }

};

export let setLang = async function(code) {
    !code && (code = getFirstLanguage());

    // 如果设置的语言，和当前的语言一样，则返回
    if (code == currLang) return;

    let token = cookie.getCookie('token');
    let langkeies = []; // 把所有的 menus keys 拿出来
    let opts = {
        headers: {
            token
        }
    };

    menus.forEach(x => {
        langkeies.push(`smartspc.menu.${x.code}`);
        x.children && x.children.forEach(c => langkeies.push(`smartspc.menu.${c.code}`));
    });

    let ret = (await axios.post(`${window.i18n}/i18nResource/queryI18nResourceList`, {
        locale: code,
        keySet: langkeies
    }, opts)).data.result;

    menus.forEach(x => {
        ret[`smartspc.menu.${x.code}`] && (x.name = ret[`smartspc.menu.${x.code}`]);

        if (x.children) {
            x.children.forEach(c => {
                ret[`smartspc.menu.${c.code}`] && (c.name = ret[`smartspc.menu.${c.code}`]);
            });
        }
    });
    currLang = code;
};
