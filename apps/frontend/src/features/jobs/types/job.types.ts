export interface Job {
    _id: string
  
    startup: {
      _id: string
      name: string
      tagline: string
      logo: string
    }
  
    title: string
    description: string
  
    roleType:
      | "FULL_TIME"
      | "PART_TIME"
      | "INTERNSHIP"
      | "CONTRACT"
  
    location: string
  
    skillsRequired: string[]
  
    salary: string
  
    isActive: boolean
  
    createdAt: string
  }