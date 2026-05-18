import { useState } from "react"

import { uploadAvatar } from "../api/auth.api"
import { useAuthStore } from "../store/auth.store"

function AvatarUpload() {
  const setUser = useAuthStore((state) => state.setUser)

  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = async () => {
    if (!file) return

    try {
      setIsUploading(true)

      const response = await uploadAvatar(file)

      setUser(response.data)
      setFile(null)
    } catch (error: any) {
      console.log(error.response?.data || error.message)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex gap-3">
        <label className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100">
          Change photo
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0]
              if (selectedFile) setFile(selectedFile)
            }}
          />
        </label>

        <button
          type="button"
          onClick={handleUpload}
          disabled={!file || isUploading}
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {isUploading ? "Uploading..." : "Save"}
        </button>
      </div>

      {file && (
        <p className="max-w-xs truncate text-sm text-gray-500">
          {file.name}
        </p>
      )}
    </div>
  )
}

export default AvatarUpload