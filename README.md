# devTinder Frontend

- Create Vite + React Project
- Remove unncessary code
- Initialize git repo
- Install Tailwind for CSS
- Install Daisy UI for UI components
- Add Navbar.jsx from daisy UI
- Install React Router Dom for routing
- Setup Routing
- Use nested routing and render different components using <Outlet/>
- Create Footer.jsx
- Install Axios for making API Calls

### Routing 
- In App.jsx : 
```
function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body/>}>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
```
- In Body.jsx : 
```
const Body = () => {
  return (
    <>
     <NavBar/>
     <Outlet/> 
     <Footer/>
    </>
  )
}
```

### Backend : Fixing CORS
- Install Cors in backend
- In Backend => use cors middleware with `origin set up` and `credentials = true`

```
app.use(
  cors(
    {
      origin: "http://localhost:5173",
      credentials: true,
    }
  )
);
```
### Frontend : Fixing CORS
- In Frontend while making the API call pass `withCredentials = true`
```
const res = axios.post(
  "http://localhost:3000/login",
  {
    email,
    password,
  },
  { withCredentials: true }
);
```
