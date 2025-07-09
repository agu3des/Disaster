export class Volunteer {

    id?: string;
    name = '';
    email = '';
    phone = '';
    imagemUrl = '';


    constructor(id?: string, volunteer: Volunteer = {name : '', email: '', phone: '', imagemUrl: ''}) {
        this.id = id;
        this.name = volunteer.name;
        this.email = volunteer.email;
        this.phone = volunteer.phone;
        this.imagemUrl = volunteer.imagemUrl;
    }
        
}
