
/*  service facade  */
cs.ns("app.sv").sf = new cs.clazz({
    dynamics: { todoList: null },
    protos: {
        todo: function () { return this.todoList },
        load: function () {
            this.todoList = new app.sv.dm.TodoList()
            if (_.has(localStorage, "todomvc-componentjs"))
                this.todoList.unserialize(localStorage["todomvc-componentjs"])
        },
        save: function () {
            if (this.todoList !== null)
                localStorage["todomvc-componentjs"] = this.todoList.serialize()
        }
    }
})()

