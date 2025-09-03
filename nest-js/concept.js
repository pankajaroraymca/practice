// ----------------------------------------- What is Nestjs ------------------------------------

// Nestjs is a progressive framework built over nodejs. It is inspired by angular modular design. 
// Thus it is a preference for scalable applications where code needs to maintained easily.
// It is typescript first but also supports pure javascript

// Core Principles: 
// 1) Opinionated Archietecture: Use modules, controller, services. Thus encourages dependency injection (DI)
// 2) By default it uses express js internally. But we can use fastify also.
// 3) TypeScript First : Strong typing, decorators, and interfaces out of the box.
// 4) Structured approach makes large-scale applications manageable.

// ------------------------------------ Controllers --------------------------------------

// In NestJS, a Controller is a class responsible for handling incoming HTTP requests and returning responses to the client.
// Controllers defines routes with @Get, @Post decorators
// They enforce separation of concern, controller for endpoints and services for core buisness logic.

// ------------------------------------Providers ---------------------------------------------

// A Provider is a class or a value that can be injected into others classes via dependency injection (DI)
// Class are decorated with @Injectable decorator so that nestjs dependency container knows how to manage.

// There are 4 types of providers in nestjs
// 1) Class Provider
// 2) Constant Value Provider
// 3) Factory Provider: Dynamic Value Provider
// 4) Existing Provider → alias an existing provider.

// ------------------------------------ Modules ------------------------------------------------

// A module is a single logical unit to group related controllers, providers.
// Every Nestjs app has always AppModule.
// They are decorated with @Module

// There are 4 types of Modules
// 1) Root Module → entry point of the app (AppModule).
// 2) Feature Module → groups related controllers/providers (e.g., UsersModule).
// 3) Shared Module → reusable across modules (e.g., AuthModule).
// 4) Dynamic Module → modules configured at runtime (e.g., ConfigModule.forRoot()).

// Dynamic Modules: 
// As the name suggetss, in this we can provide custom imports, providers at run time
// A Dynamic Module in NestJS is a special type of module that can be configured at runtime with custom values, providers, or imports.
// Dynamic modules allow you to pass options (like database configs, API keys, feature flags) when importing.
// They are defined by a static method (commonly called forRoot() or forRootAsync()) inside a module class.

@Module({})
export class DatabaseModule {
  static forRootAsync() {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'DB_CONNECTION',
          useFactory: async () => {
            // maybe fetch from secret manager or api call
            return process.env.DB_URL || 'mongodb://localhost:27017/mydb';
          },
        },
      ],
      exports: ['DB_CONNECTION'],
    };
  }
}

// ---------------------------------------------- Dependency Injection -------------------------------------

// Dependency Injection (DI) is a design pattern where a class receives its dependencies from external sources rather than creating them internally.

// class UserService {
//   private db = new DatabaseService(); // ❌ tightly coupled
// }

// class UserService {
//   constructor(private db: DatabaseService) {} // ✅ injected
// }

// What's the benefit?
// if db service changes, then we need to change the user service also. but in depency injection, we are just injecting it not creating a instance of it.
// so maintanibility is easier and also separation of concern.