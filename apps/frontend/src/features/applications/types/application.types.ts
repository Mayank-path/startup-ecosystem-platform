export interface Application {
    _id: string
  
    status:
      | "PENDING"
      | "REVIEWED"
      | "ACCEPTED"
      | "REJECTED"
  
    coverLetter: string
  
    createdAt: string
  
    job: {
      _id: string
  
      title: string
  
      startup: {
        name: string
        logo: string
      }
    }
  }