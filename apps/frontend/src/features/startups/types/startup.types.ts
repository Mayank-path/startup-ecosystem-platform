export interface Startup {
    _id: string
    name: string
    tagline: string
    description: string
    industry: string
    fundingStage: "IDEA" | "MVP" | "SEED" | "SERIES_A" | "GROWTH"
    location: string
    website: string
    techStack: string[]
    logo: string
    isVerified: boolean
    founder: {
      _id: string
      name: string
      email: string
      avatar: string
      role: string
    }
    createdAt: string
    updatedAt: string
  }