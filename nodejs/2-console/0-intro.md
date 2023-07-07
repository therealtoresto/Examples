# Introduction

## CLI

It is a way of interacting with a program or operating system through \
text-based commands entered at a command prompt or terminal.

In a CLI, users can enter commands in a textual format to perform specific \
tasks, such as running programs, executing file operations, or configuring \
system settings.

Commands typically have a specific structure and syntax, and \
they are interpreted by the program or operating system for making some actions.

CLI can be used in various contexts, including operating systems, command-line \
programs, development tools, and other programs that provide a command mode of \
interaction.

## Buffer

In Node.js, a Buffer is a built-in class that provides a way to work with \
binary data.

It represents a fixed-sized chunk of memory allocated outside the JavaScript \
heap.

Buffers are commonly used to manipulate streams of binary data, such as \
reading from or writing to files, network communications, or handling raw data \
in various formats.

## Why Buffer alloc outside heap?

In JavaScript, objects such as strings, arrays, and objects are stored in the \
JavaScript heap, which is managed by garbage collector and it allocates and \
frees memory for these objects.

Buffers in Node.js are not JavaScript objects; they are low-level \
representations of data used for manipulating binary data.

They utilize memory spaces allocated outside the JavaScript heap, such as \
using C/C++ mechanisms or system calls for memory allocation.

This has several implications:

1. Buffers have a fixed size and it cannot be changed. (Buffer.concat())

2. Buffers are not subject to automatic garbage collection in JavaScript.

3. Buffer operations can be more efficient as they work memory rather than \
JavaScript objects.

## Streams

Program abstraction streams in Node.js are used for processing streaming data, \
where data is available in chunks or progressively.

## Streams are used for

1. File system: Streams enable efficient reading and writing of large files.

2. Network input/output: Streams form the foundation for handling network \
input and output in Node.js.

3. Data processing: Streams provide convenience for processing, transforming, \
and filtering data on the fly.

4. Command-line interface.

5. Database operations: Streams can be used for efficient reading and writing \
of data to databases.
