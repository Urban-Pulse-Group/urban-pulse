import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <h1 className="text-4xl font-bold mb-8">Welcome to Our Website!</h1>
      <section className="text-center my-8">
        <h2 className="text-2xl font-semibold mb-4">About Us</h2>
        <p className="text-lg">...</p>
      </section>
      <section className="text-center my-8">
        <h2 className="text-2xl font-semibold mb-4">Mission</h2>
        <p className="text-lg">
          Moving can be a very difficult and tedious process. Our website aims
          to make this process easier by providing specifics and valuable
          information about the neighborhood. This information includes median
          household income, neighborhood population, and more. It is important
          to feel safe and comfortable in your surroundings, which is why we
          also offer a community forum. You can discuss anything from events to
          concerns to suggestions. We want to empower you with making informed
          decisions.
        </p>
      </section>
    </div>
  );
}
