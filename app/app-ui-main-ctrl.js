
/*  the main UI composite component  */
cs.ns("app.ui.main").ctrl = cs.clazz({
    mixin: [ cs.marker.controller ],
    protos: {
        create: function () {
            /*  create companion model and view components  */
            cs(this).create("model/view/todo", app.ui.main.model, app.ui.main.view, app.ui.todo.ctrl)
            cs(this).property("ComponentJS:state-auto-increase", true)
        },
        prepare: function () {
            var self = this

            /*  load business model and link into presentation model  */
            app.sv.sf.load()
            cs(self, "model").value("data:todo", app.sv.sf.todo())
            cs(self, "model").value("state:todo-modified", true)

            /*  URL route to presentation model mapping  */
            var router = new Router({
                "/":          function () { cs(self, "model").value("state:todo-filter", "all")       },
                "/active":    function () { cs(self, "model").value("state:todo-filter", "active")    },
                "/completed": function () { cs(self, "model").value("state:todo-filter", "completed") }
            })
            router.init()

            /*  presentation model to URL route mapping  */
            cs(self, "model").observe({
                name: "state:todo-filter", touch: true, spool: "prepared", func: function (ev, value) {
                    var route = value;
                    if (route === "all")
                        route = "";
                    route = "/" + route;
                    if (router.getRoute() !== route)
                        router.setRoute(route)
                }
            })
        },
        cleanup: function () {
            /*  save business model and unlink from presentation model  */
            app.sv.sf.save()
            cs(this, "model").value("data:todo", null)
        }
    }
})

