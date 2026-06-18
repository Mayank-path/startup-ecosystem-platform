import { useState } from "react"

import Button from "../../../components/ui/Button"

import { uploadStartupLogo } from "../api/startup.api"

interface Props {
  startupId: string
  currentLogo?: string
  onLogoUpdated?: (logoUrl: string) => void
}

function StartupLogoUpload({
  startupId,
  currentLogo,
  onLogoUpdated,
}: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = async () => {
    if (!file) return

    try {
      setIsUploading(true)

      const response = await uploadStartupLogo(startupId, file)

      onLogoUpdated?.(response.data.logo)

      setFile(null)
    } catch (error: any) {
      console.log(error.response?.data || error.message)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        {currentLogo ? (
          <img
            src={currentLogo}
            alt="startup logo"
            className="h-24 w-24 rounded-3xl border border-slate-700 object-cover"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-slate-700 bg-[#0F172A] text-sm font-semibold text-[#94A3B8]">
            No Logo
          </div>
        )}

        <div className="flex-1">
          <h3 className="text-lg font-bold text-[#F8FAFC]">
            Startup Logo
          </h3>

          <p className="mt-1 text-sm text-[#94A3B8]">
            Upload a clear square logo for your startup profile.
          </p>

          <label className="mt-4 inline-flex cursor-pointer items-center rounded-xl border border-slate-700 bg-[#0F172A] px-4 py-2 text-sm font-medium text-[#F8FAFC] transition hover:border-[#6366F1]">
            Choose Logo

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0]

                if (selectedFile) {
                  setFile(selectedFile)
                }
              }}
            />
          </label>

          {file && (
            <p className="mt-3 max-w-xs truncate text-sm text-[#94A3B8]">
              Selected: {file.name}
            </p>
          )}
        </div>
      </div>

      <Button
        type="button"
        disabled={!file || isUploading}
        onClick={handleUpload}
      >
        {isUploading ? "Uploading..." : "Save Logo"}
      </Button>
    </div>
  )
}

export default StartupLogoUpload