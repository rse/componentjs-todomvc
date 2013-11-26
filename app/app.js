
ComponentJS.symbol("cs")
cs.ns("app").boot = cs.clazz({
    statics: {
        init: function () {
            cs.bootstrap()
            cs.debug(0)
            if (cs.debug_instrumented()) {
                cs.debug(9)
                cs.debug_window({
                    enable: true, natural: true, autoclose: false,
                    name: "ComponentJS • TodoMVC", width: 800, height: 1000
                })
            }
        },
        main: function () {
            cs.create("/ui", app.ui.root)
            cs("/ui").state(_.isObject(document) ? "visible" : "prepared")
        }
    }
})

