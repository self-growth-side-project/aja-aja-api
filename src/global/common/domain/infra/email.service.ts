export interface EmailService {
  send(to: string, subject: string, content: string): void;
}
