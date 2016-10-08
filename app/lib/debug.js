export var log = ENV == 'dev' ? console.log.bind(window.console) : function () {};
export var info = ENV == 'dev' ? console.info.bind(window.console) : function () {};
export var warn = ENV == 'dev' ? console.warn.bind(window.console) : function () {};
export var error = ENV == 'dev' ? console.error.bind(window.console) : function () {};