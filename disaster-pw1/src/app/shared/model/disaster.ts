export class Disaster {

    id?: string;
    occurrenceDate = '';
    durationDays?: number;
    intensityScale?: number;
    victimCount?: number;
    type = '';
    regions = '';
    imageUrl = '';
    createdBy ?: string; 

    constructor(id?: string, disaster: Disaster = {occurrenceDate: '', type: '', regions: '', imageUrl: ''}) {
        this.id = id;
        this.occurrenceDate = disaster.occurrenceDate;
        this.durationDays = disaster.durationDays;
        this.intensityScale = disaster.intensityScale;
        this.victimCount = disaster.victimCount;
        this.type = disaster.type;
        this.regions = disaster.regions;
        this.imageUrl = disaster.imageUrl;
        this.createdBy = disaster.createdBy; 
    }
        
}