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
        <label className="cursor-pointer rounded-lg border border-slate-700 bg-[#1E293B] px-4 py-2 text-sm font-medium text-[#F8FAFC] transition hover:border-[#6366F1] hover:text-[#6366F1]">
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
          className="rounded-lg bg-[#6366F1] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#4F46E5] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUploading ? "Uploading..." : "Save"}
        </button>
      </div>

      {file && <p className="max-w-xs truncate text-sm text-[#94A3B8]">{file.name}</p>}
    </div>
  )
}

export default AvatarUpload