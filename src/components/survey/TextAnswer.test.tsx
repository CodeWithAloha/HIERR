// import React from 'react'; 
// import "@testing-library/jest-dom";
// import { render, screen, fireEvent } from "@testing-library/react";
// import TextAnswer, { TextAnswerProps } from "./textAnswers";
// import { describe, it, expect, vi } from 'vitest';

// describe("TextAnswers component", () => {
//   it("renders the input field", () => {
//     const props: TextAnswerProps = {
//       updateCurrentAnswer: vi.fn(),
//       setDisabled: vi.fn(),
//       answers: [{ id: "1", answer: "test" }],
//     };

//     render(<TextAnswer {...props} />);
//     const inputElement = screen.getByLabelText(/textQuestion/i); // attaches to aria-label
//     expect(inputElement).toBeInTheDocument();
//   });

//   it("calls updateCurrentAnswer and setDisabled on input change", () => {
//     const updateCurrentAnswer = vi.fn();
//     const setDisabled = vi.fn();
//     const props: TextAnswerProps = {
//       updateCurrentAnswer,
//       setDisabled,
//       answers: [{ id: "1", answer: "test" }]
//     };

//     render(<TextAnswer {...props} />);
//     const inputElement = screen.getByLabelText(/textQuestion/i);

//     fireEvent.change(inputElement, { target: { value: "new answer" } });

//     expect(updateCurrentAnswer).toHaveBeenCalledWith({ id: "1", val: "new answer" });
//     expect(setDisabled).toHaveBeenCalledWith(false);
//   });

//   //! does not call updateCurrentAnswer or setDisabled if answers array is empty


//   //! applies the correct pattern and title when number prop is true


//   //! does not apply pattern and title when number prop is false

// });