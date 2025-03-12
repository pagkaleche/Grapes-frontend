"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";

function Appointments() {
  return <>Hello world</>;
}

export default function Root() {
  return (
    <Provider store={store}>
      <Appointments />
    </Provider>
  );
}
