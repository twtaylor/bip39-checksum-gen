import * as bip39 from 'bip39';
import { strict as assert } from 'assert';
import { getMnemonicWithChecksum } from './checksum';

describe('BIP39 Mnemonic Checksums', () => {
    const twelveWords =
            'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';

    it('should create a known checksum from 12 words', () => {
        const mnemonicWithChecksum = getMnemonicWithChecksum(twelveWords);

        expect(mnemonicWithChecksum).toEqual(twelveWords)
        assert(bip39.validateMnemonic(mnemonicWithChecksum));
    })

    it('should create a known checksum from 18 words', () => {
        const eighteenWords =
        'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon agent';

        const mnemonicWithChecksum = getMnemonicWithChecksum(eighteenWords);

        expect(mnemonicWithChecksum).toEqual(eighteenWords)
        assert(bip39.validateMnemonic(mnemonicWithChecksum));
    })

    it('should create a known checksum from 24 words', () => {
        const twentyFourWords =
        'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art';

        const mnemonicWithChecksum = getMnemonicWithChecksum(twentyFourWords);

        expect(mnemonicWithChecksum).toEqual(twentyFourWords)
        assert(bip39.validateMnemonic(mnemonicWithChecksum));
    })

    it('should create a known checksum from 12 words with wrong checksum', () => {
        const wrongChecksum =
            'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon actual';

        const mnemonicWithChecksum = getMnemonicWithChecksum(wrongChecksum);
        
        assert(bip39.validateMnemonic(mnemonicWithChecksum))
        expect(mnemonicWithChecksum).toEqual(wrongChecksum)
    })
})