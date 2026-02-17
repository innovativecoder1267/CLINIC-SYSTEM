import {
  Calendar,
  Users,
  Clock,
  Shield,
  BarChart3,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full text-gray-800">

      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
            <Calendar className="w-6 h-6" />
            ClinicFlow
          </div>
          <div className="flex items-center gap-6">
            <Link href={"/login"}>
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Login
            </button>
            </Link>
            <Link href={"/sign-up"}>
            <button className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Get Started
            </button>
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="py-28 bg-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h1 className="text-5xl font-bold leading-tight">
            Manage Your Clinic Operations Digitally
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Stop relying on registers, Excel sheets, and WhatsApp. ClinicFlow
            helps you manage doctor availability, patient appointments, and
            daily operations in one secure platform.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link href={"/sign-up"}>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-md text-lg hover:bg-blue-700">
              Get Started
            </button>
            </Link>
             <Link href={"/login"}>
            <button className="px-6 py-3 border border-gray-300 rounded-md text-lg">
              Login
            </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= CHALLENGES ================= */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">
            Common Clinic Management Challenges
          </h2>
          <p className="text-center text-gray-600 mt-3">
            Managing a clinic manually leads to operational inefficiencies
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-14">
            {[
              {
                title: "Missed Appointments",
                desc: "Patients forget appointments or arrive at wrong times, causing revenue loss.",
              },
              {
                title: "Manual Registers & Paperwork",
                desc: "Physical registers and Excel sheets are time-consuming and error-prone.",
              },
              {
                title: "Scheduling Confusion",
                desc: "Appointments via calls or WhatsApp create miscommunication.",
              },
              {
                title: "No Visibility of Daily Workload",
                desc: "Staff can’t see the full day’s schedule clearly.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl border shadow-sm"
              >
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-600 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SOLUTION ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">
            How ClinicFlow Solves This
          </h2>
          <p className="text-center text-gray-600 mt-3">
            A structured system that brings order to your clinic operations
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-14">
            {[
              {
                title: "Availability-Based Booking",
                desc: "Doctors upload availability. No double booking possible.",
                icon: CheckCircle,
              },
              {
                title: "Separate Dashboards",
                desc: "Admin dashboard for staff, patient dashboard for bookings.",
                icon: Users,
              },
              {
                title: "Digital Appointment Management",
                desc: "Appointments stored digitally with patient details.",
                icon: Calendar,
              },
              {
                title: "Complete Schedule Visibility",
                desc: "View filled and available slots at a glance.",
                icon: BarChart3,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 p-6 rounded-xl border"
              >
                <item.icon className="w-8 h-8 text-green-600" />
                <h3 className="font-semibold text-lg mt-4">{item.title}</h3>
                <p className="text-gray-600 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= KEY FEATURES ================= */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">Key Features</h2>
          <p className="text-center text-gray-600 mt-3">
            Everything you need to run a modern clinic
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-14">
            {[
              { title: "Appointment Scheduling", icon: Calendar },
              { title: "Patient Management", icon: Users },
              { title: "Availability Management", icon: Clock },
              { title: "Role-Based Access", icon: Shield },
              { title: "Secure Login System", icon: Shield },
              { title: "Dashboard & Reports", icon: BarChart3 },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl border shadow-sm"
              >
                <item.icon className="w-8 h-8 text-blue-600" />
                <h3 className="font-semibold text-lg mt-4">{item.title}</h3>
                <p className="text-gray-600 mt-2">
                  Reliable, simple, and built for real clinic workflows.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <p className="text-gray-600 mt-3">
            Simple three-step process for seamless clinic operations
          </p>

          <div className="grid md:grid-cols-3 gap-10 mt-16">
            {[
              "Clinic Sets Availability",
              "Patients Book Slots",
              "Clinic Manages Appointments",
            ].map((step, i) => (
              <div key={i}>
                <div className="w-14 h-14 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-lg mt-6">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRUST ================= */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">
            Why Clinics Trust ClinicFlow
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-14">
            {[
              "Built for Real Workflows",
              "Secure & Role-Based",
              "Simple & Reliable",
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border">
                <CheckCircle className="w-8 h-8 text-blue-600 mx-auto" />
                <h3 className="font-semibold text-lg mt-4">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 bg-blue-600 text-white text-center">
        <h2 className="text-4xl font-bold">
          Ready to Modernize Your Clinic?
        </h2>
        <p className="mt-4 text-lg">
          Join clinics that have moved from registers and Excel to a professional
          digital system.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button className="px-6 py-3 bg-white text-blue-600 rounded-md font-semibold">
            Get Started Free
          </button>
          <button className="px-6 py-3 border border-white rounded-md">
            Request Demo
          </button>
        </div>
      </section>

    </div>
  );
}
