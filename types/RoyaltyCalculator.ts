/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface RoyaltyCalculatorInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "calculateRoyalty"
      | "contentRegistry"
      | "getRoyaltyInfo"
      | "payRoyalty"
      | "royaltySettings"
      | "setFlatRoyalty"
      | "setRoyaltyPercentage"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "FlatRoyaltySet"
      | "RoyaltyPaid"
      | "RoyaltySettingsUpdated"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "calculateRoyalty",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "contentRegistry",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getRoyaltyInfo",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "payRoyalty",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "royaltySettings",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setFlatRoyalty",
    values: [BigNumberish, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setRoyaltyPercentage",
    values: [
      BigNumberish,
      AddressLike,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "calculateRoyalty",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "contentRegistry",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoyaltyInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "payRoyalty", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "royaltySettings",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setFlatRoyalty",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRoyaltyPercentage",
    data: BytesLike
  ): Result;
}

export namespace FlatRoyaltySetEvent {
  export type InputTuple = [
    contentId: BigNumberish,
    recipient: AddressLike,
    flatFee: BigNumberish
  ];
  export type OutputTuple = [
    contentId: bigint,
    recipient: string,
    flatFee: bigint
  ];
  export interface OutputObject {
    contentId: bigint;
    recipient: string;
    flatFee: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoyaltyPaidEvent {
  export type InputTuple = [
    contentId: BigNumberish,
    from: AddressLike,
    to: AddressLike,
    amount: BigNumberish
  ];
  export type OutputTuple = [
    contentId: bigint,
    from: string,
    to: string,
    amount: bigint
  ];
  export interface OutputObject {
    contentId: bigint;
    from: string;
    to: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoyaltySettingsUpdatedEvent {
  export type InputTuple = [
    contentId: BigNumberish,
    recipient: AddressLike,
    percentage: BigNumberish
  ];
  export type OutputTuple = [
    contentId: bigint,
    recipient: string,
    percentage: bigint
  ];
  export interface OutputObject {
    contentId: bigint;
    recipient: string;
    percentage: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface RoyaltyCalculator extends BaseContract {
  connect(runner?: ContractRunner | null): RoyaltyCalculator;
  waitForDeployment(): Promise<this>;

  interface: RoyaltyCalculatorInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  calculateRoyalty: TypedContractMethod<
    [contentId: BigNumberish, amount: BigNumberish],
    [bigint],
    "view"
  >;

  contentRegistry: TypedContractMethod<[], [string], "view">;

  getRoyaltyInfo: TypedContractMethod<
    [contentId: BigNumberish],
    [
      [string, bigint, bigint, bigint, boolean, bigint] & {
        recipient: string;
        percentage: bigint;
        minAmount: bigint;
        maxAmount: bigint;
        isFlat: boolean;
        flatFee: bigint;
      }
    ],
    "view"
  >;

  payRoyalty: TypedContractMethod<[contentId: BigNumberish], [void], "payable">;

  royaltySettings: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, bigint, bigint, bigint, boolean, bigint] & {
        recipient: string;
        percentage: bigint;
        minAmount: bigint;
        maxAmount: bigint;
        isFlat: boolean;
        flatFee: bigint;
      }
    ],
    "view"
  >;

  setFlatRoyalty: TypedContractMethod<
    [contentId: BigNumberish, recipient: AddressLike, flatFee: BigNumberish],
    [void],
    "nonpayable"
  >;

  setRoyaltyPercentage: TypedContractMethod<
    [
      contentId: BigNumberish,
      recipient: AddressLike,
      percentage: BigNumberish,
      minAmount: BigNumberish,
      maxAmount: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "calculateRoyalty"
  ): TypedContractMethod<
    [contentId: BigNumberish, amount: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "contentRegistry"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getRoyaltyInfo"
  ): TypedContractMethod<
    [contentId: BigNumberish],
    [
      [string, bigint, bigint, bigint, boolean, bigint] & {
        recipient: string;
        percentage: bigint;
        minAmount: bigint;
        maxAmount: bigint;
        isFlat: boolean;
        flatFee: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "payRoyalty"
  ): TypedContractMethod<[contentId: BigNumberish], [void], "payable">;
  getFunction(
    nameOrSignature: "royaltySettings"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, bigint, bigint, bigint, boolean, bigint] & {
        recipient: string;
        percentage: bigint;
        minAmount: bigint;
        maxAmount: bigint;
        isFlat: boolean;
        flatFee: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "setFlatRoyalty"
  ): TypedContractMethod<
    [contentId: BigNumberish, recipient: AddressLike, flatFee: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setRoyaltyPercentage"
  ): TypedContractMethod<
    [
      contentId: BigNumberish,
      recipient: AddressLike,
      percentage: BigNumberish,
      minAmount: BigNumberish,
      maxAmount: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "FlatRoyaltySet"
  ): TypedContractEvent<
    FlatRoyaltySetEvent.InputTuple,
    FlatRoyaltySetEvent.OutputTuple,
    FlatRoyaltySetEvent.OutputObject
  >;
  getEvent(
    key: "RoyaltyPaid"
  ): TypedContractEvent<
    RoyaltyPaidEvent.InputTuple,
    RoyaltyPaidEvent.OutputTuple,
    RoyaltyPaidEvent.OutputObject
  >;
  getEvent(
    key: "RoyaltySettingsUpdated"
  ): TypedContractEvent<
    RoyaltySettingsUpdatedEvent.InputTuple,
    RoyaltySettingsUpdatedEvent.OutputTuple,
    RoyaltySettingsUpdatedEvent.OutputObject
  >;

  filters: {
    "FlatRoyaltySet(uint256,address,uint256)": TypedContractEvent<
      FlatRoyaltySetEvent.InputTuple,
      FlatRoyaltySetEvent.OutputTuple,
      FlatRoyaltySetEvent.OutputObject
    >;
    FlatRoyaltySet: TypedContractEvent<
      FlatRoyaltySetEvent.InputTuple,
      FlatRoyaltySetEvent.OutputTuple,
      FlatRoyaltySetEvent.OutputObject
    >;

    "RoyaltyPaid(uint256,address,address,uint256)": TypedContractEvent<
      RoyaltyPaidEvent.InputTuple,
      RoyaltyPaidEvent.OutputTuple,
      RoyaltyPaidEvent.OutputObject
    >;
    RoyaltyPaid: TypedContractEvent<
      RoyaltyPaidEvent.InputTuple,
      RoyaltyPaidEvent.OutputTuple,
      RoyaltyPaidEvent.OutputObject
    >;

    "RoyaltySettingsUpdated(uint256,address,uint256)": TypedContractEvent<
      RoyaltySettingsUpdatedEvent.InputTuple,
      RoyaltySettingsUpdatedEvent.OutputTuple,
      RoyaltySettingsUpdatedEvent.OutputObject
    >;
    RoyaltySettingsUpdated: TypedContractEvent<
      RoyaltySettingsUpdatedEvent.InputTuple,
      RoyaltySettingsUpdatedEvent.OutputTuple,
      RoyaltySettingsUpdatedEvent.OutputObject
    >;
  };
}
