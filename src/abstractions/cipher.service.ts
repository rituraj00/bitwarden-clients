import { CipherType } from '../enums/cipherType';

import { CipherData } from '../models/data/cipherData';

import { Cipher } from '../models/domain/cipher';
import { Field } from '../models/domain/field';
import { SymmetricCryptoKey } from '../models/domain/symmetricCryptoKey';

import { AttachmentView } from '../models/view/attachmentView';
import { CipherView } from '../models/view/cipherView';
import { FieldView } from '../models/view/fieldView';

export abstract class CipherService {
    decryptedCipherCache: CipherView[];

    clearCache: () => void;
    encrypt: (model: CipherView) => Promise<Cipher>;
    encryptFields: (fieldsModel: FieldView[], key: SymmetricCryptoKey) => Promise<Field[]>;
    encryptField: (fieldModel: FieldView, key: SymmetricCryptoKey) => Promise<Field>;
    get: (id: string) => Promise<Cipher>;
    getAll: () => Promise<Cipher[]>;
    getAllDecrypted: () => Promise<CipherView[]>;
    getAllDecryptedForGrouping: (groupingId: string, folder?: boolean) => Promise<CipherView[]>;
    getAllDecryptedForUrl: (url: string, includeOtherTypes?: CipherType[]) => Promise<CipherView[]>;
    getLastUsedForUrl: (url: string) => Promise<CipherView>;
    updateLastUsedDate: (id: string) => Promise<void>;
    saveNeverDomain: (domain: string) => Promise<void>;
    saveWithServer: (cipher: Cipher) => Promise<any>;
    shareWithServer: (cipher: Cipher) => Promise<any>;
    shareAttachmentWithServer: (attachmentView: AttachmentView, cipherId: string,
        organizationId: string) => Promise<any>;
    saveAttachmentWithServer: (cipher: Cipher, unencryptedFile: any) => Promise<Cipher>;
    saveAttachmentRawWithServer: (cipher: Cipher, filename: string, data: ArrayBuffer) => Promise<Cipher>;
    saveCollectionsWithServer: (cipher: Cipher) => Promise<any>;
    upsert: (cipher: CipherData | CipherData[]) => Promise<any>;
    replace: (ciphers: { [id: string]: CipherData; }) => Promise<any>;
    clear: (userId: string) => Promise<any>;
    delete: (id: string | string[]) => Promise<any>;
    deleteWithServer: (id: string) => Promise<any>;
    deleteAttachment: (id: string, attachmentId: string) => Promise<void>;
    deleteAttachmentWithServer: (id: string, attachmentId: string) => Promise<void>;
    sortCiphersByLastUsed: (a: any, b: any) => number;
    sortCiphersByLastUsedThenName: (a: any, b: any) => number;
}
