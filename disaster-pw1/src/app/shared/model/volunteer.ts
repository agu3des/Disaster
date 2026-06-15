export class Volunteer {

    id?: string;
    name = '';
    email = '';
    phone = '';
    imageUrl = '';
    createdBy?: string;


    constructor(id?: string, volunteer: Volunteer = {name : '', email: '', phone: '', imageUrl: ''}) {
        this.id = id;
        this.name = volunteer.name;
        this.email = volunteer.email;
        this.phone = volunteer.phone;
        this.imageUrl = volunteer.imageUrl;
        this.createdBy = volunteer.createdBy; 
    }
        
}
