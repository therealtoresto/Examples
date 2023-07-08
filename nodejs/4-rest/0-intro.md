# Introduction

## Environment variables

Environment variables, also known as environment variables or runtime \
variables, are parameters used by operating systems to store and transmit \
configuration information about the environment in which software operates.

These variables contain values that can affect the behavior of programs, \
including paths to executable files, shell variables, network operation \
parameters, and much more. They can be used as operational parameters that \
control the behavior of a program or as paths to system resources such as \
files or libraries.

## Logging

Logging -  process of recording messages, events, and other useful data \
during the execution of a program for analysis, debugging, error tracking, \
and software monitoring.

During the development of a program, developers can insert logs (i.e., \
records) into the code that catch important events or the program's state. \
These logs can contain information about executed operations, variable values, \
errors, exceptions, and any other relevant information.

Logs can be stored in various formats such as text files, databases, or \
centralized log management systems. Development tools and programming \
environments provide logging functionalities, including log levels, filtering, \
log file and more.

Logging allows developers to track the state of a program, investigate issues, \
and analyze them for software quality improvement. It can also be useful for \
performance monitoring, detecting attacks, or identifying incorrect program \
behavior.

## REST principles

### Client - Server

 The first constraint states that the network should consist of clients and \
 servers. A server is a computer that possesses interesting resources, while \
 a client is a computer that wants to interact with and access the resources \
 stored on the server.

An alternative to the client-server architecture, different from RESTful, is \
the event-driven integration architecture. In this model, each component \
continuously broadcasts events while waiting for relevant events from other \
components. There is no direct communication, only broadcasting and listening.

REST requires individual interactions, so an event-driven integration \
architecture would not be RESTful.

### Stateless

Statelessness does not mean that servers and clients do not have state. It \
simply means that they do not need to track each other's state.

When a client is not interacting with a server, the server is unaware of its \
existence. The server also does not keep track of previous requests. Each \
request is treated as independent, meaning there are no sessions.

### Uniform interface

This is achieved through four additional constraints:

1. **Resource identification:** Each resource is uniquely identified using a \
URI (Uniform Resource Identifier), allowing clients to locate and interact \
with specific resources.

2. **Resource manipulation through representations:** Clients manipulate \
resources through the exchange of representations, such as JSON or XML, \
which contain the current or desired state of the resource. The server \
understands these representations and can perform the necessary actions.

3. **Self-descriptive messages:** Messages exchanged between clients and \
servers contain sufficient information to be understood by both parties. \
The messages include metadata or headers that describe the message's purpose, \
format, and any additional details required for processing.

4. **Hypermedia(html)** as the engine of application state (HATEOAS): The \
server includes hypermedia links in the responses it sends to clients. These \
links allow clients to navigate the available resources and discover further \
actions they can take. The server controls the application state by providing \
the necessary links.

These constraints of the uniform interface promote decoupling, scalability, \
and flexibility in the system architecture.

### Cache

Caching is indeed related to a constraint in which server responses must be \
explicitly labeled as cacheable or non-cacheable. Caching occurs when a client \
stores previous responses received from the server so that when the same data \
is needed again, the client can retrieve it from the cache without making a \
request over the network.

Caching partially or completely eliminates certain client-server interactions, \
promoting scalability and improving program performance.

### Layers

A layered (or multi-tier) system goes beyond just servers and clients. It \
means that there can be more than one layer in the system. However, each \
component is restricted to only see and interact with the next layer.

Proxies are additional components that forward HTTP requests to servers or \
other proxies. Proxy servers are useful for load balancing and security \
checking.

A proxy server acts as a server to the initial client sending the request and \
then acts as a client when forwarding that request further.

### Request Constraint

Execute by Request Constraint is an optional constraint that pertains to the \
server's ability to send executable code to the client. When an HTML document \
is loaded, the browser automatically downloads JavaScript code from the server \
and executes it locally.

This constraint allows the server to dynamically provide executable code, such \
as JavaScript, to the client upon request. The client then executes this code \
within its local environment, enhancing the functionality and interactivity of \
the application.
