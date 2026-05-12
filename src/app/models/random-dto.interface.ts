export interface IRandomRequestDto {
  jsonrpc: string;
  method: string;
  id: number;
  params: IRandomRequestParamsDto;
}

export interface IRandomRequestParamsDto {
  apiKey: string;
  n: number;
  min: number;
  max: number;
  replacement?: boolean;
}

export interface IRandomResponseDto {
  jsonrpc: string;
  id: number;
  result: IRandomResultDto;
}

export interface IRandomResultDto {
  bitsUsed: number;
  bitsLeft: number;
  requestLeft: number;
  advisoryDelay: number;
  random: IRandomResultArrayDto;
}

export interface IRandomResultArrayDto {
  data: number[];
  completionTime: string;
}
