"use strict";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const Router = require("../src/router");
let params = require("../src/router");

/**
 * @file router.test.js
 * @description Tests for Router class
 */

describe("Router", () => {
  let router;

  beforeEach(() => {
    const { window } = new JSDOM(`<!DOCTYPE html><div id="content"></div>`);
    global.document = window.document;
    global.window = window;

    const routes = {
      "/": { page: "/pages/home.html" },
      "/user/:id": { page: "/pages/user.html" },
    };
    router = new Router(routes);
  });

  afterEach(() => {
    delete global.document;
    delete global.window;
  });

  test("should navigate to home route", (done) => {
    // Mock fetch response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve('<h1>Home Page</h1>'),
      })
    );

    router.gotoRoute("/");

    setTimeout(() => {
      const content = document.getElementById("content").innerHTML;
      expect(content).toBe('<h1>Home Page</h1>');
      done();
    }, 100);
  });

  test("should navigate to 404 route for unknown path", (done) => {
    // Mock fetch response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve('<h1>404 Not Found</h1>'),
      })
    );

    router.gotoRoute("/unknown");

    setTimeout(() => {
      const content = document.getElementById("content").innerHTML;
      expect(content).toBe('<h1>404 Not Found</h1>');
      done();
    }, 100);
  });

  test("should extract parameters from dynamic route", (done) => {
    // Mock fetch response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve('<h1>User Page</h1>'),
      })
    );

    router.gotoRoute("/user/123");

    setTimeout(() => {
      const content = document.getElementById("content").innerHTML;
      expect(content).toBe('<h1>User Page</h1>');
      expect(router.params.id).toBe("123");
      done();
    }, 100);
  });

  test("should handle navigation to a route with multiple parameters", (done) => {
    // Mock fetch response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve('<h1>Order Page</h1>'),
      })
    );

    router.routes["/order/:orderId/item/:itemId"] = { page: "/pages/order.html" };
    router.gotoRoute("/order/456/item/789");

    setTimeout(() => {
      const content = document.getElementById("content").innerHTML;
      expect(content).toBe('<h1>Order Page</h1>');
      expect(router.params.orderId).toBe("456");
      expect(router.params.itemId).toBe("789");
      done();
    }, 100);
  });

  test("should handle navigation to a route with query parameters", (done) => {
    // Mock fetch response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve('<h1>Search Page</h1>'),
      })
    );

    router.routes["/search"] = { page: "/pages/search.html" };
    router.gotoRoute("/search?query=test");

    setTimeout(() => {
      const content = document.getElementById("content").innerHTML;
      expect(content).toBe('<h1>Search Page</h1>');
      done();
    }, 100);
  });

  test("should handle navigation to a route with hash parameters", (done) => {
    // Mock fetch response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve('<h1>Hash Page</h1>'),
      })
    );

    router.routes["/hash"] = { page: "/pages/hash.html" };
    router.gotoRoute("/hash#section1");

    setTimeout(() => {
      const content = document.getElementById("content").innerHTML;
      expect(content).toBe('<h1>Hash Page</h1>');
      done();
    }, 100);
  });

  test("should handle navigation to a route with existing content", (done) => {
    // Set initial content
    document.getElementById("content").innerHTML = '<h1>Initial Content</h1>';

    // Mock fetch response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve('<h1>New Content</h1>'),
      })
    );

    router.routes["/new"] = { page: "/pages/new.html" };
    router.gotoRoute("/new");

    setTimeout(() => {
      const content = document.getElementById("content").innerHTML;
      expect(content).toBe('<h1>New Content</h1>');
      done();
    }, 100);
  });
});

