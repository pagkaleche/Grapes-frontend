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

    if (!token) {
      console.log('no token provided');
    }

    apiService.Appointments.getAll().then((appointments) => {
      console.log(appointments);
    });
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
