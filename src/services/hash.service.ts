import * as bcrypt from 'bcrypt';

class Hash {
  static SALT_ROUNDS: number = 10;

  async make(plaintext: string): Promise<string> {
    return await bcrypt.hash(plaintext, Hash.SALT_ROUNDS);
  }

  async compare(plaintext: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plaintext, hash);
  }
}

export const hashService = new Hash();
