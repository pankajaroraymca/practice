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

