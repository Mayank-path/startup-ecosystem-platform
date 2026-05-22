const asyncHandler = require(
    "../../core/asyncHandler"
  )
  
  const ApiResponse = require(
    "../../core/ApiResponse"
  )
  
  const applicationService = require(
    "./application.service"
  )
  
  const applyJob = asyncHandler(
    async (req, res) => {
      const application =
        await applicationService.applyJob(
          req.user,
          req.body
        )
  
      return ApiResponse.created(
        res,
        application,
        "Applied successfully",
        201
      )
    }
  )
  
  const getMyApplications =
    asyncHandler(async (req, res) => {
      const applications =
        await applicationService.getMyApplications(
          req.user
        )
  
      return ApiResponse.success(
        res,
        applications,
        "Applications fetched successfully"
      )
    })
  
  const getApplicationsByJob =
    asyncHandler(async (req, res) => {
      const applications =
        await applicationService.getApplicationsByJob(
          req.user,
          req.params.jobId
        )
  
      return ApiResponse.success(
        res,
        applications,
        "Job applications fetched successfully"
      )
})

const updateApplicationStatus =
  asyncHandler(async (req, res) => {
    const application =
      await applicationService.updateApplicationStatus(
        req.user,
        req.params.id,
        req.body.status
      )

    return ApiResponse.success(
      res,
      application,
      "Application status updated successfully"
    )
})

const uploadResume = asyncHandler(
  async (req, res) => {
    const application =
      await applicationService.uploadResume(
        req.user,
        req.params.id,
        req.file
      )

    return ApiResponse.success(
      res,
      application,
      "Resume uploaded successfully"
    )
  }
)
  
module.exports = {
  applyJob,
  getMyApplications,
  getApplicationsByJob,
  updateApplicationStatus,
  uploadResume
}