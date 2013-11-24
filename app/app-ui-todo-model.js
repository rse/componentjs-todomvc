
cs.ns("app.ui.todo").model = cs.clazz({
    mixin: [ cs.marker.model ],
    protos: {
        create: function () {
            /*  define presentation model  */
            cs(this).model({
                "data:item-list":                   { value: [],
                                                      valid: "[{ id: string," +
                                                             "   title: string," +
                                                             "   completed: boolean," +
                                                             "   editing: boolean   }*]"              },
                "cmd:item-list-updated":            { value: false, valid: "boolean", autoreset: true },
                "state:all-item-selected":          { value: false, valid: "boolean"                  },
                "data:new-item-text":               { value: "",    valid: "string",  store: true     },
                "event:new-item-create":            { value: false, valid: "boolean", autoreset: true },
                "data:status-items-remaining":      { value: 0,     valid: "number"                   },
                "data:status-items-remaining-unit": { value: "",     valid: "string"                  },
                "state:status-filter-selected":     { value: "all", valid: "string",  store: true     },
                "event:status-filter-select":       { value: "",    valid: "string",  autoreset: true },
                "data:status-items-completed":      { value: 0,     valid: "number"                   },
                "event:status-clear-select":        { value: false, valid: "boolean", autoreset: true }
            })
        },
        prepare: function () {
            var self = this
            cs(self).observe({
                name: "data:status-items-remaining",
                touch: true,
                func: function (ev, value) {
                    cs(self).value("data:status-items-remaining-unit",
                        value !== 1 ? "items" : "item")
                }
            })
            cs(self).observe({
                name: "cmd:item-list-updated",
                touch: true,
                func: function (ev, value) {
                    var items = cs(self).value("data:item-list")
                    var completed = _.countBy(items, function (item) { return item.completed }).true
                    if (!_.isNumber(completed))
                        completed = 0
                    cs(self).value("data:status-items-completed", completed)
                    var remaining = items.length - completed
                    cs(self).value("data:status-items-remaining", remaining)
                }
            })
            cs(self).observe({
                name: "state:all-item-selected",
                func: function (ev, value) {
                    var items = cs(self).value("data:item-list")
                    _.forEach(items, function (item) {
                        item.completed = value
                    })
                    cs(self).value("cmd:item-list-updated", true)
                }
            })
        },
        cleanup: function () {
            cs(this).unspool("prepared")
        },
    }
})

