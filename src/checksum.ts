import fs from 'fs'
import { sha256 } from '@noble/hashes/sha256';

const bip39EnglishWordsArray = fs.readFileSync('./text/bip39_english.txt', 'utf8').split('\n')

function normalize(str?: string): string {
    return (str || '').normalize('NFKD');
  }
  
  function lpad(str: string, padString: string, length: number): string {
    while (str.length < length) {
      str = padString + str;
    }
    return str;
  }
  
  function binaryToByte(bin: string): number {
    return parseInt(bin, 2);
  }
  
  function bytesToBinary(bytes: number[]): string {
    return bytes.map((x: number): string => lpad(x.toString(2), '0', 8)).join('');
  }
  
  const INVALID_MNEMONIC = 'Invalid mnemonic';
  const INVALID_ENTROPY = 'Invalid entropy';
  
  function deriveChecksumBits(entropyBuffer: Buffer): string {
    const ENT = entropyBuffer.length * 8;
    const CS = ENT / 32;
    const hash = sha256(Uint8Array.from(entropyBuffer));
    return bytesToBinary(Array.from(hash)).slice(0, CS);
  }
  
  export const getMnemonicWithChecksum = (mnemonic: string): string => {
    const words = normalize(mnemonic).split(' ');
    if (words.length % 3 !== 0) {
      throw new Error(INVALID_MNEMONIC);
    }
  
    // convert word indices to 11 bit binary strings
    const bits = words
      .map(
        (word: string): string => {
          const index = bip39EnglishWordsArray.indexOf(word);
          if (index === -1) {
            throw new Error(INVALID_MNEMONIC);
          }

          const paddedEntropy = lpad(index.toString(2), '0', 11)

          console.log(paddedEntropy)
  
          return paddedEntropy;
        },
      )
      .join('');
  
    // split the binary string into ENT/CS
    const dividerIndex = Math.floor(bits.length / 33) * 32;

    console.log(dividerIndex)

    const entropyBits = bits.slice(0, dividerIndex);

    console.log(bits)
    console.log(entropyBits)
  
    // the below bits are "wrong" for the purposes of checksum calculation
    const checksumBits = bits.slice(dividerIndex);

    console.log(checksumBits)
  
    // calculate the checksum and compare
    const entropyBytes = entropyBits.match(/(.{1,8})/g)!.map(binaryToByte);
    if (entropyBytes.length < 16) {
      throw new Error(INVALID_ENTROPY);
    }
    if (entropyBytes.length > 32) {
      throw new Error(INVALID_ENTROPY);
    }
    if (entropyBytes.length % 4 !== 0) {
      throw new Error(INVALID_ENTROPY);
    }
  
    const entropy = Buffer.from(entropyBytes);
  
    const calculatedBits = entropyBits + deriveChecksumBits(entropy);
    const chunks = calculatedBits.match(/(.{1,11})/g)!;
    const calculatedWords = chunks.map(
      (binary: string): string => {
        const index = binaryToByte(binary);
        return bip39EnglishWordsArray![index];
      },
    );
  
    return calculatedWords.join(' ');
  }