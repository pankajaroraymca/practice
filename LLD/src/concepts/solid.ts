// // ------------------------------------------ What are solid principles ----------------------------------------------------------

// // There are 5 basic design principles in object oriented programming and software development.
// // Main goal is to make your code more redable, understandable and maintainable and scalable.

// // 1) Single Responsibility Principle
// // 2) Open/Closed Principle
// // 3) Liskov Substitution Principle
// // 4) Interface Segragation Principle
// // 5) Dependency Inversion Principle


// // --------------------------------------- Single Responsibility Priniciple --------------------------------------------------

// // A class should have only one reason to change meaning it should have only single responsibility
// // E.g A user class is responsible for managing users only. Let's suppose we add a method sendMail which does sending mail of 
// // profile information. Then it's not a good practice. For sending mails, we should have another class

// class User {
//     map = new Map()
//     id = 1
//     constructor() { }

//     // Method to create User
//     createUser(name, age) {
//         this.map.set(this.id, { name, age })
//     }

//     // method to get user by id
//     getUserById(id) {
//         return this.map.get(id)
//     }

//     // method to send profile info through mail
//     sendProfileInfo(id) {
//         // Some logic...
//     }

//     // This is the bad practice as user class is also responsible for sending mails.
//     // This should not happen. We should have separate class for sending mails.
// }


// // -----------------------------------------------Open/Closed Principle----------------------------------------------------

// // Entities like class, function, modules should be open for extension but closed for modification
// // It means we can add new functionalities by inheritance or composition only. This way we will not modify the existing code.
// // E.g calculating the area of a shape

// // Code without Principle

// class Shape {
//     shape: string
//     identifierLength: number
//     constructor(shape: string, identifierLength: number) {
//         this.shape = shape
//         this.identifierLength = identifierLength
//     }

//     calculateArea() {

//         if (this.shape == 'Circle') {
//             return Math.PI * this.identifierLength ** 2

//         } else if (this.shape == 'Square') {
//             return this.identifierLength ** 2
//         }
//     }
// }

// const squareInstance = new Shape('Square', 5)
// const circleInstance = new Shape('Circle', 5)
// console.log("area", squareInstance.calculateArea())
// console.log("area", circleInstance.calculateArea())

// // In Above code, there is a problem. In case we need to calculate the area of new shape. then we have to modify the existing
// // code of calculateArea. This is not the good practice.

// // Code With Open for Extension and closed for Modification Principle

// interface Shape2 {
//     area(): number
// }

// class Square2 implements Shape2 {
//     length: number
//     constructor(length) {
//         this.length = length
//     }

//     area(): number {
//         return this.length ** 2
//     }
// }

// class Circle2 implements Shape2 {
//     radius: number
//     constructor(radius) {
//         this.radius = radius
//     }

//     area(): number {
//         return Math.PI * this.radius ** 2
//     }
// }

// const squareInstance2 = new Square2(5)
// const circleInstance2 = new Circle2(5)
// console.log("area with principle", squareInstance2.area());
// console.log("area with principle", circleInstance2.area());

// // In the above example, if we have to introduce new shape, then we have to make another class that will implement the interface
// // Shape2. Our old code will not be impacted.

// // -----------------------------------------------Liskov Substitue Principle --------------------------------------------------

// // This principle states that objects of a superclass should be replacable with the objects of subclass without altering the
// // correctness of program
// // No client should be forced to depend on methods it does not use. Split large interfaces into smaller/specific ones.

// // Easy Language with E.g: If you have parent class Vehicle with getEnginePower and getNumberOfWheels methods. Now your Bicycle class extends Vehicle class.
// // But Bicycle class will have methods getEnginePower and getNumberOfWheels both available. But Bicycle  can not have engine. SO this is incorrect.
// // Engine Method should not present in Bicycle class. Solution. We will divide the class for Bicycle and Car.


// // Code Without following Liskov principle
// class Vehicle {
//     constructor() {

//     }

//     getEnginePower() {
//         // some logic
//         return
//     }

//     getNumberOfWheels() {
//         // some logic
//         return
//     }
// }

// class Car extends Vehicle {
//     constructor() {
//         super()
//     }
//     // some more methods
// }

// class Bicycle extends Vehicle {
//     constructor() {
//         super()
//     }
//     // some more methods
// }

// const car1 = new Car()
// const bicycle1 = new Bicycle()
// bicycle1.getEnginePower() // This is incorrect. Bicycle should not have engine method.

// // Code following Liskov Principle
// // To solve this, bicycle should have different method. SO we have to divide the Vehicle class.

// // General interface
// class Vehicle2 {
//     getNumberOfWheels() {
//         throw new Error("Must be implemented by subclass");
//     }
// }

// // Specific interface for engine vehicles
// class EngineVehicle extends Vehicle2 {
//     getEnginePower() {
//         throw new Error("Must be implemented by subclass");
//     }
// }

