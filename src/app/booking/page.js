"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Calendar from "react-calendar";
import { motion } from "framer-motion";
import { pageVariants } from '@/components/Variants';
import "./index.scss";
import { APIService } from "@/lib/APIService";
import { useAppSelector } from "@/store/store";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import Modal from "./Modal"; // Import Modal component
import { stringify } from "postcss";

function Booking() {
  const token = useAppSelector((state) => state.auth.token);
  console.log('token', token, typeof (token));
  const apiService = new APIService();
  const router = useRouter();
  const [selectedArtist, setSelectedArtist] = useState({ id: 0 });
  const [selectedService, setSelectedService] = useState({ id: 0 });
  const [selectedDate, setSelectedDate] = useState('');
  const [artists, setArtists] = useState([]);
  const [services, setServices] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedPhone, setSelectedPhone] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    artist: '',
    service: '',
    date: '',
    time: '',
  });
  const password = "qweasdzxc1234";

  const slots = ['10:00 a.m.', '11:00 a.m.', '12:00 p.m.', '13:00 p.m.', '14:00 p.m.', '15:00 p.m.', '16:00 p.m.', '17:00 p.m.'];

  const handleSubmit = async (event) => {
  
    const formattedDate = selectedDate.toISOString().split('T')[0];
    const cleanTime = selectedTime.replace(/(\s?[a|p]\.m\.)/g, '').trim();

    let appointmentData = {
      provided_at: `${formattedDate}T${cleanTime}Z`,
      artist: selectedArtist.id,
      provided_service: selectedService.id,
      message: "",
    };


      console.log("EXECUTING");
      appointmentData['customer_data'] = {
        user: {
          first_name: selectedName,
          email: selectedEmail,
        },
        phone_number: "123456789",
      }

    let createdAppointment = await apiService.Appointments.create(
      appointmentData,
      token
    );
    console.log("created appointment"+JSON.stringify(createdAppointment, null, 2));
    // Set user details for the modal
    setUserDetails({
      name: createdAppointment.customer.user.first_name,
      artist: createdAppointment.artist.user.first_name,
      service: createdAppointment.provided_service.name,
      date: formattedDate,
      time: selectedTime,
    });

    // Show the modal
    setShowModal(true);
    console.log("Client info: " + selectedEmail + selectedName + selectedPhone);
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
    const fetchData = async () => {
      try {
        let servicesArray = await apiService.Services.getAll();
        let artistsArray = await apiService.Artists.getAll();
        setArtists(artistsArray);
        setServices(servicesArray);

        const me = await apiService.Users.me(token);
        console.log('me', me);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1.5 }}
    >
      <div className="booking-container mx-auto p-4 sm:p-8">
        {/* Artist and Service Selection */}
        <div className="artist-service-selection">
          <div className="mb-4">
            <label htmlFor="selectArtist" className="block text-3xl font-medium text-gray-700 mb-2">Choose your artist:</label>
            <select
              id="selectArtist"
              value={selectedArtist.id}
              onChange={(e) => setSelectedArtist({ id: e.target.value })}
              className="w-full px-4 py-2 border rounded-md text-gray-500"
            >
              <option>Select Artist</option>
              {artists.map((artist) => (
                <option key={artist.id} value={artist.id}>
                  {artist.user.first_name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="selectService" className="block text-3xl font-medium text-gray-700 mb-2">Choose your service:</label>
            <select
              id="selectService"
              value={selectedService.id}
              onChange={(e) => setSelectedService({ id: e.target.value })}
              className="w-full px-4 py-2 border rounded-md text-gray-500"
            >
              <option>Select Service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="section-divider border-t border-gray-300"></div>

        {/* Client Info Section */}
        {!token && token !== "undefined" && (
          <div className="client-info mb-8">
            <h1 className="text-2xl font-semibold text-left mb-2">Client Details</h1>
            <h2 className="text-xl text-left mb-6">Tell us a little bit about yourself.</h2>

            <div className="form-container space-y-6">
              <div className="name-email-fields flex flex-col sm:flex-row sm:space-x-6">
                <div className="name-field sm:w-1/2">
                  <label htmlFor="nameInput" className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                  <input
                    id="nameInput"
                    value={selectedName}
                    onChange={(e) => setSelectedName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md text-gray-700"
                  />
                </div>
                <div className="email-field sm:w-1/2">
                  <label htmlFor="emailInput" className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    id="emailInput"
                    value={selectedEmail}
                    onChange={(e) => setSelectedEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md text-gray-700"
                  />
                </div>
              </div>

              <div className="other-fields space-y-6">
                <div>
                  <label htmlFor="phoneInput" className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    id="phoneInput"
                    value={selectedPhone}
                    onChange={(e) => setSelectedPhone(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md text-gray-700"
                  />
                </div>
              </div>
            </div>
            <div className="section-divider border-t border-gray-300"></div>
          </div>
        )}

        {/* Appointment Scheduling */}
        <div className="appointment-scheduling mb-8">
          <h1 className="text-4xl font-semibold text-center mb-4 text-gray-700">Schedule your appointment</h1>
          <h2 className="text-xl text-center text-gray-700 mb-6">Checkout the availability and book the date and time that works for you</h2>

          <div className="appointment-container flex flex-col sm:flex-row sm:space-x-6 justify-center">
            <div className="calendar-container sm:w-1/2">
              <Calendar
                onClickDay={handleDayPress}
                tileClassName={tileClassName}
                monthFormat={'yyyy MM'}
                className="rounded-lg border-2 border-gray-700 shadow-md text-gray-700"
              />
            </div>

            {selectedDate && (
              <div className="time-selection sm:w-1/3 mt-6 sm:mt-0 flex flex-col items-center">
                <h2 className="text-lg font-semibold mb-2">Select Time</h2>
                {availableSlots.length > 0 ? (
                  <div className="slot-list space-y-2">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => handleSelectSlot(slot)}
                        className="slot-button w-40 py-2 text-white rounded-md text-center"
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
                  <p className="text-xl text-center">Not available time slots for this day.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Next Button */}
        <div className="next-button text-center mt-8">
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-8 py-3 text-white rounded-md hover:bg-blue-700"
          >
            NEXT
          </button>
        </div>

        {/* Modal to show booking confirmation */}
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            router.push("/");
          }}
          userDetails={userDetails}
        />
      </div>
    </motion.div>
  );
}

export default function Root() {
  return (
    <Provider store={store}>
      <Booking />
    </Provider>
  );
}