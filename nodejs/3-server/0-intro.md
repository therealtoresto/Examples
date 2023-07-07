# Introduction

## What is Web-service?

A web service is a software component that provides functionality and the \
ability to interact with other software components over the Internet.

Web services enable different programs and systems to exchange data and invoke \
functions with each other without being tied to specific platforms or \
programming languages.

## What is Web-server?

A web server is a software or computer that provides access to web resources \
(such as web pages, images, videos, applications, etc.) over the Internet.

The web server processes requests coming from clients (typically web browsers) \
and delivers the corresponding resources or performs necessary actions on the \
server.

## Main functions of web-server

Request reception and processing: The web server receives HTTP requests from \
clients and processes them. This may involve reading request data, handling \
parameters, checking access permissions, etc.

Response delivery: After processing a request, the web server generates an \
HTTP response that contains the requested resources or the results of the \
request execution. This response is sent back to the client.

Resource management: The web server manages access to resources such as web \
pages, images, databases, etc. It decides which resources are available to \
clients and what access rights users have.

HTTP protocol: Web servers work with the HTTP (Hypertext Transfer Protocol), \
which is the primary data transfer protocol of the web. They handle HTTP \
requests and generate responses according to this protocol.

## What is middleware?

In the context of web development, middleware refers to a software layer that \
intercepts and handles HTTP requests and responses in a web application. It \
plays a crucial role in processing and modifying incoming requests, performing \
specific tasks, and generating appropriate responses.

Middleware functions are executed sequentially in the order they are defined, \
and each function has access to the request and response objects. This allows \
middleware to perform various tasks such as authentication, logging, error \
handling, data parsing, session management, and more. It provides a modular \
and reusable way to add functionality to an application without modifying the \
core application logic.

Middleware acts as an intermediary, processing the request before it reaches \
the actual route handlers or endpoints. It can modify the request or response \
objects, pass control to the next middleware in the chain, or terminate the \
request-response cycle.

## What is CORS?

CORS (Cross-Origin Resource Sharing) is a web browser security mechanism that \
controls access to resources on web pages from different domain sources. It \
defines rules that allow or restrict a web page from making requests to \
resources on domains other than the domain from which the page originated.

This is an important security mechanism as it limits the ability of scripts \
on one page to interact with resources on other domains without proper \
permission. Without CORS, browsers are subject to the Same-Origin Policy, \
which by default does not allow requesting resources from different domains.

## REST

REST API (Representational State Transfer Application Programming Interface) \
is an architectural style and set of principles for designing networked \
applications.

It is a widely used approach for building web services that allow different \
systems to communicate and interact with each other over the internet.

## REST principles

1. **Resource-based:** REST APIs are centered around resources, which can be \
any entity or object that the API provides access to. Resources are typically \
identified by unique URLs (Uniform Resource Locators).

2. **Stateless:** Each request from a client to a REST API contains all the \
information needed to understand and process the request. The server does not \
store any client-specific data between requests, making the API stateless. \
This simplifies scalability and reliability.

3. **Uniform Interface:** REST APIs adhere to a uniform set of predefined \
operations or HTTP methods, such as GET, POST, PUT, DELETE, etc., which are \
used to perform different actions on the resources. These methods provide a \
consistent interface for interacting with the API.

4. **Client-Server Architecture:** REST APIs follow a client-server \
architecture, where the client, typically a web application or mobile app, \
initiates requests to the server, and the server responds with the requested \
data or performs the requested action.

5. **Layered System:** REST APIs can be composed of multiple layers, where \
each layer has a specific responsibility. This allows for flexibility, \
scalability, and separation of concerns in the application architecture.
