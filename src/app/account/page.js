"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./index.scss";
import { APIService } from "@/lib/APIService";
import { Provider } from "react-redux";
import { store } from "@/store/store";

function Account() {
  const apiService = new APIService();
  const [users, setUsers] = useState(null); // Set initial state as null
  const [userEmail, setUserEmail] = useState('');
  const email = localStorage.getItem('email');
  console.log('email from local storage' + email);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let token = localStorage.getItem("token"); // Retrieve the token from localStorage

        // Add the token to the request headers
        let appointmentsArray = await apiService.Appointments.getAll({
          headers: {
            'Authorization': `Token ${token}`,  // Include token in the Authorization header
          },
        });

        // Find the appointment with id 30
        const appointment = appointmentsArray.find(appointment => appointment.customer.user.email === email);

        // If appointment is found, extract the email and set it in state
        if (appointment && appointment.customer && appointment.customer.user) {
          setUsers(appointment);  // Set the appointment data directly in users state
        } else {
          console.log("Appointment not found or data is incomplete.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Run this effect only once when the component mounts

  // If users is still null, show loading
  if (!users) {
    return <div>Loading...</div>;
  }

  const booking = {
    artist: "Max",
    service: "Tattoo",
    date: "2024-11-26",
    time: "14:00",
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
        {/* Profile Information */}
        <div className="border border-gray-500 p-6 rounded-lg bg-gray-900">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <p><strong>Name:</strong> {users.customer.user.first_name}</p>
          <p><strong>Phone Number:</strong> {users.customer.phone_number}</p>
          <p><strong>Email:</strong> {users.customer.user.email}</p>
        </div>

        {/* Booking Information */}
        <div className="border border-gray-500 p-6 rounded-lg bg-gray-900">
          <h2 className="text-xl font-semibold mb-4">Booking Information</h2>
          <p><strong>Client Name:</strong> {users.customer.user.first_name} {users.customer.user.last_name}</p>
          <p><strong>Email:</strong> {users.customer.user.email}</p>
          <p><strong>Phone:</strong> {users.customer.phone_number}</p>
          <p><strong>Artist:</strong> {booking.artist}</p>
          <p><strong>Service:</strong> {booking.service}</p>
          <p><strong>Date:</strong> {booking.date}</p>
          <p><strong>Time:</strong> {booking.time}</p>
          <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Root() {
  return (
    <Provider store={store}>
      <Account />
    </Provider>
  );
}
