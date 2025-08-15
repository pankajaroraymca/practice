export abstract class ElevatorDispatchStrategy {
    abstract shouldServeRequest(floor: number): boolean;
  }
  