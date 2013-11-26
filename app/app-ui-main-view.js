
cs.ns("app.ui.main").view = cs.clazz({
    mixin: [ cs.marker.view ],
    protos: {
        render: function () {
            /*  render view mask  */
            var ui = $.markup("main")
            cs(this).plug(ui)
            cs(this).socket({ ctx: $("#todoapp", ui), spool: "materialized" });
        }
    }
})

