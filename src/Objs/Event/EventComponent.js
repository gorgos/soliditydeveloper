import * as React from "react";
import * as Scrivito from "scrivito";
import { formatDate } from "../../utils/formatDate";
import { InPlaceEditingPlaceholder } from "../../Components/InPlaceEditingPlaceholder";
import { SchemaDotOrg } from "../../Components/SchemaDotOrg";
import { ClientRender } from "../../Components/ClientRender";

Scrivito.provideComponent("Event", ({ page }) => (
  <div>
    <section className="title-bgc">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-9">
            <Scrivito.ContentTag
              tag="h1"
              className="h2"
              content={page}
              attribute="title"
            />
          </div>
          <div className="col-lg-3 details-title-box">
            <h2 className="h5">
              <i
                className="fa fa-calendar fa-lg"
                aria-hidden="true"
                title="date"
              />{" "}
              <ClientRender>
                <Scrivito.ContentTag
                  content={page}
                  attribute="date"
                  tag="span"
                  className="event-info"
                >
                  {formatDate(page.get("endDate"), "mm/dd/yyyy(Z)") !==
                  formatDate(page.get("date"), "mm/dd/yyyy(Z)") ? (
                    <>
                      <EventDate date={page.get("date")} />

                      <span className="box-date-hyphen">-</span>
                      <span className="box-date-end">
                        {formatDate(page.get("endDate"), "mm/dd/yyyy (Z)")}
                      </span>
                    </>
                  ) : (
                    <EventDate date={page.get("date")} isSingleDay />
                  )}
                </Scrivito.ContentTag>
              </ClientRender>
              {page.get("link") && (
                <div className="h5 font-weight-bold">
                  <Scrivito.LinkTag
                    to={page.get("link")}
                    style={{ color: "white" }}
                  >
                    <i className="fa fa-angle-right fa-4" aria-hidden="true" />
                    {page.get("link").title()}
                  </Scrivito.LinkTag>
                </div>
              )}
              <EventLocation event={page} />
            </h2>
          </div>
        </div>
      </div>
    </section>
    <Scrivito.ContentTag tag="div" content={page} attribute="body" />
    <SchemaDotOrg content={page} />
  </div>
));

function EventDate({ date, isSingleDay }) {
  if (!date) {
    return "TBA";
  }

  if (isSingleDay) {
    return formatDate(date, "mm/dd/yyyy (Z)");
  }

  return formatDate(date, "mm/dd/yyyy");
}

const EventLocation = Scrivito.connect(({ event }) => {
  const locality = event.get("locationLocality");
  const region = event.get("locationRegion");
  const postalCode = event.get("locationPostalCode");
  const localityRegionPostalCode = [locality, region, postalCode]
    .filter((n) => n)
    .join(" ");

  const address = [
    event.get("locationName"),
    event.get("locationStreetAddress"),
    localityRegionPostalCode,
    event.get("locationCountry"),
  ].filter((n) => n);

  if (!address.length) {
    return (
      <InPlaceEditingPlaceholder>
        <h2 className="h5 font-weight-bold">
          <i
            className="fa fa-map-marker fa-lg"
            aria-hidden="true"
            title="location"
          />{" "}
          Location
        </h2>
        <div className="event-info">
          Provide the location in the event page properties.
        </div>
      </InPlaceEditingPlaceholder>
    );
  }

  return (
    <React.Fragment>
      <div className="location-title">
        <h2 className="h5 font-weight-bold">
          <i
            className="fa fa-map-marker fa-lg"
            aria-hidden="true"
            title="location"
          />{" "}
          Location
        </h2>
        <div className="event-info">
          {address.map((line, index) => (
            <span key={index}>
              {line} <br />
            </span>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
});
