import { type TrackInfo } from "../../core";
import { Carriers } from "./carrier_interface";
import {
  convertHanjinTrackInfo,
  convertUpsTrackInfo,
} from "./convert_function";

interface ConvertTrackInfoFactoryInterface {
  createConvertTrackInfoFunction: (
    carrierId: Carriers,
    trackInfo: TrackInfo
  ) => ConvertTrackInfoResponse; // ConvertTrackInfoResponse
}

export class ConvertTrackInfoFactory
  implements ConvertTrackInfoFactoryInterface
{
  createConvertTrackInfoFunction(
    carrierId: string,
    trackInfo: TrackInfo
  ): ConvertTrackInfoResponse {
    switch (carrierId) {
      case Carriers.UPS:
        return convertUpsTrackInfo(trackInfo);
      case Carriers.HANJIN:
        return convertHanjinTrackInfo(trackInfo);
      default:
        throw new Error(`Unsupported carrier: ${carrierId}`);
    }
  }
}

export enum ShippingProgressStatus {
  Received = "information_received",
  Pickup = "at_pickup",
  Transit = "in_transit",
  OutForDelivery = "out_for_delivery",
  Delivered = "delivered",
  Attempted = "delivery_attempted",
  Delayed = "delayed",
  Denied = "denied",
  ExportWarehouseIn = "export_warehouse_in", // 수출창고 입고완료 (해외에서 출고된 상태)
  ExportWarehouseOut = "export_warehouse_out", // 수출창고 출고완료 (해외에서 출고된 상태)
  ImportWarehouseIn = "import_warehouse_in", // 도착지창고 입고완료 (해외에서 출발한 택배가 한국 택배사에 들어온 상태)
  ImportWarehouseOut = "import_warehouse_out", // 도착지창고 출고완료 (한국으로 들어온 택배가 출고된 상태)
}

// progresses.location
export interface ConvertTrackInfoResponseProgressLocation {
  name?: string;
}

// progresses.status
export interface ConvertTrackInfoResponseStatus {
  id: ShippingProgressStatus;
  text?: string | null;
}

export interface ConvertTrackInfoResponseFrom {
  name?: string;
  time?: string | null;
}

export interface ConvertTrackInfoResponseTo {
  name?: string | null;
  time?: string | null;
}

export interface ConvertTrackInfoResponseProgress {
  time: string | null;
  location?: ConvertTrackInfoResponseProgressLocation;
  status: ConvertTrackInfoResponseStatus;
  description?: string | null;
}

export interface ConvertTrackInfoResponse {
  state: ConvertTrackInfoResponseStatus;
  from?: ConvertTrackInfoResponseFrom;
  to?: ConvertTrackInfoResponseTo;
  progresses: ConvertTrackInfoResponseProgress[];
}
