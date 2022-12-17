import * as React from "react";
import momentt from "moment-timezone";
import moment from "moment";
import DatePicker from "react-datepicker";
import TimezoneSelect from "react-timezone-select";

import "react-datepicker/dist/react-datepicker.css";

Date.prototype.stdTimezoneOffset = function () {
  var jan = new Date(this.getFullYear(), 0, 1);
  var jul = new Date(this.getFullYear(), 6, 1);
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
};

Date.prototype.isDstObserved = function () {
  return this.getTimezoneOffset() < this.stdTimezoneOffset();
};

const getZoneFromOffset = (timeZones, offsetString) =>
  timeZones.filter((tz) => moment.tz(tz).format("Z") === offsetString)[0];

export function DateRangePicker({ page }) {
  const currentStartDate = page.get("date");
  const currentEndDate = page.get("endDate");
  const city = page.get("locationLocality");

  const [startDate, setStartDate] = React.useState(currentStartDate);
  const [endDate, setEndDate] = React.useState(currentEndDate);
  const [selectedTimezone, setSelectedTimezone] = React.useState("");

  const timeZones = moment.tz.names();

  let selectedUTCTimeOffset = null;
  if (selectedTimezone != "") {
    const utcTimeOffset = selectedTimezone.offset;
    const sign = utcTimeOffset < 0 ? "-" : "+";
    const addedZero = Math.abs(utcTimeOffset) < 10 ? "0" : "";
    selectedUTCTimeOffset = `${sign}${addedZero}${Math.abs(
      Math.round(utcTimeOffset)
    )}:00`;
  }

  return (
    <div
      style={{
        height: "500px",
        width: "500px",
        marginLeft: "20px",
        marginTop: "20px",
      }}
    >
      <blockquote>Please make a selection</blockquote>
      <div className="select-wrapper">
        <TimezoneSelect
          value={selectedTimezone}
          onChange={setSelectedTimezone}
        />
      </div>
      <br />
      <DatePicker
        style={{ width: "200px" }}
        onChange={(dates, e) => {
          const [start, end] = dates;
          setPageStartAndEndDate(
            start,
            end,
            timeZones,
            city,
            getZoneFromOffset(timeZones, selectedUTCTimeOffset)
          );
          e.preventDefault();
          e.stopPropagation();
        }}
        selected={startDate}
        startDate={startDate}
        endDate={endDate}
        dateFormat="dd-MM-yyyy"
        calendarStartDay={1}
        selectsRange
        isClearable
        // inline
      />
    </div>
  );

  function setPageStartAndEndDate(
    date,
    endDate,
    timeZones,
    city,
    overwriteTimezone
  ) {
    setStartDate(date);

    if (!date && !endDate) {
      page.update({
        date: null,
        endDate: null,
      });
    }

    if (!date || !endDate) {
      setEndDate(null);
      return;
    }

    date.setHours(8);
    endDate.setHours(8);

    const updatedStartDate = getUpdatedUTCDate(
      date,
      timeZones,
      city,
      overwriteTimezone
    );
    const updatedEndDate = getUpdatedUTCDate(
      endDate,
      timeZones,
      city,
      overwriteTimezone
    );

    page.update({
      date: updatedStartDate,
      endDate: updatedEndDate,
    });
    setStartDate(updatedStartDate);
    setEndDate(updatedEndDate);
  }
}

function getUpdatedUTCDate(date, timeZones, city, overwriteTimezone) {
  let timezone = overwriteTimezone;
  if (!timezone) {
    timezone = timeZones.filter((tz) => {
      const tzCity = moment.tz(tz).zoneAbbr();
      return tz.includes(city) || tzCity.includes(city);
    })[0];
  }

  if (!timezone) {
    alert("No timezone found for this city. Please choose timezone");
    return;
  }

  const timeZoneOffset = moment.tz(timezone).utcOffset();
  let dateOffset = date.getTimezoneOffset();

  // JS V8 getTimezoneOffset bug for New Zealand ?
  // using +-60 as well for potential winter time bug
  if (dateOffset == -720 || dateOffset == -780 || dateOffset == -840) {
    dateOffset = dateOffset * -1;
  }

  const clonedDate = new Date(date.getTime());

  const offsetDiff = timeZoneOffset - dateOffset;
  const applyOffset = clonedDate.setTime(date.getTime() - offsetDiff * 60_000);
  const actualTime = new Date(applyOffset);

  return actualTime;
}
