/// <reference types="node" />
import { AssetTransferAddress, PlatformAddress } from "codechain-primitives";
import { AssetTransactionGroup } from "./action/AssetTransactionGroup";
import { CreateShard } from "./action/CreateShard";
import { Payment } from "./action/Payment";
import { SetRegularKey } from "./action/SetReulgarKey";
import { SetShardOwners } from "./action/SetShardOwners";
import { SetShardUsers } from "./action/SetShardUsers";
import { Asset } from "./Asset";
import { AssetScheme } from "./AssetScheme";
import { Block } from "./Block";
import { H128 } from "./H128";
import { H160 } from "./H160";
import { H256 } from "./H256";
import { H512 } from "./H512";
import { Invoice } from "./Invoice";
import { Parcel } from "./Parcel";
import { Script } from "./Script";
import { SignedParcel } from "./SignedParcel";
import { AssetComposeTransaction } from "./transaction/AssetComposeTransaction";
import { AssetDecomposeTransaction } from "./transaction/AssetDecomposeTransaction";
import { AssetMintTransaction } from "./transaction/AssetMintTransaction";
import { AssetOutPoint } from "./transaction/AssetOutPoint";
import { AssetTransferInput } from "./transaction/AssetTransferInput";
import { AssetTransferOutput } from "./transaction/AssetTransferOutput";
import { AssetTransferTransaction } from "./transaction/AssetTransferTransaction";
import { CreateWorldTransaction } from "./transaction/CreateWorldTransaction";
import { SetWorldOwnersTransaction } from "./transaction/SetWorldOwnersTransaction";
import { SetWorldUsersTransaction } from "./transaction/SetWorldUsersTransaction";
import { Transaction } from "./transaction/Transaction";
import { NetworkId } from "./types";
import { U256 } from "./U256";
export declare class Core {
    static classes: {
        H128: typeof H128;
        H160: typeof H160;
        H256: typeof H256;
        H512: typeof H512;
        U256: typeof U256;
        Invoice: typeof Invoice;
        Block: typeof Block;
        Parcel: typeof Parcel;
        SignedParcel: typeof SignedParcel;
        Payment: typeof Payment;
        SetRegularKey: typeof SetRegularKey;
        AssetTransactionGroup: typeof AssetTransactionGroup;
        CreateShard: typeof CreateShard;
        SetShardOwners: typeof SetShardOwners;
        SetShardUsers: typeof SetShardUsers;
        AssetMintTransaction: typeof AssetMintTransaction;
        AssetTransferTransaction: typeof AssetTransferTransaction;
        AssetComposeTransaction: typeof AssetComposeTransaction;
        AssetDecomposeTransaction: typeof AssetDecomposeTransaction;
        AssetTransferInput: typeof AssetTransferInput;
        AssetTransferOutput: typeof AssetTransferOutput;
        AssetOutPoint: typeof AssetOutPoint;
        CreateWorldTransaction: typeof CreateWorldTransaction;
        SetWorldOwnersTransaction: typeof SetWorldOwnersTransaction;
        SetWorldUsersTransaction: typeof SetWorldUsersTransaction;
        Asset: typeof Asset;
        AssetScheme: typeof AssetScheme;
        Script: typeof Script;
        PlatformAddress: typeof PlatformAddress;
        AssetTransferAddress: typeof AssetTransferAddress;
    };
    classes: {
        H128: typeof H128;
        H160: typeof H160;
        H256: typeof H256;
        H512: typeof H512;
        U256: typeof U256;
        Invoice: typeof Invoice;
        Block: typeof Block;
        Parcel: typeof Parcel;
        SignedParcel: typeof SignedParcel;
        Payment: typeof Payment;
        SetRegularKey: typeof SetRegularKey;
        AssetTransactionGroup: typeof AssetTransactionGroup;
        CreateShard: typeof CreateShard;
        SetShardOwners: typeof SetShardOwners;
        SetShardUsers: typeof SetShardUsers;
        AssetMintTransaction: typeof AssetMintTransaction;
        AssetTransferTransaction: typeof AssetTransferTransaction;
        AssetComposeTransaction: typeof AssetComposeTransaction;
        AssetDecomposeTransaction: typeof AssetDecomposeTransaction;
        AssetTransferInput: typeof AssetTransferInput;
        AssetTransferOutput: typeof AssetTransferOutput;
        AssetOutPoint: typeof AssetOutPoint;
        CreateWorldTransaction: typeof CreateWorldTransaction;
        SetWorldOwnersTransaction: typeof SetWorldOwnersTransaction;
        SetWorldUsersTransaction: typeof SetWorldUsersTransaction;
        Asset: typeof Asset;
        AssetScheme: typeof AssetScheme;
        Script: typeof Script;
        PlatformAddress: typeof PlatformAddress;
        AssetTransferAddress: typeof AssetTransferAddress;
    };
    private networkId;
    /**
     * @param params.networkId The network id of CodeChain.
     */
    constructor(params: {
        networkId: NetworkId;
    });
    /**
     * Creates Payment action which pays the value amount of CCC(CodeChain Coin)
     * from the parcel signer to the recipient. Who is signing the parcel will pay.
     * @param params.recipient The platform account who receives CCC
     * @param params.amount Amount of CCC to pay
     * @throws Given string for recipient is invalid for converting it to PlatformAddress
     * @throws Given number or string for amount is invalid for converting it to U256
     */
    createPaymentParcel(params: {
        recipient: PlatformAddress | string;
        amount: U256 | number | string;
    }): Parcel;
    /**
     * Creates SetRegularKey action which sets the regular key of the parcel signer.
     * @param params.key The public key of a regular key
     * @throws Given string for key is invalid for converting it to H512
     */
    createSetRegularKeyParcel(params: {
        key: H512 | string;
    }): Parcel;
    /**
     * Creates AssetTransactionGroup action which can mint or transfer assets through
     * AssetMintTransaction or AssetTransferTransaction.
     * @param params.transactions List of transaction
     */
    createAssetTransactionGroupParcel(params: {
        transactions: Transaction[];
    }): Parcel;
    /**
     * Creates CreateShard action which can create new shard
     */
    createCreateShardParcel(): Parcel;
    createSetShardOwnersParcel(params: {
        shardId: number;
        owners: Array<PlatformAddress | string>;
    }): Parcel;
    /**
     * Create SetShardUser action which can change shard users
     * @param params.shardId
     * @param params.users
     */
    createSetShardUsersParcel(params: {
        shardId: number;
        users: Array<PlatformAddress | string>;
    }): Parcel;
    /**
     * Creates asset's scheme.
     * @param params.metadata Any string that describing the asset. For example,
     * stringified JSON containing properties.
     * @param params.amount Total amount of this asset
     * @param params.registrar Platform account or null. If account is present, the
     * parcel that includes AssetTransferTransaction of this asset must be signed by
     * the registrar account.
     * @throws Given string for registrar is invalid for converting it to paltform account
     */
    createAssetScheme(params: {
        shardId: number;
        worldId: number;
        metadata: string;
        amount: number;
        registrar?: PlatformAddress | string;
        pool?: {
            assetType: H256 | string;
            amount: number;
        }[];
    }): AssetScheme;
    createCreateWorldTransaction(params: {
        networkId?: NetworkId;
        shardId: number;
        owners: Array<PlatformAddress | string>;
        nonce?: number;
    }): CreateWorldTransaction;
    createSetWorldOwnersTransaction(params: {
        networkId?: NetworkId;
        shardId: number;
        worldId: number;
        owners: Array<PlatformAddress | string>;
        nonce: number;
    }): SetWorldOwnersTransaction;
    createSetWorldUsersTransaction(params: {
        networkId?: NetworkId;
        shardId: number;
        worldId: number;
        users: Array<PlatformAddress | string>;
        nonce: number;
    }): SetWorldUsersTransaction;
    createAssetMintTransaction(params: {
        scheme: AssetScheme | {
            networkId?: NetworkId;
            shardId: number;
            worldId: number;
            metadata: string;
            registrar?: PlatformAddress | string;
            amount: number | null;
        };
        recipient: AssetTransferAddress | string;
        nonce?: number;
    }): AssetMintTransaction;
    createAssetTransferTransaction(params?: {
        burns?: AssetTransferInput[];
        inputs?: AssetTransferInput[];
        outputs?: AssetTransferOutput[];
        networkId?: NetworkId;
        nonce?: number;
    }): AssetTransferTransaction;
    createAssetComposeTransaction(params: {
        scheme: AssetScheme | {
            shardId: number;
            worldId: number;
            metadata: string;
            amount: number | null;
            registrar?: PlatformAddress | string;
            networkId?: NetworkId;
        };
        inputs: AssetTransferInput[];
        recipient: AssetTransferAddress | string;
        nonce?: number;
    }): AssetComposeTransaction;
    createAssetDecomposeTransaction(params: {
        input: AssetTransferInput;
        outputs?: AssetTransferOutput[];
        networkId?: NetworkId;
        nonce?: number;
    }): void;
    createAssetTransferInput(params: {
        assetOutPoint: AssetOutPoint | {
            transactionHash: H256 | string;
            index: number;
            assetType: H256 | string;
            amount: number;
            lockScriptHash?: H256 | string;
            parameters?: Buffer[];
        };
        lockScript?: Buffer;
        unlockScript?: Buffer;
    }): AssetTransferInput;
    createAssetOutPoint(params: {
        transactionHash: H256 | string;
        index: number;
        assetType: H256 | string;
        amount: number;
    }): AssetOutPoint;
    createAssetTransferOutput(params: {
        assetType: H256 | string;
        amount: number;
    } & ({
        recipient: AssetTransferAddress | string;
    } | {
        lockScriptHash: H256 | string;
        parameters: Buffer[];
    })): AssetTransferOutput;
    getTransactionFromJSON(json: any): Transaction;
}
