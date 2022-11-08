import { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [feedback, setFeedback] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    useEffect(() => {
        fetchFeedback();
    }, [])

    const fetchFeedback = async () => {
        const response = await fetch("/feedback?_sort=id&_order=desc");
        
        const data = await response.json();
        setFeedback(data);
        setIsLoading(false);
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
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                await fetch(`/feedback/${id}`, {method: "DELETE"});
                                
                setFeedback(feedback.filter((item) => item.id !== id));
            }
        })
    }

    const addFeedback = async (newFeedback) => {
        const response = await fetch("/feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFeedback)
        })

        const data = await response.json();

        setFeedback([data, ...feedback]);
    }

    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    const updateFeedback = async (id, updItem) => {
        const response = await fetch(`/feedback/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updItem)
        })

        const data = await response.json();
        setFeedback(feedback.map((item) => (item.id === id ? { ...item, ...data } : item)))
    }

    return <FeedbackContext.Provider
        value={{
            feedback: feedback,
            feedbackEdit: feedbackEdit,
            isLoading: isLoading,
            deleteFeedback: deleteFeedback,
            addFeedback: addFeedback,
            editFeedback: editFeedback,
            updateFeedback: updateFeedback
        }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;
