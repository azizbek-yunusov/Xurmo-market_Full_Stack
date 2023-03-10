import React from 'react';

function Stepper(props) {
  const { currentStep, steps } = props;

  return (
    <div className="flex items-center justify-center">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`w-8 h-8 flex items-center justify-center rounded-full ${
            index < currentStep
              ? 'bg-green-500 text-white'
              : 'bg-gray-400 text-gray-800'
          }`}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
}

export default Stepper;
