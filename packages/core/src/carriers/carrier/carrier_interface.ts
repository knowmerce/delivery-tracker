import { type Carrier } from "../../core/interfaces";
import { Hanjin } from "../kr.hanjin";
import { UPS } from "../us.ups";

// 인스턴스 생성을 위한 함수 제공
interface CarrierFactoryInterface {
  createInstance: (carrierId: string) => Carrier;
}

// CarrierFactory의 createInstance를 구현한다.
// 서브클래스에서 인스턴스의 타입이 결정된다.
export class CarrierFactory implements CarrierFactoryInterface {
  createInstance(carrierId: string): Carrier {
    switch (carrierId) {
      case "us.ups":
        return new UPS();
      case "kr.hanjin":
        return new Hanjin();
      default:
        throw new Error(`Unsupported carrier: ${carrierId}`);
    }
  }
}

export enum Carriers {
  UPS = "us.ups",
  HANJIN = "kr.hanjin",
}
