import {
  randomBytes,
  scrypt as nodeScrypt,
  timingSafeEqual,
  type BinaryLike,
  type ScryptOptions,
} from "node:crypto";

const KEY_LENGTH = 64;
const N = 131072;
const R = 8;
const P = 1;
const MAX_MEMORY = 256 * 1024 * 1024;
const VERSION = "scrypt-v1";

function deriveKey(
  password: BinaryLike,
  salt: BinaryLike,
  keyLength: number,
  options: ScryptOptions,
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    nodeScrypt(password, salt, keyLength, options, (error, derivedKey) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(derivedKey);
    });
  });
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const derived = await deriveKey(password, salt, KEY_LENGTH, {
    N,
    r: R,
    p: P,
    maxmem: MAX_MEMORY,
  });

  return [
    VERSION,
    N,
    R,
    P,
    salt.toString("base64url"),
    derived.toString("base64url"),
  ].join("$");
}

export async function verifyPassword(
  password: string,
  storedHash: string,
): Promise<boolean> {
  try {
    const [version, nText, rText, pText, saltText, hashText] =
      storedHash.split("$");

    if (
      version !== VERSION ||
      !nText ||
      !rText ||
      !pText ||
      !saltText ||
      !hashText
    ) {
      return false;
    }

    const cost = Number(nText);
    const blockSize = Number(rText);
    const parallelization = Number(pText);

    if (
      cost !== N ||
      blockSize !== R ||
      parallelization !== P
    ) {
      return false;
    }

    const expected = Buffer.from(hashText, "base64url");
    const salt = Buffer.from(saltText, "base64url");

    if (expected.length !== KEY_LENGTH || salt.length !== 16) {
      return false;
    }

    const derived = await deriveKey(password, salt, expected.length, {
      N: cost,
      r: blockSize,
      p: parallelization,
      maxmem: MAX_MEMORY,
    });

    return timingSafeEqual(expected, derived);
  } catch {
    return false;
  }
}
