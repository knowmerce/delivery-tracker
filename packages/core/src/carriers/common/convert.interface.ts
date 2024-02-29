import { TrackEventStatusCode, type TrackInfo } from "../../core";

interface ConvertTrackInfoResponseProgressLocation {
  name?: string | null;
}

interface ConvertTrackInfoResponseStatus {
  id: TrackEventStatusCode; // 이 프로젝트에 정의된 상태값 사용
  text: string | null;
}

interface ConvertTrackInfoResponseFrom {
  name?: string | null;
  time?: string | null;
}

interface ConvertTrackInfoResponseTo {
  name?: string | null;
  time?: string | null;
}

interface ConvertTrackInfoResponseProgress {
  time: string | null;
  location?: ConvertTrackInfoResponseProgressLocation;
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
      location: { name: each.location?.name },
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
