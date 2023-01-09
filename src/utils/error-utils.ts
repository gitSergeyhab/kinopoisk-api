import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { toast } from 'react-toastify';
import { ErrorMessage, ErrorStatus } from '../const';

type ErrorType = FetchBaseQueryError | SerializedError  | undefined;

type ErrorTypeModify = FetchBaseQueryError & {status: number} | SerializedError & {status: number} | undefined;


export const toastError = (error: ErrorType) => {

  const status = (error as ErrorTypeModify)?.status;

  switch (status) {
    case ErrorStatus.BadRequest: toast.error(ErrorMessage.BadRequest); break;
    case ErrorStatus.Forbidden: toast.error(ErrorMessage.Forbidden); break;
    case ErrorStatus.NotFound: toast.error(ErrorMessage.NotFound); break;
    case ErrorStatus.Server: toast.error(ErrorMessage.Server); break;
    case ErrorStatus.Unauthorized: toast.error(ErrorMessage.Unauthorized); break;
    default: toast.error(ErrorMessage.Unknown);
  }
};
