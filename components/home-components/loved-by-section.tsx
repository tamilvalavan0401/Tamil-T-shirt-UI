"use client"

export function LovedBySection() {
  return (
    <section className="container mx-auto px-4 md:px-6 py-12 text-center">
      <h2 className="text-4xl md:text-6xl font-extrabold relative inline-block">
        <span className="text-stroke-black text-fill-transparent" style={{ WebkitTextStrokeColor: "#3C7029" }}>
          LOVED BY{" "}
        </span>
        <span className="text-[#5AC234]">25,000+</span>
        <span className="text-stroke-black text-fill-transparent" style={{ WebkitTextStrokeColor: "#3C7029" }}>
          {" "}
          PEOPLE
        </span>
        <span className="absolute inset-0 animate-glassy-flash pointer-events-none" />
      </h2>
    </section>
  )
}
