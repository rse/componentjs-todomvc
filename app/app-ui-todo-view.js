
cs.ns("app.ui.todo").view = cs.clazz({
    mixin: [ cs.marker.view ],
    protos: {
        render: function () {
            /*  render outer view mask  */
            var self = this
            var ui = $.markup("todo")
            cs(self).plug(ui)

            /*  two-way bind the "all items" selection checkbox  */
            $("#toggle-all").change(function (/* ev */) {
                cs(self).value("state:all-item-selected", $("#toggle-all").prop("checked"))
            })
            cs(self).observe({
                name: "state:all-item-selected", spool: "materialized",
                func: function (ev, value) { $("#toggle-all").prop("checked", value) }
            })

            /*  two-way bind the "new item" text input field  */
            $("#new-todo").keyup(function (/* ev */) {
                cs(self).value("data:new-item-text", $("#new-todo").val())
            }).change(function (/* ev */) {
                cs(self).value("event:new-item-create", true)
            })
            cs(self).observe({
                name: "data:new-item-text", touch: true, spool: "materialized",
                func: function (ev, value) { $("#new-todo").val(value) }
            })

            /*  two-way bind the list of items  */
            cs(self).observe({
                name: "cmd:item-list-updated", spool: "materialized", touch: true,
                func: function (/* ev, value */) {
                    var items  = cs(self).value("data:item-list")
                    var filter = cs(self).value("state:status-filter-selected")

                    /*  render item markup for all non-filtered items  */
                    $("#todo-list", ui).html("")
                    for (var i = 0; i < items.length; i++) {
                        if (    filter === "all"
                            || (filter === "active"    && !items[i].completed)
                            || (filter === "completed" &&  items[i].completed)) {
                            var item = $.markup("todo/item", items[i])
                            $("#todo-list", ui).append(item)
                        }
                    }

                    /*  one-way bind double-click interaction onto all items to start editing mode  */
                    $("#todo-list .view label", ui).bind("dblclick", function (ev) {
                        var title = $(ev.target).text()
                        var parent = $(ev.target).parent().parent()
                        parent.addClass("editing")
                        $(".edit", parent).val(title).focus()
                    })

                    /*  one-way bind key-press and field blur interactions to leave editing mode  */
                    $("#todo-list .edit", ui).keyup(function (ev) {
                        if (ev.which === app.ui.constants.KEY_ENTER)
                            blur(ev.target, true)
                        else if (ev.which === app.ui.constants.KEY_ESCAPE)
                            blur(ev.target, false)
                    }).blur(function (ev) {
                        if ($(ev.target).parent().hasClass("editing"))
                            blur(ev.target, true)
                    })
                    var blur = function (el, takeTitle) {
                        var id = $(el).parent().data("id")
                        $(el).parent().removeClass("editing")
                        if (takeTitle) {
                            _.find(items, function (item) { return item.id === id }).title = $(el).val()
                            cs(self).value("cmd:item-list-updated", true)
                        }
                    }

                    /*  one-way bind click interaction to toggle item completion  */
                    $("#todo-list input.toggle", ui).click(function (ev) {
                        var id = $(ev.target).parent().parent().data("id")
                        var item = _.find(items, function (item) { return item.id === id })
                        item.completed = !item.completed
                        cs(self).value("cmd:item-list-updated", true)
                    })

                    /*  one-way bind click interaction to remove item  */
                    $("#todo-list button.destroy", ui).click(function (ev) {
                        var id = $(ev.target).parent().parent().data("id")
                        cs(self).value("data:item-list", _.filter(items, function (item) {
                            return item.id !== id;
                        }))
                        cs(self).value("cmd:item-list-updated", true)
                    })
                }
            })

            /*  one-way bind status remaining items label  */
            cs(self).observe({
                name: "data:status-items-remaining",
                spool: "materialized", touch: true,
                func: function (ev, value) {
                    $("*[data-bind='data:status-items-remaining']", ui).text(value)
                    $("*[data-bind='data:status-items-remaining-unit']", ui).text(
                        parseInt(value) === 1 ? "item" : "items")
                }
            })

            /*  two-way bind status filter buttons  */
            cs(self).observe({
                name: "state:status-filter-selected",
                spool: "materialized", touch: true,
                func: function (ev, value) {
                    $("*[data-bind='state:status-filter-selected'] > li > a", ui).removeClass("selected")
                    $("*[data-bind='state:status-filter-selected'] > li > "+
                        "a[data-tag='" + value + "']", ui).addClass("selected")
                    cs(self).value("cmd:item-list-updated", true)
                }
            })
            $("*[data-bind='state:status-filter-selected'] > li > a", ui).click(function (ev) {
                cs(self).value("event:status-filter-select", $(ev.target).data("tag"))
                cs(self).value("cmd:item-list-updated", true)
                return false
            })

            /*  two-way bind status clear item button  */
            cs(self).observe({
                name: "data:status-items-completed",
                spool: "materialized", touch: true,
                func: function (ev, value) {
                    if (value > 0) {
                        $("#clear-completed", ui).css("display", "block")
                        $("*[data-bind='data:status-items-completed']", ui).text(value)
                    }
                    else
                        $("#clear-completed", ui).css("display", "none")
                }
            })
            $("#clear-completed", ui).click(function (/* ev */) {
                cs(self).value("data:item-list", _.filter(cs(self).value("data:item-list"), function (item) {
                    return !item.completed;
                }))
                cs(self).value("cmd:item-list-updated", true)
            })

        }
    }
})

