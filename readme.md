
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
Nevertheless, an important point should be explicitly noted.

There are multiple TodoMVC comparisons which mainly look at the
_Lines of Code_ metric to compare the individual examples.
This IMHO makes no sense, as some examples seem to just try to reproduce
the TodoMVC functionality with the help of the particular framework, but with a rather rookie software architecture.
Other implementations are more involved because they strictly follow a software architecture which
scales even for very large applications. ComponentJS TodoMVC Example
is in the latter group as the used ComponentJS framework is based on
a very sophisticated but more involved underlying UI architecture.

In particular, this means this ComponentJS TodoMVC Example already uses the
usual separation between a UI and service tier, already implements the
Todo list as a fully reusable UI widget, fully abstracts the Todo list
view in a corresponding Todo list presentation model (which perfectly
supports even head-less testing approaches), performs a true two-way
binding between the presentation model and the view mask, etc.

_Keep this in mind and do not compare apples and oranges, please!_

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

