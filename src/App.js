import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { useState } from "react";
import FeedbackData from "./data/FeedbackData";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import Swal from "sweetalert2";
import FeedbackForm from "./components/FeedbackForm";
import AboutPage from "./pages/AboutPage";
import AboutIconLink from "./components/AboutIconLink";

function App(props) {

    const [feedback, setFeedback] = useState(FeedbackData);
    /* 
        const deleteFeedback = (id) => {
            if (window.confirm("Are you sure you want to delete this feedback?")) {
                setFeedback(feedback.filter((item) => item.id !== id))
            }
        } */

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4();
        setFeedback([newFeedback, ...feedback]);
    }

    const deleteFeedback = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                setFeedback(feedback.filter((item) => item.id !== id));
            }
        })
    }

    return (
        <Router>
            <Header />
            <div className="container">
                <Routes>
                    <Route exact path="/" element={
                        <>
                            <FeedbackForm handleAdd={addFeedback} />
                            <FeedbackStats feedback={feedback} />
                            <FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
                        </>
                    } />
                    <Route path="/about" element={<AboutPage />} />
                </Routes>
                <AboutIconLink />
            </div>
        </Router>
    )
}

export default App;