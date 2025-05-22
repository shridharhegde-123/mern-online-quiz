//import logo from "./logo.svg";
import "./App.css";
import { Homepage } from "./Components/Homepage.jsx";
import { Footer } from "./Components/Footer/Footer.jsx";
import { NewQuizPage } from "./Pages/NewQuizPage.jsx";
import { Login } from "./Components/auth/Login.jsx";
import { Register } from "./Components/auth/Register.jsx";
import { Route, Routes } from "react-router-dom";
import { Admin } from "./Components/Admin/Admin.jsx";
import  QuizForm from "./Components/Admin/QuizForm.jsx";
import { CategorySelectionPage } from "./Pages/CategorySelectionPage.jsx";
import {CategoryPage} from "./Pages/CategoryPage.jsx";
import {Quizes} from "./Pages/Quizes.jsx";
import QuizResults from "./Pages/QuizResults.jsx";
import Leaderboard from "./Pages/Leaderboard.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import { EditQuiz } from "./Components/Admin/EditQuiz.jsx";

import { ProfileMain } from "./Components/Profile/ProfileMain.jsx";
//import { Quizes } from "./Components/QuizNew/Quizes.jsx";
import { Navbarnew } from "./Components/Navbar/Navbarnew.jsx";
import { Resultshow } from "./Pages/Resultshow.jsx";
import { ShowAllAnswers } from "./Pages/ShowAllAnswers.jsx";

function App() {
  return (
    <div className="App ">
      <Navbarnew />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/HTML" element={<NewQuizPage />} />
        <Route path="/CSS" element={<NewQuizPage />} />
        <Route path="/Javascript" element={<NewQuizPage />} />
        <Route path="/React" element={<NewQuizPage />} />
        {/*<Route path="/quiz/:id" element={<Quizes />} /> */}
        <Route path="/Mongodb" element={<NewQuizPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/addquiz" element={<QuizForm />} />


        <Route path="/profile" element={<ProfileMain />} />
        
        <Route path="/result" element={<Resultshow />} />
        <Route path="/showallanswer" element={<ShowAllAnswers />} />
        <Route path="/categories" element={<ProtectedRoute><CategorySelectionPage /></ProtectedRoute>} />
        <Route path="/category/:category" element={<ProtectedRoute><CategoryPage /></ProtectedRoute>} />
        <Route path="/quiz/:id" element={<ProtectedRoute><Quizes /></ProtectedRoute>} />
        <Route path="/quiz-results" element={<ProtectedRoute><QuizResults /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/edit-quiz" element={<EditQuiz/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
