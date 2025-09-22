// --------------------------- How to design APIs ------------------------------

// Requirement Gathering:
// Understand the business use case of the API
// Understand the consumer of API. It can be a end consumer on web or mobile, it maybe a internal backend microservice API or can be a third party integration
// The security, authentication, performance, versioning would be different for each each consumer type.

// API Scope 
// Decide the scope of API, what it will do or what not.
// Decide the type of API whether it should be Restful, soap etc based on requirements.

// API Specs
// Decide API endpoints, proper naming conventions
// maintain proper versioning in case needed for third party api integrations. Backward compatibility.
// decide status code and error and success formats throught the application

// Security
// Decide whether API needs to be public or require Authentication mechanism ( OAuth, JWT, API keys etc)
// Decide the API access level - Authorization
// Decide whether API payloads needs encryption
// Implement script, xml and other injection prevention techniques.
// Validate all incoming payloads to meet our system requirements.

// Performance
// Implement Rate limiting to avoid misuse
// Implement caching strategy for slower query results
// Implement pagination for longer responses
// Decide sync vs async api. Long running task may require asybc or event driven approach

// ----------------------------------- REST APIs ---------------------------------

// Representational State Transfer. Principles of it
// 1) Stateless
// 2) Clinet Server Architecture
// 3) Layered System: Client does not know whether it is connected to load balancer or actual server

// ----------------------------------- API testing -------------------------------

// Strcture the API testing process according to the Testing Pyramid

// 1. Unit Test: Write tests for the individual functions, classes, or modules that make up the API usng jest
// 2) Integration Testing: Thes tests verifies that different parts of the API are working fina like it correctly calls the service layer
// interacts with the database and return the expected result.
// 3. E2E Testing: These testing mimics the full user flow. Like logging into the application, filling the details and proceding to final steps.

// Functional Testing
// 1. APIs should behave according to their contacts. We can use Swagger for thid.
// 2. API tests should include data validation step and

// Non-Functional Testing
// 1. Load Testing: how much time it takes to return the response, how many concurrent users can access the API
// 2. Security Testing: Authentication, uthorization and input validation and sanitization.