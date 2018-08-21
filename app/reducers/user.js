import axios from 'axios'
import history from '../history'

/*ACTION TYPES*/
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/*ACTION CREATORS*/
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/*INITIAL STATE*/
const defaultUser = {}

/*THUNK CREATORS*/
export const me = () => async dispatch => {
  try {
    const {data} = await axios.get('/auth/me')
    dispatch(getUser(data || defaultUser))
  } catch (err) {
    console.log(err)
  }
}

//For login and signup
export const auth = (email, password, method) =>
  async dispatch => {
    try {
      const {data} = await axios.post(`/auth/${method}`, { email, password })
      if (!data.id) {
        return data
      } else {
        dispatch(getUser(data));
        history.push('/learn')
      }
    } catch (err) {
      console.log(err)
    }
  }

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.log(err)
  }
}

export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
