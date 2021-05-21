/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useState, useReducer } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/outline';
import { useStep } from 'react-hooks-helper';

export default function Example() {
  const [state, dispatch] = useReducer(reducer, []);
  const questions = ['heello'];
  const [open, setOpen] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const {
    index,
    navigation: { previous, next },
  } = useStep({ steps: 3 });
  // const nextQuestion = () => {
  //   setCurrentQuestion(currentQuestion)
  // }

  // return (
  //         <div>
  //         <div>{index}</div>
  //         <button disabled={index === 0} onClick={previous}>
  //           Previous
  //         </button>
  //         <button disabled={index === 2} onClick={next}>
  //           Next
  //         </button>
  //       </div>
  // )

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={open}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6 h-screen">
              <div>
                <div>ESKWELABS</div>
                <div>DATA LEADERSHIP</div>
              </div>
              <div className="h-full grid place-items-center">
                <div>
                <InnerForm dispatch={dispatch} index={index} previous={previous} next={next} />
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function reducer(state, action) {
  const { payload } = action;
  switch (action.type) {
    case 'ADD_ANSWER':
      return [...state, payload];
    default:
      throw new Error();
  }
}

const InnerForm = (index, dispatch, previous, next) => {
  switch (index) {
    case 1:
      return <QuestionOne dispatch={dispatch} previous={previous} next={next}/>
    default:
      return <QuestionOne dispatch={dispatch} previous={previous} next={next}/>
  }
};

const QuestionOne = ({dispatch, previous, next }) => {

  const [answer, setAnswer] = useState()

  const handleClick = () =>{
    dispatch({type: 'ADD_ANSWER', answer})
  next()
  }

  return (
    <>
      <div className="text-center">
        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
          Question 1
        </Dialog.Title>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            <Input value={answer} onChange={e=>setAnswer(e.target.value)}/>
          </p>
        </div>
      </div>
      <div className="mt-5 sm:mt-6" />
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
        onClick={previous}
      >
        Previous
      </button>
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
        onClick={() => handleClick()}
      >
        Next
      </button>
    </>
  );
};

