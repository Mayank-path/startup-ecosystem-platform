import { useEffect, useState } from "react"

import Card from "../../../components/ui/Card"
import PageHeader from "../../../components/ui/PageHeader"
import EmptyState from "../../../components/ui/EmptyState"
import LoadingSpinner from "../../../components/ui/LoadingSpinner"
import ErrorState from "../../../components/ui/ErrorState"
import StatusBadge from "../../../components/ui/StatusBadge"

import { getMyApplications } from "../api/application.api"

import type { Application } from "../types/application.types"

function MyApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getMyApplications()

        setApplications(response.data)
      } catch (error) {
        console.log(error)
        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchApplications()
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (hasError) {
    return (
      <div className="mx-auto max-w-5xl p-6">
        <ErrorState
          title="Unable to load applications"
          description="Please try again later."
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <PageHeader
        title="My Applications"
        subtitle="Track your startup job applications."
      />

      {applications.length === 0 ? (
        <EmptyState
          title="No applications yet"
          description="Start applying to jobs to track your applications here."
        />
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

                    <StatusBadge status={application.status} />
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

                  <StatusBadge status={application.status} />
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