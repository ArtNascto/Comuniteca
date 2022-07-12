import * as crypto from "crypto";

export class Password {
  generateHash(password: string): [string, string] {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
      .toString(`hex`);

    return [salt, hash];
  }
  validatePassword(password: string, salt: string, userHash: string): boolean {
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
      .toString(`hex`);
    return hash === userHash;
  }
}
