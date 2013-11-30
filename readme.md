
# ComponentJS TodoMVC Example

## About ComponentJS

ComponentJS is a stand-alone MPL-licensed Open Source library for
JavaScript, providing a powerful Component System for hierarchically
structuring the User-Interface (UI) dialogs of complex HTML5-based Rich
Clients (aka Single-Page-Apps) — under maximum applied Separation
of Concerns (SoC) architecture principle, through optional Model,
View and Controller component roles, with sophisticated hierarchical
Event, Service, Hook, Model, Socket and Property mechanisms, and fully
independent and agnostic of the particular UI widget toolkit.

_[ComponentJS &mdash; componentjs.com](http://componentjs.com)_

## Running the ComponentJS TodoMVC Example

Perform the following steps:

1. Install [Node](http://nodejs.org/) into your system
2. Install build-time dependencies via [NPM](http://npmjs.org/): `npm install`
3. Install run-time dependencies via [Grunt](http://gruntjs.com/) and [Bower](http://bower.io/): `grunt build`
3. Run development environment via [Grunt](http://gruntjs.com/) and [Connect](http://www.senchalabs.org/connect/): `grunt dev`
4. Test-drive the ComponentJS TodoMVC Example: [http://localhost:8080/](http://localhost:8080/)

## Hints about the ComponentJS TodoMVC Example

This ComponentJS TodoMVC Example tries to
closely follow the official [TodoMVC App Specification](https://github.com/tastejs/todomvc/blob/gh-pages/app-spec.md)
as long as there are no conflicting ComponentJS best practices.
The known resolved conflicts were:

- TodoMVC `todo-common` provides a `base.css` which was not
  directly used within this ComponentJS TodoMVC Example. There
  are two reasons for this:
  
    - The `base.css` provides all styles of the TodoMVC application
      in one single file, while in ComponentJS-based applications
      the styles are local to the components which create the
      corresponding DOM elements. In ComponentJS TodoMVC Example
      we have three such components (`root`, `main` and `todo`)
      and hence the `base.css` was split into three parts accordingly, too.

    - The styling in `base.css` is mainly based on unique identifiers (`#foo`)
      instead of classes (`.foo`). This is a big "no-go" for UI
      approaches like ComponentJS where UI widgets (here the `todo`
      UI component) are fully reusable and are potentially rendered
      multiple times into the same DOM tree. For the particular
      TodoMVC use case this does not happen, but the ComponentJS
      TodoMVC Example should have been strictly the way things
      are done in ComponentJS applications. As a result, all CSS
      selectors of `base.css` were converted from unique identifiers to
      [BEM](http://bem.info/method/definitions/)-like classes.

- TodoMVC recommends to group all sources files according to 
  technical classifications. ComponentJS-based applications usually
  use a domain-specific classification to group files, i.e., the UI is
  split into domain-specific components and each component is fully
  self-contained. This means that each component consists of its own
  JavaScript code, its own style, its own mask, etc. As the TodoMVC use
  case is a trivial one, in the ComponentJS TodoMVC example you see this
  through the common filename prefixes only. In a real-world ComponentJS
  application one would see this also through the directory tree.

- The TodoMVC application speciification just requires that
  an URL based routing exists and that the todo list is persistend in
  the the HTML5 `localStorage`. In order to avoid extra code, one could
  have implemented this by using FlatIron Director directly within the
  `todo` component and let ComponentJS implicitly persist the Todo list
  items into `localStorage` directly from within the `todo` widget with
  the help of the `component.plugin.localstorage.js` plugin. While
  sufficient and perhaps acceptable for a trivial use case like the
  TodoMVC, it is not for a larger application. There the URL routing
  should be done only by a component which has the whole UI as the
  scope (the `root` and `main` components but not the `todo` widget)
  and the Todo items would come from an underlying service tier and its
  UI-independent Business Model (while the UI widget uses a so-called
  Presentation Model). We decided to already use this architecture for
  the trivial TodoMVC use case, even if it increases the total amount of
  required code.

## Learning ComponentJS

The [ComponentJS website](http://componentjs.com) is a great resource for getting started.
Here are some links you may find helpful:

* [Features](http://componentjs.com/features.html)
* [Demo](http://componentjs.com/demo.html)
* [API Reference](http://componentjs.com/api/api.screen.html)
* [Tutorial](http://componentjs.com/tutorial.html)

For more details about the TodoMVC initiative and the idea behind the TodoMVC applications see:

* [TodoMVC Initiative](https://todomvc.com/)
* [App Specification](https://github.com/tastejs/todomvc/blob/gh-pages/app-spec.md)

