export declare class EmailService {
    private transporter;
    constructor();
    sendUserPassword(email: string, password: string): Promise<void>;
}
