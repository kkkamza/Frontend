import axios from "axios"

const BASE_URL = "http://13.60.210.231:8080"

const initInstance = (config) => {
  const instance = axios.create({
    timeout: 3000,
    ...config,
    headers: {
      "Content-Type": "application/json",
      "Cross-Control-Allow-Origin": "*",
    },
  })

  return instance
}

export const fetchInstance = (baseURL = BASE_URL) => {
  return initInstance({
    baseURL,
  })
}

export const fetchWithAuth = (baseURL = BASE_URL) => {
  return initInstance({
    baseURL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
}
