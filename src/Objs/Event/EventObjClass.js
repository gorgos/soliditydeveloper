import * as Scrivito from "scrivito";
import { metadataAttributes } from "../_metadataAttributes";

export const Event = Scrivito.provideObjClass("Event", {
  attributes: {
    body: ["widgetlist", { only: "SectionWidget" }],
    date: "date",
    endDate: "date",
    image: ["reference", { only: ["Image"] }],
    link: "link",
    locationName: "string",
    locationStreetAddress: "string",
    locationLocality: "string",
    locationPostalCode: "string",
    locationRegion: "string",
    locationCountry: "string",
    title: "string",
    tags: "stringlist",
    eventAttendanceMode: [
      "enum",
      {
        values: [
          "OnlineEventAttendanceMode",
          "OfflineEventAttendanceMode",
          "MixedEventAttendanceMode",
        ],
      },
    ],
    eventStatus: [
      "enum",
      {
        values: [
          "EventCancelled",
          "EventMovedOnline",
          "EventPostponed",
          "EventRescheduled",
          "EventScheduled",
        ],
      },
    ],
    ...metadataAttributes,
  },
  extractTextAttributes: [
    "locationName",
    "locationLocality",
    "locationCountry",
    "body",
  ],
});
