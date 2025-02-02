import React, { createContext, useContext, useReducer } from 'react'

export const StateProviderContext = createContext()

export const StateProvider = ({ initialState, reducer, children }) => {
   return  <StateProviderContext.Provider value={useReducer(reducer, initialState)}>{children}</StateProviderContext.Provider>
}

export const useStateProviderValue = () => useContext(StateProviderContext)