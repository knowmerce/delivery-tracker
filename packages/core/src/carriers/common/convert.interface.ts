import { TrackEventStatusCode, type TrackInfo } from "../../core";

// progresses.status
export interface ConvertTrackInfoResponseStatus {
  id: TrackEventStatusCode;
  text: string | null;
}

export interface ConvertTrackInfoResponseFrom {
  name?: string | null;
  time?: string | null;
}

export interface ConvertTrackInfoResponseTo {
  name?: string | null;
  time?: string | null;
}

export interface ConvertTrackInfoResponseProgress {
  time: string | null;
  location?: string | null;
  status: ConvertTrackInfoResponseStatus;
  description: string | null;
}

export interface ConvertTrackInfoResponse {
  state: ConvertTrackInfoResponseStatus;
  from?: ConvertTrackInfoResponseFrom;
  to?: ConvertTrackInfoResponseTo;
  progresses: ConvertTrackInfoResponseProgress[];
}

export const convertTrackInfo = (
  trackInfo: TrackInfo
): ConvertTrackInfoResponse => {
  const shippingInformation: ConvertTrackInfoResponse = {
    state: {
      id: TrackEventStatusCode.InformationReceived,
      text: trackInfo.events[0].status.name,
    },
    progresses: trackInfo.events.map((each) => ({
      time:
        each.time !== null
          ? `${each.time.toFormat("yyyy-MM-dd HH:mm:ss")}+09:00`
          : null,
      location: each.location?.name,
      status: { id: each.status.code, text: each.status.name },
      description: each.description,
    })),
  };

  const lastProgress =
    shippingInformation.progresses[shippingInformation.progresses.length - 1];

  if (lastProgress) {
    shippingInformation.from = {
      name: trackInfo.sender?.name,
      time: shippingInformation.progresses[0].time,
    };
    shippingInformation.to = {
      name: trackInfo.recipient?.name,
    };
    shippingInformation.state = lastProgress.status;
    if (shippingInformation.state.id === TrackEventStatusCode.Delivered) {
      shippingInformation.to = { time: lastProgress.time };
    }
  }

  return shippingInformation;
};
