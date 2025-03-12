class Router {
  params = {};

  constructor(routes) {
    this.routes = routes;
    this.error = {
      404: {
        page: "/pages/error/404.html",
      },
    };
  }

  gotoRoute(url) {
    document.getElementById("content").innerHTML = "";
    var route = this._getRoute(url);

    this.params = route.params;

    var path = route.page;

    this.sendRequest((htmlElement) => {
      document.getElementById("content").innerHTML = htmlElement.responseText;
    }, window.location.origin + path);
  }

  _getRoute(url) {
    let route = this.routes[url];

    if (!route) {
      const dynamicRoutes = Object.keys(this.routes).filter((route) =>
        route.includes(":"),
      );
      for (let dynamicRoute of dynamicRoutes) {
        const routeRegex = new RegExp(
          "^" + dynamicRoute.replace(/:\w+/g, "(\\w+)") + "$",
        );
        const match = url.match(routeRegex);
        if (match) {
          route = this.routes[dynamicRoute];
          route.params = {};
          const paramNames = dynamicRoute.match(/:(\w+)/g);
          paramNames.forEach((paramName, index) => {
            route.params[paramName.substring(1)] = match[index + 1];
          });
          break;
        }
      }
    }

    if (!route) {
      route = this.error[404];
    }

    return route;
  }

  sendRequest(functionready, path, method = "GET") {
    fetch(path, { method })
      .then((response) => response.text())
      .then((htmlElement) => functionready({ responseText: htmlElement }))
  }
}

module.exports = Router;
