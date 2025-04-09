"use client";

import React, { useState, useEffect } from "react";
import { APIService } from "@/lib/APIService";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import './index.scss';

function Account() {
  const router = useRouter();
  const token = useAppSelector((state) => state.auth.token);
  const apiService = new APIService();
  const [users, setUsers] = useState(null); // Set initial state as null
  const [users2, setUsers2] = useState(null);
  const [appointmentId, setAppointmentId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling modal visibility
  const [email, setEmail] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("email");
      setEmail(storedEmail); // Set the email state from localStorage
    }
  }, []); // Run this effect only once when the component mounts

  useEffect(() => {
    console.log("Client's email 2: "+email)
    if (email !== null) {
      console.log("executing");
      const fetchData = async () => {
        try {
          let appointmentsArray = await apiService.Appointments.getAll(
            null,
            token,
          );
          console.log(appointmentsArray);

          let fetchUser = await apiService.Users.me(token);
          setUser(fetchUser);
          console.log("Users array: "+JSON.stringify(users, null, 2));
          
          const appointment = appointmentsArray.find(appointment => appointment.customer.user.email === email);
          console.log(appointment);
          
          if (appointment && appointment.customer && appointment.customer.user) {
            setUsers(appointment);  // Set the appointment data directly in users state
            setUsers2(appointment);
            setAppointmentId(appointment.id);
            let dateObj = appointment.provided_at.split('T')[0];
            let timeObj = appointment.provided_at.split('T')[1].split(':').slice(0, 2).join(':');
            setDate(dateObj);
            setTime(timeObj);
          } else {
            console.log("Appointment not found or data is incomplete.");
            setUsers(null); // Ensure no appointment data is set
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [email]); // Run fetchData whenever the email is set

  const handleCancel = async () => {
    try {
      let response = await apiService.Appointments.delete(appointmentId, token);
      console.log('Appointment deleted successfully', response);
  
      // Clear the users state after successful deletion (indicating no appointment)
      setUsers(null); // Reset users to null to reflect that the appointment is canceled
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };
  
  const book = () => {
    router.push("/booking");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <div className="content">
        {/* Profile Information Header */}
        <h2 className="section-header">Profile Information</h2>
        <div className="section-content">
          <div className="info-card">
            <p><strong>Name:</strong> {user ? user.first_name + " " + user.last_name: 'Loading...'}</p>
            <p><strong>Phone Number:</strong> {users2 ? users2.customer.phone_number : 'Loading...'}</p>
            <p><strong>Email:</strong> {user ? user.email : 'Loading...'}</p>
          </div>
        </div>

        {/* Booking Information Section */}
        <h2 className="section-header">Booking Information</h2>
        <div className="section-content">
          {users ? (
            <div className="info-card">
              <p><strong>Client Name:</strong> {users.customer.user.first_name} {users.customer.user.last_name}</p>
              <p><strong>Email:</strong> {users.customer.user.email}</p>
              <p><strong>Phone:</strong> {users.customer.phone_number}</p>
              <p><strong>Artist:</strong> {users.artist ? users.artist.user.first_name : 'N/A'}</p>
              <p><strong>Service:</strong> {users.provided_service ? users.provided_service.name : 'N/A'}</p>
              <p><strong>Date:</strong> {date}</p>
              <p><strong>Time:</strong> {time}</p>
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel Appointment
              </button>
              <div className="policy-link"> 
                <a href="#" onClick={openModal}>View Cancellation Policy</a>
              </div>
            </div>
          ) : (
            <div className="book-appointment">
                <p style={{ fontSize: '2.5rem', textAlign: 'center', padding: '2rem'}}>You don't have an appointment scheduled.</p>
                <button className="book-btn" onClick={book}>
                    Book an Appointment
                </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Cancellation Policy */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Cancellation Policy</h2>
            <div className="modal-details">
              <p>We require at least 24 hours notice for cancellations or rescheduling.</p>
              <p>If you cancel within 24 hours of your appointment, a cancellation fee will apply.</p>
              <p>For rescheduling, please contact us at least 48 hours before your appointment time.</p>
            </div>
            <button className="close-button" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
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
