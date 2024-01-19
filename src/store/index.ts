// @ts-nocheck
import { createStore } from 'vuex'
import { gql, ApolloClient, ApolloLink, InMemoryCache, HttpLink } from '@apollo/client/core'

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('authToken')

  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  })

  return forward(operation)
})

const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql' })

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default createStore({
  state: {
    user: null, // Stores the user object
    travels: [], // Stores a list of travels
    tours: [] // Stores a list of tours
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setTravels(state, travels) {
      state.travels = travels
    },
    setTotalTravels(state, total) {
      state.totalTravels = total
    },
    setTours(state, tours) {
      state.tours = tours
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const query = gql`
          mutation Login($username: String!, $password: String!) {
            login(loginUserInput: { username: $username, password: $password }) {
              token
              user {
                username
                roleId
                role {
                  name
                  id
                }
              }
            }
          }
        `

        const response = await apolloClient.mutate({
          mutation: query,
          variables: {
            username: credentials.username,
            password: credentials.password
          }
        })

        const { token, user } = response.data.login
        localStorage.setItem('authToken', token)
        localStorage.setItem('userData', JSON.stringify(user))
        commit('setUser', user)
        return user
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    },
    async fetchTravels({ commit }, { page, limit } = { page: 0, limit: 10 }) {
      try {
        const query = gql`
          query GetAllTravels($page: Int, $limit: Int) {
            getAllTravels(page: $page, limit: $limit) {
              travels {
                id
                name
                isPublic
                slug
                description
                numberOfDays
                img
                moods {
                  nature
                  relax
                  history
                  culture
                  party
                }
                tours {
                  id
                  name
                  startingDate
                  endingDate
                  price
                }
              }
              total
              page
              limit
            }
          }
        `

        const response = await apolloClient.query({ query, variables: { page, limit } })
        commit('setTravels', response.data.getAllTravels.travels)
        commit('setTotalTravels', response.data.getAllTravels.total)
        commit('setTours', response.data.getAllTravels.travels.map((travel) => travel.tours).flat())
      } catch (error) {
        console.error('Error fetching travels:', error)
        throw error
      }
    },
    async fetchTours({ commit }, { page = 0, limit = 10 }) {
      try {
        const query = gql`
          query {
            getAllTours {
              id
              travelId
              travel {
                id
              }
            }
          }
        `

        const response = await apolloClient.query({ query, variables: { page, limit } })
        commit('setTours', response.data.getAllTours)
      } catch (error) {
        console.error('Error fetching tours:', error)
        throw error
      }
    },
    async fetchToursForTravel({ commit }, { travelId, page = 0, limit = 10 }) {
      try {
        const query = gql`
          query {
            getAllToursForTravel(id: "${travelId}") {
              id
              name
              startingDate
              endingDate
              price
              travelId
            }
          }
        `

        const response = await apolloClient.query({ query, variables: { page, limit } })
        commit('setTours', response.data.getAllToursForTravel)
      } catch (error) {
        console.error('Error fetching tours:', error)
        throw error
      }
    },
    async fetchTour({ commit }, tourId) {
      try {
        const query = gql`
          query {
            getTourById(id: "${tourId}") {
              id
              name
              startingDate
              endingDate
              price
              travelId
            }
          }
        `

        const response = await apolloClient.query({ query })
        commit('setTours', [...this.state.tours, response.data.getTourById])
      } catch (error) {
        console.error('Error fetching tour:', error)
        throw error
      }
    },
    checkTokenValidity({ commit }) {
      const token = localStorage.getItem('authToken')
      if (!token) {
        commit('setUser', null)
        return false
      }
      const userData = JSON.parse(localStorage.getItem('userData'))
      commit('setUser', userData)

      return true
    },
    async createUser(_ , createUserData) {
      try {
        const query = gql`
          mutation CreateUser($createUserData: CreateUserInput!) {
            createUser(createUserData: $createUserData) {
              id
              username
              displayName
              role {
                name
              }
            }
          }
        `

        await apolloClient.mutate({
          mutation: query,
          variables: {
            createUserData
          }
        })
      } catch (error) {
        console.error('Error creating user:', error)
      }
    },
    async createTravel({ commit }, createTravelData) {
      try {
        const query = gql`
          mutation CreateTravel($createTravelData: CreateTravelInput!) {
            createTravel(createTravelData: $createTravelData) {
              id
              name
              isPublic
              slug
              description
              numberOfDays
              img
              moods {
                nature
                relax
                history
                culture
                party
              }
              tours {
                id
                name
                startingDate
                endingDate
                price
              }
            }
          }
        `

        const response = await apolloClient.mutate({
          mutation: query,
          variables: {
            createTravelData
          }
        })
        commit('setTravels', [...this.state.travels, response.data.createTravel])
        return response.data.createTravel
      } catch (error) {
        console.error('Error creating travel:', error)
      }
    },
    async createTour({ commit }, createTourData) {
      try {
        const query = gql`
          mutation createTour($createTourData: CreateTourInput!) {
            createTour(createTourData: $createTourData) {
              id
              name
              startingDate
              endingDate
              price
              travelId
            }
          }
        `

        const response = await apolloClient.mutate({
          mutation: query,
          variables: {
            createTourData
          }
        })
        commit('setTours', [...this.state.tours, response.data.createTour])
      } catch (error) {
        console.error('Error creating tour:', error)
      }
    },
    async updateTravel({ commit }, updateTravelData) {
      try {
        const query = gql`
          mutation UpdateTravel($updateTravelData: UpdateTravelInput!) {
            updateTravel(updateTravelData: $updateTravelData) {
              id
              name
              isPublic
              slug
              description
              numberOfDays
              img
              moods {
                nature
                relax
                history
                culture
                party
              }
              tours {
                id
                name
                startingDate
                endingDate
                price
              }
            }
          }
        `

        const response = await apolloClient.mutate({
          mutation: query,
          variables: {
            updateTravelData
          }
        })
        commit('setTravels', [
          ...this.state.travels.filter((travel) => travel.id !== response.data.updateTravel.id),
          response.data.updateTravel
        ])
      } catch (error) {
        console.error('Error creating travel:', error)
      }
    },
    async updateTour({ commit }, updateTourData) {
      try {
        const query = gql`
          mutation updateTour($updateTourData: UpdateTourInput!) {
            updateTour(updateTourData: $updateTourData) {
              id
              name
              startingDate
              endingDate
              price
              travelId
            }
          }
        `

        const response = await apolloClient.mutate({
          mutation: query,
          variables: {
            updateTourData
          }
        })
        commit('setTours', [
          ...this.state.tours.filter((tour) => tour.id !== response.data.updateTour.id),
          response.data.updateTour
        ])
      } catch (error) {
        console.error('Error creating user:', error)
      }
    },
    async deleteTravel({ commit }, travelId) {
      try {
        const query = gql`
          mutation DeleteTravel($travelId: String!) {
            deleteTravel(id: $travelId) {
              id
            }
          }
        `
        await apolloClient.mutate({
          mutation: query,
          variables: {
            travelId
          }
        })

        commit(
          'setTravels',
          this.state.travels.filter((travel) => travel.id !== travelId)
        )
      } catch (error) {
        console.error('Error deleting travel:', error)
      }
    },
    async deleteTour({ commit }, { tourId }) {
      try {
        const query = gql`
          mutation DeleteTour($tourId: String!) {
            deleteTour(id: $tourId) {
              id
            }
          }
        `
        await apolloClient.mutate({
          mutation: query,
          variables: {
            tourId
          }
        })
        commit(
          'setTours',
          this.state.tours.filter((tour) => tour.id !== tourId)
        )
      } catch (error) {
        console.error('Error deleting tour:', error)
      }
    },
    logout({ commit }) {
      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')
      commit('setUser', null)
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.user && !!state.user.username,
    name: (state) => state.user?.displayName || state.user?.username,
    isAdmin: (state) => state.user?.role.name === 'admin',
    isEditor: (state) => state.user?.role.name === 'editor',
    findTourById: (state) => (tourId) => {
      const tour = state.tours.find((tour) => tour.id === tourId)
      return tour || null
    },
    findTravelById: (state) => (travelId) => {
      const travel = state.travels.find((travel) => travel.id === travelId)
      return travel || null
    },
    totalNumberOfTravels: (state) => state.totalTravels,
    totalNumberOfTourForTravel: (state) => (travelId) => {
      const travel = state.travels.find((travel) => travel.id === travelId)
      return travel.tours.length
    },
    tourForTravel: (state) => (travelId) => {
      const travel = state.travels.find((travel) => travel.id === travelId)
      return travel.tours
    }
  }
})
