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
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {currentLogo ? (
          <img
            src={currentLogo}
            alt="startup logo"
            className="h-20 w-20 rounded-2xl object-cover"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-200 text-xl font-bold">
            Logo
          </div>
        )}

        <div className="space-y-2">
          <label className="inline-block cursor-pointer rounded-xl border px-4 py-2 text-sm font-medium hover:bg-gray-100">
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
            <p className="max-w-xs truncate text-sm text-gray-500">
              {file.name}
            </p>
          )}
        </div>
      </div>

      <Button
        type="button"
        disabled={!file || isUploading}
        onClick={handleUpload}
      >
        {isUploading ? "Uploading..." : "Upload Logo"}
      </Button>
    </div>
  )
}

export default StartupLogoUpload