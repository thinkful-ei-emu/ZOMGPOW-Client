import config from '../config'
import TokenService from './token-service'


const StudentAuthApiService = {
  // this endpoint requries an authorization header on the backend
  postStudent(student) {
    return fetch(`${config.API_ENDPOINT}/register/student`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(student),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
     
  },
  postLogin(user_name) {
    return fetch(`${config.API_ENDPOINT}/auth/student/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({user_name}),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(err => Promise.reject(err))
          : res.json()
      )
  },
  refreshToken() {
    return fetch(`${config.API_ENDPOINT}/auth/token`, {
      method: 'PUT',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getAllStudents(classId) {
    console.log('get all students ran with', classId)
    return fetch(`${config.API_ENDPOINT}/class/${classId}/students`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  //Can be done if PATCH is implemented
  updateStudent(student_goal_id, data) {
    return fetch(`${config.API_ENDPOINT}/subgoals/${student_goal_id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`, 
      },
      body: JSON.stringify({
        student_goal_id,
        ...data
      })
    }).then(res => 
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    )
  },
  getStudentGoals(student_id) {
    return fetch(`${config.API_ENDPOINT}/goals/student/${student_id}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  postStudentSubgoal(student_goal_id, data) {
    return fetch(`${config.API_ENDPOINT}/subgoals/${student_goal_id}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`, 
      },
      body: JSON.stringify({
        ...data
      })
    }).then(res => 
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    )
  }
}

export default StudentAuthApiService