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
- Install Redux/toolkit and react-redux
- Setup redux store -> appStore.js
- Provide our Store to the App.jsx
- Create userSlice
- Export userSlice and reducer methods
- Add userReducer (userSlice) to store
- Create Login.jsx
- Perform POST API call on "/login"
- Upon Login add user to store using `useDispatch`
- Update the NavBar.jsx according to user data using `useSelector`
- Redirect user to "/" or render Feed.jsx using `useNavigate`
- Redirect to /login if token is not present
- If token is valid then fetch data by calling /profile/view API and put it in store if page reloads.
- No API calls when user is already Login and pages are switched without reload
- Build switch to profile and home page feature
- Built Logout feature
- Build feedSlice and feedReducer
- Add feedSlice to the store
- Build feed feature
- Build Edit Profile feature
- Created connectionSlice and connectionReducer
- Build connections feature
- Created requestSlice and requestReducer
- Build requests feature

### Routing 
- In App.jsx : 
```
function App() {
  return (
    <>
      <BrowserRouter basename="/">
       <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed/>}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
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

### Setup : Redux Store
- Setup redux store -> appStore.js
```
import { configureStore } from "@reduxjs/toolkit";

const appStore = configureStore({
  reducer: {
  },
});

export default appStore; 
```
- Provide our Store to the App.jsx
```
 <Provider store={appStore}>
  <BrowserRouter basename="/">
    ...
  </BrowserRouter>
</Provider>
```
- Create userSlice
- Export userSlice and reducer methods
```
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: (state, action) => {
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
```
- Add userReducer (userSlice) to store
```
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer
  },
});

export default appStore; 
```

### Adding user to Redux Store
```
const dispatch = useDispatch();
```
- inside API :
```
dispatch(addUser(res.data));
```

### Updating User details in UI by taking user from store
```
const user = useSelector((store) => store.user);

{user && <p>Welcome {user?.firstName}</p>}
```

### Redirecting User to different Route 
```
const navigate = useNavigate();
```
- inside API :
```
return navigate("/")
```

### Performing API call using axios
```
const res = await axios.post(
    BASE_URL + "/login",
    {
      email,
      password,
    },
    { withCredentials: true }
  );
dispatch(addUser(res.data)); // putting user in store
return navigate("/"); // redirecting user to other route
```
