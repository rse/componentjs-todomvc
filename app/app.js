
/* jshint -W020 */
app = {}
app.boot = {
    init: function () {
        ComponentJS.symbol("cs")
        cs.ns("app")
        cs.bootstrap()
        cs.debug(0)
        if (cs.plugin("debugger")) {
            if (cs.debug_instrumented()) {
                cs.debug(9)
                cs.debug_window({
                    enable: true, natural: true, autoclose: false,
                    name: "ComponentJS TodoMVC", width: 800, height: 1000
                })
            }
        }
    },
    main: function () {
        cs.create("/ui", app.ui.root)
        var isHeadless = _.isObject(document)
        cs("/ui").state(isHeadless ? "visible" : "prepared")
    }
}

