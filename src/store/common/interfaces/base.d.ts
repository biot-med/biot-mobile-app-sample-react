import { BiotError } from "../../../@biotmed/common/api-common";

export type RequestStateType = 'prepare' | 'start' | 'processing' | 'finish' | 'error' | 'canceled';
export type OperationType = 'create' | 'read' | 'delete' | 'update';

export interface BaseState {
  loading: boolean;
  error: BiotError | null;
  requestState: RequestStateType,
  operation: OperationType | null
}
