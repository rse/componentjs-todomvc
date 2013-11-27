
/*  the main UI composite component  */
cs.ns("app.ui.main").ctrl = cs.clazz({
    mixin: [ cs.marker.controller ],
    protos: {
        create: function () {
            /*  create todo widget components  */
            cs(this).create("todo-model/todo-view", app.ui.todo.model, app.ui.todo.view)
            cs(this).property("ComponentJS:state-auto-increase", true)
        },
        prepare: function () {
            var self = this
            var todoModel = cs(self, "//todo-model")

            /*  two-way bind URL route to presentation model  */
            var router = new Router({
                "/":          function () { todoFilterSelect("all")       },
                "/active":    function () { todoFilterSelect("active")    },
                "/completed": function () { todoFilterSelect("completed") }
            })
            var todoFilterSelect = function (filter) {
                todoModel.value("state:status-filter-selected", filter)
                todoModel.value("cmd:item-list-updated", true)
            }
            todoModel.observe({ name: "event:status-filter-select", func: function (ev, value) {
                var route = "/" + value;
                if (route === "/all")
                    route = "/";
                if (router.getRoute() !== route) {
                    window.location.hash = "#" + route
                    router.setRoute(route)
                }
            }})
            router.init()

            /*  react on item CRUD model event value changes  */
            todoModel.observe({ name: "event:new-item-create", func: function (/* ev, value */) {
                var text = todoModel.value("data:new-item-text")
                todoModel.value("data:new-item-text", "")
                var todoList = app.sv.sf.todo()
                var todoItem = new app.sv.dm.TodoItem({ title: text })
                todoList.itemAdd(todoItem)
                app.sv.sf.save()
                bm2pm()
            }})
            todoModel.observe({ name: "event:item-list-item-modified", func: function (ev, item) {
                var todoList = app.sv.sf.todo()
                var todoItem = todoList.itemById(item.id)
                todoItem.title     = item.title
                todoItem.completed = item.completed
                app.sv.sf.save()
                bm2pm()
            }})
            todoModel.observe({ name: "event:item-list-item-removed", func: function (ev, item) {
                var todoList = app.sv.sf.todo()
                var todoItem = todoList.itemById(item.id)
                todoList.itemDel(todoItem)
                app.sv.sf.save()
                bm2pm()
            }})

            /*  transfer business model into presentation model  */
            var bm2pm = function () {
                var pmItems = []
                var bmTodoList = app.sv.sf.todo()
                _.forEach(bmTodoList.items, function (bmTodoItem) {
                    pmItems.push({
                        id:        bmTodoItem.id,
                        title:     bmTodoItem.title,
                        completed: bmTodoItem.completed,
                        editing:   false
                    })
                })
                todoModel.value("data:item-list", pmItems)
                todoModel.value("cmd:item-list-updated", true)
            }

            /*  initially load business model and trigger transfer into presentation model  */
            app.sv.sf.load()
            bm2pm()
        },
        render: function () {
            /*  render view mask  */
            var ui = $.markup("main")
            cs(this).plug(ui)
            cs(this).socket({ ctx: $("#todoapp", ui), spool: "materialized" });
        }
    }
})

