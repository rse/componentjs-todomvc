
cs.ns("app.ui.main").view = cs.clazz({
    mixin: [ cs.marker.view ],
    dynamics: { ui: null },
    protos: {
        render: function () {
            var self = this
            self.ui = $.markup("main")
            cs(self).plug(self.ui)
            cs(self).socket({ ctx: $("#todoapp", self.ui), spool: "materialized" });
        },
        release: function () {
            cs(this).unspool("materialized")
        }
    }
})

