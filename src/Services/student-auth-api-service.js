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
  deleteStudent(user_name, classId){
    return fetch(`${config.API_ENDPOINT}/class/${classId}/students`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({user_name}),
    })
    .then(res =>
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res
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
  getStudent(stuId){
    return fetch(`${config.API_ENDPOINT}/studentgoals/student/${stuId}`, {
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
  getStudentGoalbyStuId(stuId, stuGoalId){
    return fetch(`${config.API_ENDPOINT}/studentgoals/student/${stuId}/${stuGoalId}`, {
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
  getStudentGoals(student_id) {
    console.log('get student goals run')
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
  getCurrentStudentGoal(student_id) {
    console.log('get student goals run')
    return fetch(`${config.API_ENDPOINT}/goals/student/current/${student_id}`, {
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
  },
  patchGoal(goal_id, data){
    return fetch(`${config.API_ENDPOINT}/goals/goal/${goal_id}`, {
      method: 'PATCH',
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
  },
  patchStudentGoal(student_goal_id, data){
    return fetch(`${config.API_ENDPOINT}/studentgoals/learning_target/${student_goal_id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`, 
      },
      body: JSON.stringify(data)
    }).then(res => 
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res
    )
  },
  patchSubGoal(id, data){
    return fetch(`${config.API_ENDPOINT}/studentgoals/subgoal/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`, 
      },
      body: JSON.stringify(data)
    }).then(res => 
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res
    )
  },
  patchStudentResponse(student_goal_id, data){
    return fetch(`${config.API_ENDPOINT}/studentgoals/learning_target/${student_goal_id}`, {
      method: 'PATCH',
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
      : res
    )
  }
}

export default StudentAuthApiService