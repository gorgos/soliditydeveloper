import * as Scrivito from "scrivito";
import eventObjIcon from "../../assets/images/event_obj.svg";
import SectionWidget from "../../Widgets/SectionWidget/SectionWidgetClass";
import {
  metadataEditingConfigAttributes,
  metadataInitialContent,
  metadataPropertiesGroups,
  metadataValidations,
} from "../_metadataEditingConfig";

Scrivito.provideEditingConfig("Event", {
  title: "Event",
  thumbnail: eventObjIcon,
  thumbnailForContent: (obj) => obj.get("image"),
  attributes: {
    ...metadataEditingConfigAttributes,
    date: {
      title: "Date",
      description: "When is this event happening?",
    },
    endDate: {
      title: "End Data",
      description: "When is this event ending?",
    },
    image: {
      title: "Image",
    },
    link: {
      title: "Link",
    },
    locationName: {
      title: "Location name",
      description: "E.g. New York Convention Center",
    },
    locationStreetAddress: {
      title: "Street address",
      description: "E.g. 655 W. 34th Street",
    },
    locationLocality: {
      title: "Locality",
      description: "E.g. New York",
    },
    locationRegion: {
      title: "Region",
      description: "E.g. NY or CA",
    },
    locationPostalCode: {
      title: "Postal code",
      description: "E.g. 10001",
    },
    locationCountry: {
      title: "Country",
      description: "E.g. USA",
    },
    title: {
      title: "Title",
      description: "Limit to 55 characters.",
    },
    tags: {
      title: "Tags",
      description: "Which tags can be associated with this event?",
    },
    eventAttendanceMode: {
      title: "Type of Event",
      description: "Default: Offline",
      values: [
        { value: "OnlineEventAttendanceMode", title: "online" },
        { value: "OfflineEventAttendanceMode", title: "offline" },
        { value: "MixedEventAttendanceMode", title: "mixed" },
      ],
    },
    eventStatus: {
      title: "Status of Event",
      description: "Default: Scheduled",
      values: [
        { value: "EventCancelled", title: "cancelled" },
        { value: "EventMovedOnline", title: "moved online" },
        { value: "EventPostponed", title: "postponed" },
        { value: "EventRescheduled", title: "rescheduled" },
        { value: "EventScheduled", title: "scheduled" },
      ],
    },
  },
  properties: [
    "title",
    "date",
    "endDate",
    "link",
    "locationName",
    "locationStreetAddress",
    "locationLocality",
    "locationRegion",
    "locationPostalCode",
    "locationCountry",
    "image",
    "tags",
    "eventAttendanceMode",
    "eventStatus",
  ],
  propertiesGroups: [...metadataPropertiesGroups],
  initialContent: {
    ...metadataInitialContent,
    title: "Lorem Ipsum",
    body: [new SectionWidget({})],
    eventAttendanceMode: "OfflineEventAttendanceMode",
    eventStatus: "EventScheduled",
  },
  validations: [
    ...metadataValidations,
    [
      "title",

      (title) => {
        if (!title) {
          return {
            message: "The event title must be set.",
            severity: "error",
          };
        }
      },
    ],
    [
      "date",

      (date) => {
        if (!date) {
          return {
            message: "Providing the event date is recommended.",
            severity: "info",
          };
        }
      },
    ],
    [
      "endDate",

      (endDate) => {
        if (!endDate) {
          return {
            message: "Providing the event end date is recommended.",
            severity: "info",
          };
        }
      },
    ],
  ],
});
