import * as bcrypt from 'bcrypt';

class Hash {
  static SALT_ROUNDS: number = 10;

  async make(plaintext: string): Promise<string> {
    return await bcrypt.hash(plaintext, Hash.SALT_ROUNDS);
  }
}

export const hashService = new Hash();
