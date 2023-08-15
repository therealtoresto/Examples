class Request {
    constructor(resource, userId) {
        this.resource = resource;
        this.userId = userId;
    }
}

class Handler {
    constructor() {
        this.next = null;
    }
  
    setNext(handler) {
        this.next = handler;
    }
  
    handle(request) {
        if (this.next) {
            return this.next.handle(request);
        } else {
            throw new Error('Resource not found or unauthorized');
        }
    }
}

class AuthHandler extends Handler {
    handle(request) {
      // Set logic for auth checking
      if (request.userId) {
        console.log('User is authorized');
        return super.handle(request);
      } else {
        throw new Error('Unauthorized');
      }
    }
  }
  
  class ResourceHandler extends Handler {
    handle(request) {
        // Set logic for resource handling
        if (request.resource === 'protectedResource') {
            console.log('Processing protected resource');
            return 'Protected Resource Data';
        } else {
            return super.handle(request);
        }
    }
}

const authHandler = new AuthHandler();
const resourceHandler = new ResourceHandler();

authHandler.setNext(resourceHandler);

const request1 = new Request('protectedResource', 'user123');
try {
  const result1 = authHandler.handle(request1);
  console.log('Result:', result1);
} catch (error) {
  console.error('Error:', error.message);
}

const request2 = new Request('publicResource', 'user123');
try {
  const result2 = authHandler.handle(request2);
  console.log('Result:', result2);
} catch (error) {
  console.error('Error:', error.message);
}

