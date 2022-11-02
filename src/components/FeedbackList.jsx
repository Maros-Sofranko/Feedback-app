import React from 'react';
import { useContext } from 'react';
import FeedbackItem from './FeedbackItem';
import { motion, AnimatePresence } from "framer-motion";
import FeedbackContext from '../context/FeedbackContext';

function FeedbackList() {
  const { feedback } = useContext(FeedbackContext);

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

  if (!feedback || feedback.length === 0) {
    return (
      <p>No Feedback Yet</p>
    )
  }

  return (
    <div className='feedback-list'>
      <AnimatePresence>
        {feedbacks}
      </AnimatePresence>

    </div>
  )
}

export default FeedbackList;
