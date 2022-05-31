declare module 'Events' {
  type TeacherEventType =
    | 'SCIENCE_POSTS'
    | 'TRAINEE_OR_QUALIFIER_HIGHER'
    | 'CONFERENCES_OR_APPROBATION'
    | 'STUDENT_CONTEST_OR_OLYMPIAD'
    | 'SCHOOLBOY_CONTEST_OR_OLYMPIAD'
    | 'METHODICAL_DEVELOPMENT'
    | 'BOOKS'
    | 'DEFENSE_OR_SCIENCE_LEADERSHIP'
    | 'PARTICIPATION_ON_COUNCILS'
    | 'MANAGMENT_PROJECTS_AND_ETC'
    | 'PARTICIPATION_ON_EXPERT_COMMISIONS'
    | 'SCIENFIC_CONSULTING'
    | 'TEACHING_OTHER_LANGUAGE'
    | 'PARTICIPATION_ON_PEOPLE_AND_PROFF_ASSOCIATIONS'

  type StudentEventType = 'SCIENCE' | 'SPORT' | 'CULTURE' | 'PUBLIC'

  interface Duration {
    startDate: Date
    endDate: Date
  }

  interface StudentEvent {
    id: string
    type: StudentEventType
    duration: Duration
    description: string
    comment: string
    mark: string
  }

  interface TeacherEvent {
    id: string
    type: TeacherEventType
    duration: Duration
    description: string
    comment: string
  }
}
