"use client";

import { useRouter } from "next/navigation";
import Calendar from "react-calendar";
import "./index.scss";
import { APIService } from "@/lib/APIService";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/store/store";
import { Provider } from "react-redux";
import { store } from "@/store/store";

function Booking2() {
  const token = useAppSelector((state) => state.auth.token);
  const apiService = new APIService();
  const router = useRouter();
  const [selectedArtist, setSelectedArtist] = useState({ id: 1 });
  const [selectedService, setSelectedService] = useState({ id: 1 });
  const [selectedDate, setSelectedDate] = useState('');
  const [artists, setArtists] = useState([]);
  const [services, setServices] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');

  const slots = ['10:00 a.m.', '11:00 a.m.', '12:00 p.m.', '13:00 p.m.', '14:00 p.m.', '15:00 p.m.', '16:00 p.m.', '17:00 p.m.'];

  const handleSubmit = async (event) => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    const cleanTime = selectedTime.replace(/(\s?[a|p]\.m\.)/g, '').trim();
    let createdAppointment = await apiService.Appointments.create(
      {
        provided_at: `${formattedDate}T${cleanTime}Z`,
        artist: selectedArtist.id,
        provided_service: selectedService.id,
      },
      token
    );
    router.push("/");
  };

  const handleDayPress = (date) => {
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 6 || dayOfWeek === 0) {
      setAvailableSlots([]);
      setSelectedDate(date);
    } else {
      setSelectedDate(date);
      setAvailableSlots(slots);
    }
    setSelectedTime(null);
  };

  const handleSelectSlot = (slot) => {
    setSelectedTime(slot);
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month' && selectedDate) {
      const selectedDateString = selectedDate.toDateString();
      if (date.toDateString() === selectedDateString) {
        return 'selected-day';
      }
    }
    return null;
  };

  useEffect(() => {
    console.log("token :" + token);
    const fetchData = async () => {
      try {
        let servicesArray = await apiService.Services.getAll();
        let artistsArray = await apiService.Artists.getAll();
        setArtists(artistsArray);
        setServices(servicesArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="booking-container">
      <div className="artist-service-selection">
        <h1>Choose an Artist and a Service</h1>
        <label>Choose an Artist</label>
        <select
          id="selectArtist"
          value={selectedArtist.id}
          onChange={(e) => setSelectedArtist({ id: e.target.value })}
        >
          <option>Select Artist</option>
          {artists.map((artist) => (
            <option key={artist.id} value={artist.id}>
              {artist.user.first_name}
            </option>
          ))}
        </select>
        <label>Choose a Service</label>
        <select
          id="selectService"
          value={selectedService.id}
          onChange={(e) => setSelectedService({ id: e.target.value })}
        >
          <option>Select Service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      </div>
      <div className="section-divider"></div>
      {!token && (
        <div className="client-info">
          <h1>Tell us a little bit about yourself</h1>
          <h2>Client Details</h2>
          <div className="form-container">
            <span className="form-divider"></span>
            <div className="name-email-fields">
              <div className="name-field">
                <label>Name *</label>
                <input id="nameInput" />
              </div>
              <div className="email-field">
                <label>Email *</label>
                <input id="emailInput" />
              </div>
            </div>
            <div className="other-fields">
              <div>
                <label>Phone Number *</label>
                <input id="phoneInput" />
              </div>

              <div>
                <label>Add Your Message *</label>
                <input id="messageInput" />
              </div>

              <div>
                <label>Add images of Desired Work *</label>
                <input id="imageUpload" name="image" type="file" />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="section-divider"></div>
      <div className="appointment-scheduling">
          <h1>Schedule your appointment</h1>
          <h2>Checkout the availability and book the date and time that works for you</h2>
          <div className="appointment-container">
            <div className="calendar-container">
              <Calendar
                onClickDay={handleDayPress}
                tileClassName={tileClassName}
                monthFormat={'yyyy MM'}
              />
            </div>
            {selectedDate && (
              <div className="time-selection">
                <h2>Select Time</h2>
                {availableSlots.length > 0 ? (
                  <div className="slot-list">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => handleSelectSlot(slot)}
                        className="slot-button"
                        style={{
                          backgroundColor: selectedTime === slot ? 'white' : 'black',
                          color: selectedTime === slot ? 'black' : 'white',
                        }}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: '1.5rem' }}>Not available time slots for this day.</p>
                )}
              </div>
            )}
          </div>
      </div>
      <div className="next-button">
        <button type="submit" onClick={handleSubmit}>
          NEXT
        </button>
      </div>
    </div>
  );
}

export default function Root() {
  return (
    <Provider store={store}>
      <Booking2 />
    </Provider>
  );
}
