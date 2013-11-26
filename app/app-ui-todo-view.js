
cs.ns("app.ui.todo").view = cs.clazz({
    mixin: [ cs.marker.view ],
    protos: {
        render: function () {
            var self = this

            /*  render outer view mask  */
            self.ui = $.markup("todo")
            cs(self).plug(self.ui)

            /*  two-way bind all items selection checkbox  */
            $("#toggle-all").change(function (/* ev */) {
                cs(self).value("state:all-item-selected", $("#toggle-all").prop("checked"))
            })
            cs(self).observe({
                name: "state:all-item-selected", spool: "materialized",
                func: function (ev, value) { $("#toggle-all").prop("checked", value) }
            })

            /*  two-way bind new item text input field  */
            $("#new-todo").keyup(function (/* ev */) {
                cs(self).value("data:new-item-text", $("#new-todo").val())
            })
            $("#new-todo").change(function (/* ev */) {
                cs(self).value("event:new-item-create", true)
            })
            cs(self).observe({
                name: "data:new-item-text", touch: true, spool: "materialized",
                func: function (ev, value) { $("#new-todo").val(value) }
            })

            /*  one-way bind status remaining items label  */
            cs(self).observe({
                name: "data:status-items-remaining",
                spool: "materialized", touch: true,
                func: function (ev, value) {
                    $("*[data-bind='data:status-items-remaining']", self.ui).text(value)
                    $("*[data-bind='data:status-items-remaining-unit']", self.ui).text(
                        parseInt(value) === 1 ? "item" : "items")
                }
            })

            /*  two-way bind status filter buttons  */
            cs(self).observe({
                name: "state:status-filter-selected",
                spool: "materialized", touch: true,
                func: function (ev, value) {
                    $("*[data-bind='state:status-filter-selected'] > li > a", self.ui).removeClass("selected")
                    $("*[data-bind='state:status-filter-selected'] > li > "+
                        "a[data-tag='" + value + "']", self.ui).addClass("selected")
                }
            })
            $("*[data-bind='state:status-filter-selected'] > li > a", self.ui).click(function (ev) {
                cs(self).value("state:status-filter-selected", $(ev.target).data("tag")) /* FIXME? */
                cs(self).value("event:status-filter-select", $(ev.target).data("tag"))
                cs(self).value("cmd:item-list-updated", true)
            })

            /*  two-way bind status clear item button  */
            cs(self).observe({
                name: "data:status-items-completed",
                spool: "materialized", touch: true,
                func: function (ev, value) {
                    if (value > 0) {
                        $("#clear-completed", self.ui).css("display", "block")
                        $("*[data-bind='data:status-items-completed']", self.ui).text(value)
                    }
                    else
                        $("#clear-completed", self.ui).css("display", "none")
                }
            })
            $("#clear-completed", self.ui).click(function (/* ev */) {
                cs(self).value("data:item-list",
                    _.filter(cs(self).value("data:item-list"), function (item) {
                        return !item.completed;
                    })
                )
                cs(self).value("cmd:item-list-updated", true)
            })

            /*  two-way bind the list of items  */
            cs(self).observe({
                name: "cmd:item-list-updated",
                spool: "materialized", touch: true,
                func: function (/* ev, value */) {
                    $("#todo-list", self.ui).html("")
                    var items = cs(self).value("data:item-list")
                    var filter = cs(self).value("state:status-filter-selected")
                    for (var i = 0; i < items.length; i++) {
                        if (   filter === "all"
                            || (filter === "active"    && !items[i].completed)
                            || (filter === "completed" &&  items[i].completed)) {
                            var item = $.markup("todo/item", {
                                id:        items[i].id,
                                title:     items[i].title,
                                completed: items[i].completed
                            })
                            $("#todo-list", self.ui).append(item)
                        }
                    }
                    $("#todo-list .view label", self.ui).bind("dblclick", function (ev) {
                        $(ev.target).parent().parent().addClass("editing")
                        var title = $(ev.target).text()
                        $(".edit", $(ev.target).parent().parent()).val(title)
                        $(".edit", $(ev.target).parent().parent()).focus()
                    })
                    $("#todo-list .edit", self.ui).bind("keyup", function (ev) {
                        if (ev.which === app.ui.constants.ENTER_KEY)
                            blur(ev.target, true)
                        else if (ev.which === app.ui.constants.ESCAPE_KEY)
                            blur(ev.target, false)
                    })
                    $("#todo-list .edit", self.ui).blur(function (ev) {
                        if ($(ev.target).parent().hasClass("editing"))
                            blur(ev.target, true)
                    })
                    var blur = function (el, takeTitle) {
                        var id = $(el).parent().data("id")
                        $(el).parent().removeClass("editing")
                        if (takeTitle) {
                            var title = $(el).val()
                            _.find(items, function (item) { return item.id === id }).title = title
                            cs(self).value("cmd:item-list-updated", true)
                        }
                    }
                    $("#todo-list input.toggle", self.ui).click(function (ev) {
                        var id = $(ev.target).parent().parent().data("id")
                        _.forEach(items, function (item) {
                            if (item.id === id) {
                                item.completed = !item.completed
                                cs(self).value("cmd:item-list-updated", true)
                            }
                        })
                    })
                    $("#todo-list button.destroy", self.ui).click(function (ev) {
                        var id = $(ev.target).parent().parent().data("id");
                        cs(self).value("data:item-list", _.filter(items, function (item) {
                            return (item.id !== id);
                        }))
                        cs(self).value("cmd:item-list-updated", true)
                    })
                }
            })
        }
    }
})

