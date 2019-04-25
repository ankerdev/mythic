import * as bcrypt from 'bcrypt';

export class Hash {
  static SALT_ROUNDS: number = 10;

  static async make(plaintext: string): Promise<string> {
    return await bcrypt.hash(plaintext, Hash.SALT_ROUNDS);
  }

  static async compare(plaintext: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plaintext, hash);
  }
}
