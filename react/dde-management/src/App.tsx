import React from "react"
import { BrowserRouter } from 'react-router-dom'
import Router from '@/routes'
import { QueryClientProvider, QueryClient } from 'react-query'

const queryClient = new QueryClient()

function App() {
  // if (!sessionStorage.getItem('auth-token')) {
  //   sessionStorage.setItem("auth-token", "eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNzFZUXdhNlpRbDI1V1dTSVIyQUdscVZuWmlLTG9WLWN4X0U4ZlZsNDJrNTRMR01wemFqV1pxLVN0ZmZFRHFjZWxoM290VVFOY1BMQkxlYk90cVVlY0NkLTNDSlYtRXp6NCIsImlhdCI6MTY2MTk1NDM5MCwiZXhwIjoxNjY0NTQ2MzkwfQ.aOHLKAFOJ89WcfV28pJnwFvQUcNY5wr2VEo-7ks65tkK9OJDiXn1kdD7rNn2D9mM")
  // }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router></Router>
      </BrowserRouter>

    </QueryClientProvider>
  )
}

export default App
