"use client";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { APIService } from "@/lib/APIService";
import { useEffect, useState } from "react";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const token = useAppSelector((state) => state.auth.token);
  console.log(token);

  useEffect(() => {
    const apiService = new APIService();
    async function getAppointments() {
      let appointments = await apiService.Appointments.getAll();
      console.log(appointments);
      let services = await apiService.Services.getAll();
      console.log(services);
      let artists = await apiService.Artists.getAll();
      console.log(artists);

      let createdAppointment = await apiService.Appointments.create({
        artist: 1,
        provided_service: 1,
        customer: 1, // NOTE: will be found by token,
      });
      console.log(createdAppointment);
    }
    getAppointments();

  }, []);

  return (
    <div className="pt-10 bg-black">
      {appointments.map((appointment) => {
        <div>{appointment.id}</div>
      })}
    </div>
  );
}

export default function Root() {
  return (
    <Provider store={store}>
      <Appointments />
    </Provider>
  );
}
