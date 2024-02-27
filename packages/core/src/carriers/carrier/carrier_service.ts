import { CarrierUpstreamFetcher } from "../../carrier-upstream-fetcher";
import { type TrackInfo } from "../../core";

import { CarrierFactory } from "./carrier_interface";

//  각 서비스(fromm-store, wonderwall)에서 호출하는 CarrierService
export class CarrierService {
  async track({
    carrierId,
    trackingNumber,
  }: {
    carrierId: string;
    trackingNumber: string;
  }): Promise<TrackInfo> {
    // carrierId에 따라 instance를 동적으로 가져온다.
    const instance = new CarrierFactory().createInstance(carrierId);
    // await instance.init(instance); // CarrierUpstreamFetcher의 생성자 초기화
    // 각 택배사 코드를 최대한 수정하지 않으려고 여기서 초기화함
    await instance.init({
      upstreamFetcher: new CarrierUpstreamFetcher({ carrier: instance }),
    });

    return await instance.track({ trackingNumber });
  }
}
