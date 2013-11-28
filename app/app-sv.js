
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

/*  data model: Todo List entity  */
cs.ns("app.sv.dm").TodoList = cs.clazz({
    dynamics: { items: [] },
    cons: function (obj) {
        _.assign(this, _.pick(obj, function (val, key) { return _.has(this, key) }, this))
    },
    protos: {
        itemAdd:  function (item) { this.items.push(item) },
        itemDel:  function (item) { this.items = _.without(this.items, item) },
        itemById: function (id)   { return _.find(this.items, function (item) { return item.id === id }) },
        serialize: function () {
            return ("{\"items\":[" +
                _.map(this.items, function (item) { return item.serialize() }).join(",") +
            "]}")
        },
        unserialize: function (text) {
            var obj = JSON.parse(text)
            this.items = _.map(obj.items, function (item) {
                return new app.sv.dm.TodoItem(item)
            })
        }
    }
})

/*  data model: Todo Item entity  */
cs.ns("app.sv.dm").idCnt = 0
cs.ns("app.sv.dm").TodoItem = cs.clazz({
    dynamics: { id: "0", title: "", completed: false },
    cons: function (obj) {
        this.id = "" + app.sv.dm.idCnt++
        _.assign(this, _.pick(obj, function (val, key) { return _.has(this, key) }, this))
    },
    protos: {
        serialize: function () {
            return JSON.stringify(this)
        },
        unserialize: function (text) {
            var obj = JSON.parse(text)
            _.assign(this, _.pick(obj, function (val, key) { return _.has(this, key) }, this))
        }
    }
})

