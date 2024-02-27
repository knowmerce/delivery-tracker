import { type TrackInfo } from "../../core";
import {
  type ConvertTrackInfoResponse,
  ShippingProgressStatus,
} from "./convert.interface";

// convert ups
export const convertUpsTrackInfo: any = (trackInfo: TrackInfo) => {
  const getStatus = (s: string): { id: ShippingProgressStatus } => {
    if (s.includes("INFORMATION_RECEIVED")) {
      return { id: ShippingProgressStatus.Delayed };
    }
    if (s.includes("DELIVERED")) {
      return { id: ShippingProgressStatus.Delivered };
    }
    if (s.includes("OUT_FOR_DELIVERY")) {
      return { id: ShippingProgressStatus.OutForDelivery };
    }

    return { id: ShippingProgressStatus.Transit };
  };

  const shippingInformation: ConvertTrackInfoResponse = {
    state: {
      id: ShippingProgressStatus.Received,
      text: "information received",
    },
    progresses: trackInfo.events.map((each) => ({
      time:
        each.time !== null
          ? `${each.time.toFormat("yyyy-MM-dd HH:mm:ss")}+09:00`
          : "",
      location: undefined,
      status: { ...getStatus(each.status.code), text: each.status.code },
      description: each.description,
    })),
  };

  const lastProgress =
    shippingInformation.progresses[shippingInformation.progresses.length - 1];

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (lastProgress) {
    shippingInformation.from = {
      time: shippingInformation.progresses[0].time,
    };
    shippingInformation.state = lastProgress.status;
    if (shippingInformation.state.id === ShippingProgressStatus.Delivered) {
      shippingInformation.to = { time: lastProgress.time };
    }
  }

  return shippingInformation;
};

// convert hanjin
export const convertHanjinTrackInfo: any = (trackInfo: TrackInfo) => {
  return { a: 2 };
};
