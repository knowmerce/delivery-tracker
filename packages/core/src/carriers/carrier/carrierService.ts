import { type TrackInfo } from "../../core";

import { UPS } from "../us.ups";
import { CJLogistics } from "../kr.cjlogistics";

class CarrierService {
  constructor(
    private readonly upsService: UPS,
    private readonly cjService: CJLogistics
  ) {}

  // async track({
  //   carrierId,
  //   trackingNumber,
  // }: {
  //   carrierId: string;
  //   trackingNumber: string;
  // }): Promise<TrackInfo> {
  //   let service: UPS | CJLogistics;

  //   console.log(carrierId, trackingNumber);
  //   if (carrierId === UPS.carrierId) {
  //     service = this.upsService;
  //     console.log(1, service);
  //   } else if (carrierId === CJLogistics.carrierId) {
  //     service = this.cjService;
  //     console.log(2, service);
  //   } else throw new Error("Unsupported carrier");

  //   console.log(service.track);

  //   const info = await service.track({ trackingNumber });

  //   console.log(info);

  //   return info;

  //   // let service: UPS | CJLogistics;
  //   // if (carrierId === UPS.carrierId) {
  //   //   console.log(1234, UPS.carrierId);
  //   //   service = this.upsService;
  //   // } else if (carrierId === CJLogistics.carrierId) {
  //   //   service = this.cjService;
  //   // } else {
  //   //   throw new Error("Unsupported carrier");
  //   // }
  //   // console.log(333, carrierId, trackingNumber);
  //   // console.log(444, service);
  //   // console.log(555, service.track);
  //   // const info = await service.track({ trackingNumber });
  //   // console.log(info);
  //   // return info;
  // }
}

export { CarrierService };
