'use client'

import { useRouter } from "next/navigation";
import Calendar from 'react-calendar';
import "./index.scss";

export default function Booking() {
  const router = useRouter();

  const handleSubmit = async (event) => {
    router.push('/');
  }

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
                <h2>Checkout the availabitliy and book the date and time
                    that works for you
                </h2>
                <div className="selectDateAndTime">
                    <Calendar />
                </div>
            </div>
        </div>
    </div>
  );
}
