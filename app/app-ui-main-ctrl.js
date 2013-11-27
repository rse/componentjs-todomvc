
/*  the main UI composite component  */
cs.ns("app.ui.main").ctrl = cs.clazz({
    mixin: [ cs.marker.controller ],
    protos: {
        create: function () {
            /*  create companion model and view components
                plus the components of the todo widget  */
            cs(this).create("main-model/main-view/todo-model/todo-view",
                app.ui.main.model, app.ui.main.view,
                app.ui.todo.model, app.ui.todo.view
            )
            cs(this).property("ComponentJS:state-auto-increase", true)
        },
        prepare: function () {
            var self = this

            /*  load business model and link into presentation model  */
            app.sv.sf.load()
            cs(self, "main-model").value("data:todo", app.sv.sf.todo())
            cs(self, "main-model").value("state:todo-modified", true)

            /*  two-way bind URL route to presentation model  */
            var todo_model = cs(self, "//todo-model")
            var router = new Router({
                "/":          function () { todoFilterSelect("all")       },
                "/active":    function () { todoFilterSelect("active")    },
                "/completed": function () { todoFilterSelect("completed") }
            })
            var todoFilterSelect = function (filter) {
                todo_model.value("state:status-filter-selected", filter)
                todo_model.value("cmd:item-list-updated", true)
            }
            todo_model.observe({
                name: "event:status-filter-select",
                func: function (ev, value) {
                    var route = "/" + value;
                    if (route === "/all")
                        route = "/";
                    if (router.getRoute() !== route) {
                        window.location.hash = "#" + route
                        router.setRoute(route)
                    }
                }
            })
            router.init()

            /*  FIXME: load from business model  */
            cs(self, "//todo-model").value("data:item-list", [
                { id: "id1", title: "Item #1", completed: true,  editing: false },
                { id: "id2", title: "Item #2", completed: false, editing: false },
                { id: "id3", title: "Item #3", completed: false, editing: false }
            ])
            cs(self, "//todo-model").observe({
                name: "event:new-item-create",
                func: function (/* ev, value */) {
                    var text  = cs(self, "//todo-model").value("data:new-item-text")
                    var items = cs(self, "//todo-model").value("data:item-list")
                    items.push({
                        id: "FIXME",
                        title: text,
                        completed: false,
                        editing: false
                    })
                    cs(self, "//todo-model").value("cmd:item-list-updated", true)
                    cs(self, "//todo-model").value("data:new-item-text", "")
                }
            })
            cs(self, "//todo-model").observe({
                name: "cmd:item-list-updated",
                func: function (/* ev, value */) {
                    /*  FIXME: save to business model  */
                    //  var items = cs(self, "model").value("data:item-list")
                }
            })
        },
        cleanup: function () {
            /*  save business model and unlink from presentation model  */
            app.sv.sf.save()
            cs(this, "main-model").value("data:todo", null)
        }
    }
})

