import React from 'react';
import { Container } from './Container';

export function Mission() {
  return (
    <section
      id="mission"
      aria-label="Mission of Urban Pulse"
      className="relative overflow-hidden flex-wrap h-[45rem] flex justify-center items-center bg-white pb-28 pt-20 sm:py-32"
    >
      <img
        className="absolute left-1/2 top-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]"
        src={""}
        alt=""
        width={2245}
        height={1636}
      />
      <Container className="relative">
        <div className="max-w-2xl flex flex-col sm:flex-row flex-wrap items-center justify-between  md:mx-auto md:text-center xl:max-w-none">
          <h2 className="font-display text-3xl tracking-tight text-black sm:text-4xl md:text-5xl">
            Our Mission
          </h2>
          <p className="mt-6  w-1/2 text-md md:text-xl tracking-tight text-gray-500">
            At Urban Pulse, our mission is to connect and engage communities by providing tools for information sharing, discussion, and collaboration on local issues and events. We strive to empower individuals to stay informed, participate in meaningful discussions, and work together to create positive change in their neighborhoods.
          </p>
        </div>
      </Container>
    </section>
  );
}
