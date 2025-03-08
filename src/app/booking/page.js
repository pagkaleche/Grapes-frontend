"use client";

import { useRouter } from "next/navigation";
import Calendar from "react-calendar";
import "./index.scss";
import { APIService } from "@/lib/APIService";
import { useState } from "react";
import { useAppSelector } from "@/store/store";
import { Provider } from "react-redux";
import { store } from "@/store/store";

function Booking() {
  const token = useAppSelector((state) => state.auth.token);
  console.log(token);

  const apiService = new APIService();
  const router = useRouter();
  const [selectedArtist, setSelectedArtist] = useState({ id: 1 });
  const [selectedService, setSelectedService] = useState({ id: 1 });
  const [selectedDate, setSelectedDate] = useState("2023-01-01T00:00Z");

  const handleSubmit = async (event) => {
    let createdAppointment = await apiService.Appointments.create(
      {
        provided_at: selectedDate,
        artist: selectedArtist.id,
        provided_service: selectedService.id,
      },
      token,
    );
    console.log(createdAppointment);
    router.push("/");
  };

  return (
    <div className="container">
      <div className="selectArtist">
        <h1>Choose an Artist and a Service</h1>
        <label>Choose an Artist</label>
        <select id="selectArtist"></select>
        <label>Choose a Service</label>
        <select id="selectService"></select>
      </div>
      <div className="borderBottom"></div>
      <div className="clientDetails">
        <h1>Tell us a little bit about yourself</h1>
        <h2>Client Details</h2>
        <div className="form-container">
          <span className="borderBottom2"></span>
          <div className="nameEmailFields">
            <div className="nameField">
              <label>Name *</label>
              <input id="nameInput" />
            </div>
            <div className="emailField">
              <label>Email *</label>
              <input id="emailInput" />
            </div>
          </div>
          <div className="otherFields">
            <div>
              <label>Phone Number *</label>
              <input id="phoneInput" />
            </div>

            <div>
              <label>Add Your Message *</label>
              <input id="messagelInput" />
            </div>

            <div>
              <label>Add images of Desired Work *</label>
              <input id="imageUpload" name="image" type="file" />
            </div>
          </div>
        </div>
        <div className="borderBottom"></div>
        <div className="scheduleAppointment">
          <h1>Schedule your appointment</h1>
          <h2>
            Checkout the availabitliy and book the date and time that works for
            you
          </h2>
          <div className="selectDateAndTime">
            <Calendar />
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-gray-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-gray-200 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
          onClick={handleSubmit}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default function Root() {
  return (
    <Provider store={store}>
      <Booking />
    </Provider>
  );
}
