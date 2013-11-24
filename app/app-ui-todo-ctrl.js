
/*  the todo UI component  */
cs.ns("app.ui.todo").ctrl = cs.clazz({
    mixin: [ cs.marker.controller ],
    protos: {
        create: function () {
            /*  create companion model and view components  */
            cs(this).create("model/view", app.ui.todo.model, app.ui.todo.view)
            cs(this).property("ComponentJS:state-auto-increase", true)
        },
        prepare: function () {
            var self = this
            /*  FIXME: load from business model  */
            cs(self, "model").value("data:item-list", [
                { id: "id1", title: "Item #1", completed: true,  editing: false },
                { id: "id2", title: "Item #2", completed: false, editing: false },
                { id: "id3", title: "Item #3", completed: false, editing: false }
            ])
            cs(self, "model").observe({
                name: "event:new-item-create",
                func: function (ev, value) {
                    var text = cs(self, "model").value("data:new-item-text")
                    var items = cs(self, "model").value("data:item-list")
                    items.push({
                        id: "FIXME",
                        title: text,
                        completed: false,
                        editing: false
                    })
                    cs(self, "model").value("cmd:item-list-updated", true)
                    cs(self, "model").value("data:new-item-text", "")
                }
            })
            cs(self, "model").observe({
                name: "cmd:item-list-updated",
                func: function (ev, value) {
                    var items = cs(self, "model").value("data:item-list")
                    /*  FIXME: save to business model  */
                }
            })
        },
        cleanup: function () {
            cs(this).unspool("prepared")
        }
    }
})

