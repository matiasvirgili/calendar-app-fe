import "react-datepicker/dist/react-datepicker.css";
import { addHours, differenceInSeconds } from "date-fns";
import React, { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";

registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();
  const [formSubmited, setFormSubmited] = useState(false);

  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  // Lo que hago con este useMemo es asignarle la clase is-invalid a los inputs
  // Dependiendo de si cambia el formTitle o cuando hacemos click en guardar se la vamos a asignar o no
  // Si el formulario no fue enviado, no le asignamos nada, si contiene mas de 0 tampoco y si no contiene nada se la asignamos
  const titleClass = useMemo(() => {
    if (!formSubmited) return "";
    return formValues.title.length > 0 ? "" : "is-invalid";
  }, [formValues.title, formSubmited]);

  // Aca estoy mandando el evento que estoy seleccionando al modal
  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };
  const onDateChanged = (event, changing) => {
    setFormValues({ ...formValues, [changing]: event });
  };

  const onCloseModal = () => {
    closeDateModal();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormSubmited(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      Swal.fire("Fechas incorrectas", "Revisar las fechas ingresadas", "error");
      return;
    }

    if (formValues.title.length <= 0) {
      return;
    }

    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmited(false);
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>

          <DatePicker
            className="form-control"
            selected={formValues.start}
            onChange={(e) => onDateChanged(e, "start")}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          ></DatePicker>
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            className="form-control"
            onChange={(e) => onDateChanged(e, "end")}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          ></DatePicker>
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
