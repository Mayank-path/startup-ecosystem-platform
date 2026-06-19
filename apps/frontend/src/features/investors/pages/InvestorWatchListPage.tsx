import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Button from "../../../components/ui/Button"
import LoadingSpinner from "../../../components/ui/LoadingSpinner"
import EmptyState from "../../../components/ui/EmptyState"

import {
  getInvestorWatchlist,
  removeFromWatchlist,
} from "../api/investor.api"

import type { Startup } from "../../startups/types/startup.types"

interface WatchlistItem {
  _id: string
  startup: Startup
}

function InvestorWatchlistPage() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await getInvestorWatchlist()
        setWatchlist(response.data.data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWatchlist()
  }, [])

  const handleRemove = async (startupId: string) => {
    try {
      await removeFromWatchlist(startupId)

      setWatchlist((prev) =>
        prev.filter((item) => item.startup._id !== startupId)
      )
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <main className="mx-auto min-h-[calc(100vh-160px)] max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-[#F8FAFC]">
          Investor Watchlist
        </h1>

        <p className="mt-3 max-w-2xl text-[#94A3B8]">
          Startups you saved while exploring the ecosystem.
        </p>
      </div>

      {watchlist.length === 0 ? (
        <EmptyState
          title="No startups saved yet"
          description="Explore startups and save the ones you want to follow."
          action={
            <Link to="/startups">
              <Button>Explore Startups</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {watchlist.map((item) => (
            <div
              key={item._id}
              className="rounded-[2rem] border border-slate-700 bg-[#1E293B] p-6"
            >
              <div className="flex items-center gap-4">
                {item.startup.logo ? (
                  <img
                    src={item.startup.logo}
                    alt={item.startup.name}
                    className="h-14 w-14 rounded-2xl border border-slate-700 object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F172A] text-xl font-bold text-[#F8FAFC]">
                    {item.startup.name.charAt(0)}
                  </div>
                )}

                <div>
                  <h2 className="text-xl font-bold text-[#F8FAFC]">
                    {item.startup.name}
                  </h2>
                  <p className="text-sm text-[#94A3B8]">
                    {item.startup.industry}
                  </p>
                </div>
              </div>

              <p className="mt-5 line-clamp-3 text-sm leading-6 text-[#94A3B8]">
                {item.startup.tagline}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-[#6366F1]/30 bg-[#6366F1]/10 px-3 py-1 text-xs text-[#CBD5E1]">
                  {item.startup.fundingStage}
                </span>

                <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-[#94A3B8]">
                  {item.startup.location || "Remote"}
                </span>
              </div>

              <div className="mt-6 flex gap-3">
                <Link to={`/startups/${item.startup._id}`} className="flex-1">
                  <Button className="w-full">View</Button>
                </Link>

                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => handleRemove(item.startup._id)}
                  className="flex-1"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default InvestorWatchlistPage