import React from 'react';
import { useContext } from 'react';
import FeedbackItem from './FeedbackItem';
import { motion, AnimatePresence } from "framer-motion";
import FeedbackContext from '../context/FeedbackContext';
import Spinner from "./shared/Spinner";

function FeedbackList() {
  const { feedback, isLoading } = useContext(FeedbackContext);

  const feedbacks = feedback.map((item) => {
    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
        <FeedbackItem key={item.id} item={item} />
      </motion.div>
    )
  })

    if (!isLoading && (!feedback || feedback.length === 0)) {
    return (
      <p>No Feedback Yet</p>
    )
  }

  return isLoading ? <Spinner /> : (
    <div className='feedback-list'>
      <AnimatePresence>
        {feedbacks}
      </AnimatePresence>
    </div>
  )
}

export default FeedbackList;
