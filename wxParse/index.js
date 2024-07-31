const Fuck = require('./wxParse')

Component({
    options: {
        styleIsolation: 'apply-shared'
    },
    properties: {
        html: {
            type: String,
            value: '',
        },
    },
    observers: {
        html: function () {
            Fuck.wxParse('wxParseData', 'html', this.properties.html, this)
        },
    },
})