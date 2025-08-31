// ------------------------------------------ Monolith vs Microservice --------------------------------------

// When you are building an application, it's not straightforward to choose between one. There are certain factors which decide this architecture
// Both have their own advantages and their disadvantages. It's us to choose the right system architecture.
// There are some factors which decides this:

// 1) Project Complexity: 
// If the project is complex, microservice architecture is a better preference as it will need to scale and is easier to mantain.

// Team Size and skills
// If the team size is small, monolith is a good choice. Different microservices requires maximum developers each sharing individual responsibilties.

// Deployment
// Multiple microservices requires multple server resources and multiple ci/cd pipelines. While monolith offers a single unit so is single deployment.

// Scalability
// Microservice architecture gives us the flexibilty to scale individual services depending upon the load. But in monolith whole application needs to be scale.

// Change frequencies
// High release frequency for independent services. But in monolith, a coordinated release which is rare.

// Performance and latency
// Latency can be a problem in microservice as they need to connect with each other.

// Fault Tolerance
// In monolith, Single process — failure can take down the whole app. So microservice is a good choice here.

// Time to production
// Monolith is a good choice for faster development cycle. If the deadlines are short one must prefer monolith archietecture.