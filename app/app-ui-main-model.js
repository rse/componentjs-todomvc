
cs.ns("app.ui.main").model = cs.clazz({
    mixin: [ cs.marker.model ],
    protos: {
        create: function () {
            /*  define presentation model  */
            cs(this).model({
                "data:todo":           { value: null,  valid: "object"                   },
                "state:todo-modified": { value: false, valid: "boolean", autoreset: true },
                "state:todo-filter":   { value: "all", valid: "string",  store: true     }
            })
        }
    }
})

