import { ArrowLeft } from "lucide-react"
import React from "react"
import { useNavigate } from "react-router-dom"
const About=()=>{
    const navigate=useNavigate()
    return (
        <main className="min-h-screen bg-[#FFFFE3] text-[#4A4A4A] p-4">
            <button onClick={()=>{
                navigate(-1)
            }}>
                <ArrowLeft />
            </button>

      {/* Hero */}
      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-5xl text-center">

          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#6D8196]">
            About CollabDesk
          </p>

          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            A simpler way for freelancers and clients
            <span className="block text-[#6D8196]">
              to stay aligned.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#4A4A4A]/70 md:text-lg">
            CollabDesk helps freelancers and clients stay organized,
            communicate clearly, and keep track of project progress
            from start to finish.
          </p>

        </div>
      </section>


      {/* What is CollabDesk */}
      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">

          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#6D8196]">
              What is CollabDesk?
            </p>

            <h2 className="text-3xl font-semibold md:text-4xl">
              Everything your project needs,
              <span className="block text-[#6D8196]">
                in one place.
              </span>
            </h2>
          </div>

          <div className="space-y-5 text-[#4A4A4A]/75 leading-7">
            <p>
              CollabDesk is a project collaboration platform designed
              to make working with clients more organized and transparent.
            </p>

            <p>
              Freelancers can create projects, break them down into
              milestones and tasks, share deliverables, and keep clients
              updated throughout the project.
            </p>

            <p>
              Clients get a dedicated view where they can track progress,
              review deliverables, leave feedback, and approve completed work.
            </p>
          </div>

        </div>
      </section>


      {/* Why CollabDesk */}
      <section className="bg-[#6D8196]/5 px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">

          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[#6D8196]">
              Why CollabDesk?
            </p>

            <h2 className="text-3xl font-semibold md:text-4xl">
              Built around the way
              <span className="text-[#6D8196]"> freelance projects work.</span>
            </h2>

            <p className="mt-5 leading-7 text-[#4A4A4A]/70">
              Instead of managing project details across scattered
              messages, files, and emails, CollabDesk brings the
              important parts of a project into one place.
            </p>
          </div>


          {/* Feature cards */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {/* Card 1 */}
            <div className="group rounded-2xl border border-[#6D8196]/20 bg-[#FFFFE3] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

              <span className="text-sm font-medium text-[#6D8196]">
                01
              </span>

              <h3 className="mt-5 text-xl font-semibold">
                Organize
              </h3>

              <p className="mt-3 leading-7 text-[#4A4A4A]/70">
                Keep projects, milestones, and tasks structured
                and easy to track in one place.
              </p>

            </div>


            {/* Card 2 */}
            <div className="group rounded-2xl border border-[#6D8196]/20 bg-[#FFFFE3] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

              <span className="text-sm font-medium text-[#6D8196]">
                02
              </span>

              <h3 className="mt-5 text-xl font-semibold">
                Collaborate
              </h3>

              <p className="mt-3 leading-7 text-[#4A4A4A]/70">
                Keep clients informed with project updates,
                milestones, tasks, and deliverables.
              </p>

            </div>


            {/* Card 3 */}
            <div className="group rounded-2xl border border-[#6D8196]/20 bg-[#FFFFE3] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

              <span className="text-sm font-medium text-[#6D8196]">
                03
              </span>

              <h3 className="mt-5 text-xl font-semibold">
                Review
              </h3>

              <p className="mt-3 leading-7 text-[#4A4A4A]/70">
                Submit work for review and let clients approve
                deliverables or provide feedback.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* Closing section */}
      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-4xl text-center">

          <div className="mx-auto mb-6 h-px w-16 bg-[#6D8196]" />

          <h2 className="text-3xl font-semibold md:text-5xl">
            From project planning
            <span className="text-[#6D8196]"> to final approval.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-7 text-[#4A4A4A]/70">
            CollabDesk helps freelancers and clients stay on the
            same page at every stage of the project.
          </p>

        </div>
      </section>

    </main>
    )
}
export default About

