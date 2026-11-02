/**
 * Pengganti pure-JS untuk `whatsapp-rust-bridge`.
 * Paket aslinya ESM-only (WASM) sehingga require() gagal dengan error
 * 'No "exports" main defined' di banyak panel/Node. Shim ini memakai
 * modul crypto bawaan Node, jadi tidak butuh dependency tambahan.
 */
const { createHash, hkdfSync } = require('crypto');

const md5 = (data) => createHash('md5').update(data).digest();

const hkdf = (buffer, expandedLength, opts = {}) => {
    const { salt, info } = opts;
    const ikm = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
    const saltBuf = salt ? Buffer.from(salt) : Buffer.alloc(0);
    const infoBuf = info ? Buffer.from(info) : Buffer.alloc(0);
    return Buffer.from(hkdfSync('sha256', ikm, saltBuf, infoBuf, expandedLength));
};

const expandAppStateKeys = (keydata) => {
    const e = hkdf(keydata, 160, { info: 'WhatsApp Mutation Keys' });
    return {
        indexKey: e.subarray(0, 32),
        valueEncryptionKey: e.subarray(32, 64),
        valueMacKey: e.subarray(64, 96),
        snapshotMacKey: e.subarray(96, 128),
        patchMacKey: e.subarray(128, 160)
    };
};

class LTHashAntiTampering {
    constructor(salt = 'WhatsApp Patch Integrity') {
        this.salt = salt;
    }
    _pointwise(base, item, sign) {
        const expanded = hkdf(Buffer.from(item), 128, { info: this.salt });
        const out = Buffer.alloc(128);
        for (let i = 0; i < 128; i += 2) {
            const a = base.readUInt16LE(i);
            const b = expanded.readUInt16LE(i);
            out.writeUInt16LE((a + sign * b) & 0xffff, i);
        }
        return out;
    }
    subtractThenAdd(base, subList, addList) {
        let acc = Buffer.from(base);
        for (const item of subList) acc = this._pointwise(acc, item, -1);
        for (const item of addList) acc = this._pointwise(acc, item, 1);
        return acc;
    }
    add(base, list) {
        return this.subtractThenAdd(base, [], list);
    }
    subtract(base, list) {
        return this.subtractThenAdd(base, list, []);
    }
}

module.exports = { md5, hkdf, expandAppStateKeys, LTHashAntiTampering };