// class Car2 extends EngineVehicle {
//     getNumberOfWheels() {
//         return 4;
//     }

//     getEnginePower() {
//         return "200 HP";
//     }
// }

// class Bicycle2 extends Vehicle {
//     getNumberOfWheels() {
//         return 2;
//     }
// }

// const car = new Car2();
// console.log(car.getEnginePower()); // ✅ 200 HP
// console.log(car.getNumberOfWheels()); // ✅ 4

// const cycle = new Bicycle2();
// console.log(cycle.getNumberOfWheels()); // ✅ 2
// // console.log(cycle.getEnginePower()); // ❌ method is not available which is correct implementation of liskov
// // We will not have engine method available at compile time


// // ------------------------------------------Interface Segregation Principle -------------------------------------------------

// // It ensures that classes are not burden with methods that they don't need.
// // It supports better design by breaking large, general purpose interfaces into smaller one

// // Note: You may find liskov and ISP as same. But there is a difference.
// // In Liskov, you are already getting irrelevant methods which should not be at compile time. It is an inheritance problem
// // And in ISP, you are forced to implement methods which you dont need. It a headache for user to implement all those methods.


// // E.g:

// // Code without following ISP

// interface Worker1 {
//     work(): void;
//     eat(): void;
//     sleep(): void;
// }

// // A robot doesn't eat or sleep!
// class RobotWorker implements Worker1 {
//     work() {
//         console.log("Robot working...");
//     }

//     eat() {
//         // Not applicable for robot
//         throw new Error("Robots don't eat!");
//     }

//     sleep() {
//         // Not applicable for robot
//         throw new Error("Robots don't sleep!");
//     }
// }

// // Code With ISP

// // Small and specific interfaces
// interface Workable {
//     work(): void;
// }

// interface Eatable {
//     eat(): void;
// }

// interface Sleepable {
//     sleep(): void;
// }

// // Human implements only what it needs
// class HumanWorker implements Workable, Eatable, Sleepable {
//     work() {
//         console.log("Human working...");
//     }
//     eat() {
//         console.log("Human eating...");
//     }
//     sleep() {
//         console.log("Human sleeping...");
//     }
// }

// // Robot implements only what's needed
// class RobotWorker2 implements Workable {
//     work() {
//         console.log("Robot working...");
//     }
// }

// // Now, Rebot is not forced to implement eat and sleep methods


// // ------------------------------------------------ Dependency Inversion Principle ----------------------------------------------

// // High level modules should not depend on low level modules. Both should depend on abstractions

// // E.g. We have a high level module Notification Service. This service depends on another 2 services
// // sms service and email service. Now if i have to introduce whatsapp service, then we have to make
// // changes in high level module i.e notification service.
// // To fix this, we have to introduce an abstract class notification channel.

// // Code without DI Principle

// class NotificationService {

//     private smsService: SmsService
//     private emailService: EmailService

//     constructor() {
//         this.smsService = new SmsService,
//             this.emailService = new EmailService
//     }

//     notifyByEmail(msg) {
//         this.emailService.sendEmail(msg)
//     }

//     notifyBySms(msg) {
//         this.smsService.sendSms(msg)
//     }

// }

// class EmailService {

//     constructor() { }

//     sendEmail(msg) {
//         // some logic
//         console.log("sendig mail", msg);

//     }
// }

// class SmsService {
//     sendSms(msg) {
//         // some logic
//         console.log("sendig Sms", msg);

//     }
// }

// const notificationService = new NotificationService()
// notificationService.notifyByEmail("Order is Shipped.")
// notificationService.notifyBySms("Otp is 1234")

// // Now if i have to introduce whatsapp notification, then we will have to make changes in 
// // high order module i.e notification service. This is not a good practice.

// // Code with DI Principle

// interface NotificationChannel {

//     send(msg: string): void
// }
// class NotificationService2 {
//     private notificationChannel: NotificationChannel

//     constructor(notificationChannel: NotificationChannel) {
//         this.notificationChannel = notificationChannel
//     }

//     notify(msg){
//         this.notificationChannel.send(msg)
//     }

// }

// class EmailService2 implements NotificationChannel {

//     constructor() {

//     }

//     send(msg: string): void {
//         console.log("sending mail", msg);

//     }
// }

// class SmsService2 implements NotificationChannel {

//     constructor() { }

//     send(msg: string): void {
//         console.log("sending sms", msg);

//     }
// }

// const smsService = new SmsService2()
// const emailService = new EmailService2()
// const notificationSmsService = new NotificationService2(smsService)
// const notificationEmailService = new NotificationService2(emailService)
// notificationSmsService.notify("Order is Shipped updated.")
// notificationEmailService.notify("Otp is 1234 updated")

// // We have implemented an abstraction method using interface Notification channel
// // Now all low level modules needs to implement this interface
// // So even if new whatsapp like service is introduced, there will not be any changes
// // in high level module i.e Notification service.





