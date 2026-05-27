// apps/web/app/forms/page.tsx

import Link from "next/link";

const sampleForms = [
  {
    id: "customer-feedback",
    title: "Customer Feedback Survey",
    description:
      "Collect feedback from customers after purchase to improve products, service quality and overall customer experience.",
    category: "Feedback",
    fields: 6,
    estimatedTime: "2 min",
    responses: 1248,
    details: [
      "Name",
      "Email",
      "Product Rating",
      "Service Satisfaction",
      "Would Recommend",
      "Additional Feedback",
    ],
  },
  {
    id: "event-registration",
    title: "Event Registration Form",
    description:
      "Register attendees for webinars, workshops, meetups and in-person events with a simple signup flow.",
    category: "Events",
    fields: 5,
    estimatedTime: "1 min",
    responses: 846,
    details: ["Full Name", "Email Address", "Company Name", "Ticket Type", "Special Requests"],
  },
  {
    id: "job-application",
    title: "Job Application Form",
    description:
      "Collect candidate information, resume links, portfolios and experience details during hiring.",
    category: "Hiring",
    fields: 7,
    estimatedTime: "4 min",
    responses: 412,
    details: [
      "Full Name",
      "Email",
      "Phone Number",
      "Resume Link",
      "Portfolio URL",
      "Years of Experience",
      "Cover Letter",
    ],
  },
  {
    id: "newsletter-signup",
    title: "Newsletter Signup Form",
    description:
      "Capture email subscribers and collect topic preferences for newsletters and product updates.",
    category: "Marketing",
    fields: 3,
    estimatedTime: "30 sec",
    responses: 3219,
    details: ["Full Name", "Email Address", "Topics of Interest"],
  },
];

export default function FormsPage() {
  return (
    <main className="min-h-screen bg-[#0B1326] px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Public Forms</h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">
            Explore sample forms built with RomexForm. These are display-only examples showcasing
            what creators can build, publish and share using the platform.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-2">
          {sampleForms.map((form) => (
            <div
              key={form.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-8 transition-all duration-300 hover:border-blue-500"
            >
              <div className="mb-4 inline-flex rounded-full bg-blue-600/10 px-3 py-1 text-xs font-medium text-blue-400">
                {form.category}
              </div>

              <h2 className="text-2xl font-semibold">{form.title}</h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">{form.description}</p>

              <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-500">
                <span>{form.fields} fields</span>
                <span>•</span>
                <span>{form.estimatedTime}</span>
                <span>•</span>
                <span>{form.responses.toLocaleString()} responses</span>
              </div>

              <div className="mt-6">
                <h3 className="mb-3 text-sm font-medium text-slate-300">Included fields</h3>

                <div className="flex flex-wrap gap-2">
                  {form.details.map((field) => (
                    <span
                      key={field}
                      className="rounded-md bg-slate-800 px-3 py-1 text-xs text-slate-400"
                    >
                      {field}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="#"
                  className="inline-flex cursor-default rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300"
                >
                  Demo Form Preview
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
