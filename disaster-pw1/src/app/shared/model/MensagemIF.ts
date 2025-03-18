export abstract class MensagemIF {
    abstract sucesso(mensagem: string): void;

    abstract erro(mensagem: string): void;

    abstract info(mensagem: string): void;

    abstract aviso(mensagem: string): void;

}