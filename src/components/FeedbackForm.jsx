import React, { useContext, useState, useEffect } from 'react';
import Button from './shared/Button';
import Card from './shared/Card';
import RatingSelect from './RatingSelect';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackForm() {
    const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext);

    const [text, setText] = useState("");
    const [message, setMessage] = useState("");
    const [btnDisable, setBtnDisable] = useState(true);
    const [rating, setRating] = useState(10);

    useEffect(() => {
        if (feedbackEdit.edit === true) {
            setBtnDisable(false);
            setText(feedbackEdit.item.text);
            setRating(feedbackEdit.item.rating);
        }
    }, [feedbackEdit])

    const handleTextChange = (event) => {
        if (event.target.value === "") {
            setMessage(null)
            setBtnDisable(true)
        } else if (event.target.value !== null && event.target.value.trim().length <= 10) {
            setMessage("Text must be at least 10 charaters!")
            setBtnDisable(true)
        } else {
            setMessage(null)
            setBtnDisable(false)
        }
        setText(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newFeedback = {
            text,
            rating
        }

        if (feedbackEdit.edit === true) {
            updateFeedback(feedbackEdit.item.id, newFeedback);
        } else {
            addFeedback(newFeedback);
        }
        setText("");
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>How would you rate your service with us?</h2>
                <RatingSelect select={(rating) => setRating(rating)} />
                <div className='input-group'>
                    <input onChange={handleTextChange} type="text" value={text} placeholder='Write your review' />
                    <Button type="submit" isDisabled={btnDisable} >Send</Button>
                </div>
                {message && <div className='message'>{message}</div>}
            </form>
        </Card>
    )
}

export default FeedbackForm;
