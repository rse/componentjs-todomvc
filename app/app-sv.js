
/*  service tier  */
cs.ns("app").sv = new cs.clazz({
    dynamics: { todoList: null, storageId: "todos-componentjs" },
    protos: {
        todo: function () { return this.todoList },
        load: function () {
            this.todoList = new app.dm.TodoList()
            if (_.has(localStorage, this.storageId))
                this.todoList.unserialize(localStorage[this.storageId])
        },
        save: function () {
            if (this.todoList !== null)
                localStorage[this.storageId] = this.todoList.serialize()
        }
    }
})()

