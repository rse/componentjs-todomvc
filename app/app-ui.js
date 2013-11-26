
/*  the root UI composite component  */
cs.ns("app.ui").root = cs.clazz({
    mixin: [ cs.marker.view, cs.marker.controller ],
    protos: {
        create: function () {
            /*  create main composite component  */
            cs(this).create("main", app.ui.main.ctrl)
            cs(this).property("ComponentJS:state-auto-increase", true)
        },
        prepare: function () {
            /*  await the readiness of the DOM  */
            if (_.isObject(document)) {
                var self = this
                cs(self).guard("render", +1)
                $(document).ready(function () {
                    /*  load all markup code  */
                    $.markup.load(function () {
                        cs(self).guard("render", -1)
                    })
                })
            }
        },
        render: function () {
            /*  place a socket onto the DOM body element  */
            cs(this).socket({ ctx: $("body"), spool: "materialized" })
        },
        release: function () {
            /*  destroy socket onto DOM body element  */
            cs(this).unspool("materialized")
        },
        cleanup: function () {
            /*  destroy main composite component  */
            cs(this, "main").destroy()
        }
    }
})

/*  just some constants  */
cs.ns("app.ui").constants = {
    ENTER_KEY:  13,
    ESCAPE_KEY: 27
};
