import * as bip39 from 'bip39';
import { strict as assert } from 'assert';
import { getChecksum, getMnemonicWithChecksum } from './checksum';

describe('BIP39 Mnemonic Checksums', () => {
    const twelveWords =
        'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
    const eighteenWords =
        'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon agent';
    const twentyFourWords =
        'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art';


    describe('getMnemonicWithChecksum', () => {
        it('should create a known checksum from 12 words', () => {
            const mnemonicWithChecksum = getMnemonicWithChecksum(twelveWords);
    
            expect(mnemonicWithChecksum).toEqual(twelveWords)
            assert(bip39.validateMnemonic(mnemonicWithChecksum));
        })
    
        it('should create a known checksum from 18 words', () => {
            
    
            const mnemonicWithChecksum = getMnemonicWithChecksum(eighteenWords);
    
            expect(mnemonicWithChecksum).toEqual(eighteenWords)
            assert(bip39.validateMnemonic(mnemonicWithChecksum));
        })
    
        it('should create a known checksum from 24 words', () => {
            
    
            const mnemonicWithChecksum = getMnemonicWithChecksum(twentyFourWords);
    
            expect(mnemonicWithChecksum).toEqual(twentyFourWords)
            assert(bip39.validateMnemonic(mnemonicWithChecksum));
        })
    
        it('should create a known checksum from 12 words with wrong checksum', () => {
            const wrongChecksum =
                'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon actual';
    
            const mnemonicWithChecksum = getMnemonicWithChecksum(wrongChecksum, false);
            
            assert(bip39.validateMnemonic(mnemonicWithChecksum))
            expect(mnemonicWithChecksum).toEqual(wrongChecksum)
        })
    })

    describe('getChecksum', () => {
        it('should compare a 12 word checksum with the right checksum', () => {
            const mnemonicWithChecksum = getMnemonicWithChecksum(twelveWords, false);
            
            assert(bip39.validateMnemonic(mnemonicWithChecksum))

            expect(getChecksum(twelveWords)).toEqual(mnemonicWithChecksum.split(' ')[11])
        })
    })
})