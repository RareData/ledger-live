// @flow

import type { TFunction } from "react-i18next";
import { BigNumber } from "bignumber.js";
import type {
  Account,
  AccountLike,
  Transaction,
  TransactionStatus,
  Operation,
  SignedOperation,
} from "@ledgerhq/live-common/types/index";
import type { Device } from "@ledgerhq/live-common/hw/actions/types";
import type { Step } from "~/renderer/components/Stepper";
export type StepId = "amount" | "device";

export type StepProps = {
  t: TFunction,
  transitionTo: string => void,
  openedFromAccount: boolean,
  device: ?Device,
  account: ?AccountLike,
  parentAccount: ?Account,
  transaction: ?Transaction,
  status: TransactionStatus,
  bridgePending: boolean,
  error: ?Error,
  optimisticOperation: ?Operation,
  closeModal: void => void,
  openModal: (string, any) => void,
  onChangeAccount: (?AccountLike, ?Account) => void,
  onChangeTransaction: Transaction => void,
  onTransactionError: Error => void,
  onTransactionSigned: SignedOperation => void,
  onRetry: void => void,
  maybeRecipient?: string,
  onResetMaybeRecipient: () => void,
  maybeAmount?: BigNumber,
  onResetMaybeAmount: () => void,
  updateTransaction: (updater: any) => void,
};

export type St = Step<StepId, StepProps>;
