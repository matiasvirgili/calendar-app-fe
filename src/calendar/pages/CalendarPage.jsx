import React, { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { NavBar } from "../components/NavBar";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import esES from "date-fns/locale/es";
import { addHours } from "date-fns";
import { getMessagesES } from "../../helpers/getMessages";
import { CalendarEvent } from "../components/CalendarEvent";
import { CalendarModal } from "../components/CalendarModal";

import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { FabAddNew } from "../components/FabAddNew";
import { FabDelete } from "../components/FabDelete";

// ...

const locales = {
  es: esES,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const CalendarPage = () => {
  const { OpenDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgraundColor: "red",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return { style };
  };
  const onDoubleClick = () => {
    OpenDateModal();
  };
  const onSelect = (event) => {
    setActiveEvent(event);
  };

  const onViewChanged = (event) => {
    // Esto hace que cada vez que recargue la app se quede en la vista que estaba antes
    localStorage.setItem("lasView", event);
    setLastView(event);
  };

  return (
    <>
      <NavBar></NavBar>

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal></CalendarModal>
      <FabAddNew></FabAddNew>
      <FabDelete></FabDelete>
    </>
  );
};
