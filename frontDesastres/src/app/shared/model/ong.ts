export class Ong {

    id?: string;
    nome = '';
    email = '';
    telefone = '';
    regiaoAtuacao = '';
    rede_social = '';
    cnpj = '';
    pix = '';


    constructor(id?: string, volunteer: Ong = {nome : '', email: '', telefone: '', regiaoAtuacao: '', rede_social: '', cnpj:'', pix:''}) {
        this.id = id;
        this.nome = volunteer.nome;
        this.email = volunteer.email;
        this.telefone = volunteer.telefone;
        this.regiaoAtuacao = volunteer.regiaoAtuacao;
        this.rede_social = volunteer.rede_social;
        this.cnpj = volunteer.cnpj;
        this.pix = volunteer.pix;
    }
        
}
