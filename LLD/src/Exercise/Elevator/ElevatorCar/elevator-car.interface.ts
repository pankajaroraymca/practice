export interface IElevatorCar {

    getId(): number,
    getStatus(): EElevatorCarStatus,
    getCurrentFloor(): number
    setStatus(status: EElevatorCarStatus): void
    setCurrentFloor(floor: number): void
    move(floor: number): boolean
}

export enum EElevatorCarStatus {
    IDLE = 'IDLE',
    MOVING = 'MOVING',
    OUT_OF_SERVICE = 'OUT_OF_SERVICE'
}