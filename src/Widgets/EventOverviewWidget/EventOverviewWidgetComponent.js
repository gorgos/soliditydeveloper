import * as React from "react";
import * as Scrivito from "scrivito";
import { formatDate } from "../../utils/formatDate";
// import { InPlaceEditingPlaceholder } from "../../Components/InPlaceEditingPlaceholder";
import { TagList } from "../../Components/TagList";
import { ClientRender } from "../../Components/ClientRender";

class EventOverviewWidgetComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentTag: "", showPastEvents: false };
    this.setTag = this.setTag.bind(this);
    this.togglePastEvents = this.togglePastEvents.bind(this);
  }

  render() {
    let eventsSearch = Scrivito.Obj.where("_objClass", "equals", "Event").order(
      "date",
      "asc"
    );
    let noDateEvents = Scrivito.Obj.where("_objClass", "equals", "Event").and(
      "endDate",
      "equals",
      null
    );

    let tagsNoDateEvents = [];

    if (this.state.showPastEvents) {
      eventsSearch = eventsSearch.and("endDate", "isLessThan", new Date());
      noDateEvents = noDateEvents.and("endDate", "isLessThan", new Date());
    } else {
      eventsSearch = eventsSearch.and("endDate", "isGreaterThan", new Date());

      tagsNoDateEvents = [...noDateEvents.facet("tags")].map((facet) =>
        facet.name()
      );
    }

    const tagsEvents = [...eventsSearch.facet("tags")].map((facet) =>
      facet.name()
    );
    const tags = [...new Set([...tagsEvents, ...tagsNoDateEvents])];

    const filterTags = this.props.widget.get("tags");
    if (filterTags.length) {
      eventsSearch = eventsSearch.and("tags", "equals", filterTags);
      noDateEvents = noDateEvents.and("tags", "equals", filterTags);
    } else if (this.state.currentTag) {
      eventsSearch = eventsSearch.and("tags", "equals", this.state.currentTag);
      noDateEvents = noDateEvents.and("tags", "equals", this.state.currentTag);
    }

    const maxItems = this.props.widget.get("maxItems");
    let events;
    if (maxItems) {
      events = eventsSearch.take(maxItems);
    } else {
      events = [...eventsSearch];
    }

    events = [...events, ...noDateEvents];

    /* if (!events.length) {
      return (
        <InPlaceEditingPlaceholder center>
          There are no event pages. Create one using the page menu.
        </InPlaceEditingPlaceholder>
      );
    } */

    return (
      <div>
        <ClientRender>
          <TagList
            showTags={!filterTags.length && this.props.widget.get("showTags")}
            currentTag={this.state.currentTag}
            setTag={this.setTag}
            tags={tags}
          />
        </ClientRender>
        <section className="bg-white">
          <input
            checked={this.state.showPastEvents}
            onChange={this.togglePastEvents}
            type="checkbox"
            id="showPastEvents"
            name="showPastEvents"
          />
          <label className="past-event-label" htmlFor="showPastEvents">
            Show Past Events
          </label>
          <ClientRender>
            <div className="row">
              {events.map((event) => (
                <EventItem key={event.id()} event={event} />
              ))}
            </div>

            <b>
              <label className="past-event-label" htmlFor="showPastEvents">
                Dates are shown in local time {formatDate(new Date(), "Z")}.
              </label>
            </b>
          </ClientRender>
        </section>
      </div>
    );
  }

  togglePastEvents() {
    this.setState((prevState) => ({
      showPastEvents: !prevState.showPastEvents,
    }));
  }

  setTag(tag) {
    this.setState({
      currentTag: tag,
    });
  }
}

Scrivito.provideComponent("EventOverviewWidget", EventOverviewWidgetComponent);

const EventItem = Scrivito.connect(({ event }) => (
  <div className="col-sm-6">
    <Scrivito.LinkTag to={event}>
      <Scrivito.BackgroundImageTag
        className="box-card"
        style={{
          background: [
            {
              image:
                "linear-gradient(rgba(46, 53, 60, 0.7), rgba(46, 53, 60, 0.7))",
            },
            { image: event.get("image") },
          ],
        }}
      >
        <span className="box-date">
          {event.get("date") ? formatDate(event.get("date"), "mm/dd") : "TBA"}
        </span>
        {formatDate(event.get("endDate"), "mm/dd") !==
          formatDate(event.get("date"), "mm/dd") && (
          <>
            <span className="box-date-hyphen">-</span>
            <span className="box-date-end">
              {formatDate(event.get("endDate"), "mm/dd")}
            </span>
          </>
        )}
        <span className="box-topic dark-background">
          <h3 className="h3">{event.get("title")}</h3>
          <EventShortLocation event={event} />
        </span>
      </Scrivito.BackgroundImageTag>
    </Scrivito.LinkTag>
  </div>
));

const EventShortLocation = Scrivito.connect(({ event }) => {
  const location = [event.get("locationName"), event.get("locationLocality")]
    .filter((n) => n)
    .join(", ");

  return (
    <span>
      <i
        className={`fa ${location ? "fa-map-marker" : ""} fa-2x`}
        aria-hidden="true"
        title="location"
      />
      <span>{location}</span>
    </span>
  );
});
