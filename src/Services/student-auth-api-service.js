import config from '../config'
import TokenService from './token-service'


const StudentAuthApiService = {
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
  postLogin({ username }) {
    return fetch(`${config.API_ENDPOINT}/auth/token`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ username }),
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
  getAllStudents() {
    return fetch(`${config.API_ENDPOINT}/class/`, {
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
      header: {
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
  }
}

export default StudentAuthApiService