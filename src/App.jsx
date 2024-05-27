import { React } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { Home, Error, Review, SingIn, Register, Account, AddPost} from './pages/import';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
          <Route path='/' element={<Home/>}></Route>
          <Route path='*' element={<Error/>}></Route>
          <Route path='/review/:postId' element={<Review/>}></Route>
          <Route path='/singIn' element={<SingIn/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/account/:accountId' element={<Account/>}></Route>
          <Route path='/account/:accountId/addPost' element={<AddPost/>}></Route>
      </Route>
    </Routes>
  );
}

export default App;