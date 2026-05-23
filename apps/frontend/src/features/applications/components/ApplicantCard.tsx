import { useState } from "react"

import Card from "../../../components/ui/Card"
import Button from "../../../components/ui/Button"
import StatusBadge from "../../../components/ui/StatusBadge"

import {
  updateApplicationStatus,
} from "../api/application.api"

import type { Applicant } from "../types/applicant.types"

interface Props {
  applicant: Applicant
}

function ApplicantCard({
  applicant,
}: Props) {
  const [status, setStatus] =
    useState(applicant.status)

  const [isUpdating, setIsUpdating] =
    useState(false)

  const handleUpdateStatus =
    async (
      newStatus:
        | "ACCEPTED"
        | "REJECTED"
        | "REVIEWED"
    ) => {
      try {
        setIsUpdating(true)

        await updateApplicationStatus(
          applicant._id,
          newStatus
        )

        setStatus(newStatus)
      } catch (error) {
        console.log(error)
      } finally {
        setIsUpdating(false)
      }
    }

  return (
    <Card>
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4">
          {applicant.student.avatar ? (
            <img
              src={
                applicant.student.avatar
              }
              alt={
                applicant.student.name
              }
              className="h-16 w-16 rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-200 text-xl font-bold">
              {applicant.student.name.charAt(
                0
              )}
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold">
              {applicant.student.name}
            </h2>

            <p className="mt-1 text-gray-600">
              {applicant.student.email}
            </p>

            <p className="mt-3 text-sm text-gray-500">
              Applied on{" "}
              {new Date(
                applicant.createdAt
              ).toLocaleDateString()}
            </p>
          </div>
        </div>

        <StatusBadge
          status={status}
        />
      </div>

      {applicant.coverLetter && (
        <div className="mt-5 rounded-xl bg-gray-50 p-4">
          <p className="text-sm leading-7 text-gray-700">
            {applicant.coverLetter}
          </p>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        {applicant.resume && (
          <a
            href={applicant.resume}
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="secondary">
              View Resume
            </Button>
          </a>
        )}

        <Button
          disabled={isUpdating}
          onClick={() =>
            handleUpdateStatus(
              "REVIEWED"
            )
          }
        >
          Mark Reviewed
        </Button>

        <Button
          disabled={isUpdating}
          onClick={() =>
            handleUpdateStatus(
              "ACCEPTED"
            )
          }
          className="bg-green-600 hover:bg-green-700"
        >
          Accept
        </Button>

        <Button
          disabled={isUpdating}
          variant="danger"
          onClick={() =>
            handleUpdateStatus(
              "REJECTED"
            )
          }
        >
          Reject
        </Button>
      </div>
    </Card>
  )
}

export default ApplicantCard