import { useEffect, useState } from "react"

import Card from "../../../components/ui/Card"

import { getMyApplications } from "../api/application.api"

import type { Application } from "../types/application.types"

function MyApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getMyApplications()

        setApplications(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchApplications()
  }, [])

  if (isLoading) {
    return <div className="p-6">Loading applications...</div>
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <div>
        <h1 className="text-4xl font-bold">
          My Applications
        </h1>

        <p className="mt-2 text-gray-600">
          Track your startup job applications.
        </p>
      </div>

      {applications.length === 0 ? (
        <Card>
          <p className="text-gray-600">
            You have not applied to any jobs yet.
          </p>
        </Card>
      ) : (
        <div className="space-y-5">
          {applications.map((application) => {
            if (!application.job) {
              return (
                <Card key={application._id}>
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">
                        Job no longer available
                      </h2>

                      <p className="mt-2 text-gray-600">
                        This job may have been deleted by the startup.
                      </p>

                      <p className="mt-3 text-sm text-gray-500">
                        Applied on{" "}
                        {new Date(application.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <span
                      className={`w-fit rounded-full px-4 py-2 text-sm font-medium ${
                        application.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : application.status === "ACCEPTED"
                            ? "bg-green-100 text-green-700"
                            : application.status === "REJECTED"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {application.status}
                    </span>
                  </div>
                </Card>
              )
            }

            return (
              <Card key={application._id}>
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start gap-4">
                    {application.job.startup.logo ? (
                      <img
                        src={application.job.startup.logo}
                        alt={application.job.startup.name}
                        className="h-16 w-16 rounded-2xl object-cover"
                      />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-200 text-xl font-bold">
                        {application.job.startup.name.charAt(0)}
                      </div>
                    )}

                    <div>
                      <h2 className="text-2xl font-bold">
                        {application.job.title}
                      </h2>

                      <p className="mt-1 text-gray-600">
                        {application.job.startup.name}
                      </p>

                      <p className="mt-3 text-sm text-gray-500">
                        Applied on{" "}
                        {new Date(application.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <span
                      className={`rounded-full px-4 py-2 text-sm font-medium ${
                        application.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : application.status === "ACCEPTED"
                            ? "bg-green-100 text-green-700"
                            : application.status === "REJECTED"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {application.status}
                    </span>
                  </div>
                </div>

                {application.coverLetter && (
                  <div className="mt-5 rounded-xl bg-gray-50 p-4">
                    <p className="text-sm text-gray-700">
                      {application.coverLetter}
                    </p>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MyApplicationsPage