export class Pet {
    constructor(
        public userId: string, 
        public petId: string,
        public petName: string,
        public age: number,
        public status: string,
        public description: string, 
        public photoIds: string[],
        public dateLastSeen: Date,
        public locationLastSeen?:  [number, number],
        public spottedLocations?: [number, number][],
        public otherInfo?: string,
    ) {}

    public getSpottedLocations(): [number, number][] | undefined {
        return this.spottedLocations;
    }
}


