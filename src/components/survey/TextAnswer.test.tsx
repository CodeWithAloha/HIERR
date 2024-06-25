import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import TextAnswer from "./textAnswers";
import type { TextAnswerProps } from "./textAnswers";
import { describe, it, expect, vi } from "vitest";

//! Ensure default rendering of the input area

describe("TextAnswers component", () => {
  it("renders the input field correctly", () => {
    const props: TextAnswerProps = {
      updateCurrentAnswer: vi.fn(),
      setDisabled: vi.fn(),
      answers: [{ id: "1", answer: "test" }],
    };

    const { asFragment } = render(<TextAnswer {...props} />);
    const inputElement = screen.getByLabelText(/textQuestion/i);
    expect(inputElement).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  //! Calling Functions

  it("calls updateCurrentAnswer and setDisabled on input change", () => {
    const updateCurrentAnswer = vi.fn();
    const setDisabled = vi.fn();
    const props: TextAnswerProps = {
      updateCurrentAnswer,
      setDisabled,
      answers: [{ id: "1", answer: "test" }],
    };

    render(<TextAnswer {...props} />);
    const inputElement = screen.getByLabelText(/textQuestion/i);

    fireEvent.change(inputElement, { target: { value: "new answer" } });

    expect(updateCurrentAnswer).toHaveBeenCalledWith({
      id: "1",
      val: "new answer",
    });
    expect(setDisabled).toHaveBeenCalledWith(false);
  });

  it("does not call updateCurrentAnswer or setDisabled if answers array is empty", () => {
    const updateCurrentAnswer = vi.fn();
    const setDisabled = vi.fn();
    const props: TextAnswerProps = {
      updateCurrentAnswer,
      setDisabled,
      answers: [], // no answer exists to be updated with the value entered inside the input
    };

    render(<TextAnswer {...props} />);
    const inputElement = screen.getByRole("textbox", { name: /textQuestion/i });

    fireEvent.change(inputElement, { target: { value: "new answer" } });

    expect(updateCurrentAnswer).not.toHaveBeenCalled();
    expect(setDisabled).not.toHaveBeenCalled();
  });

  //! Number Prop Pattern & Checker

  it("applies the correct pattern and title when number prop is true", () => {
    const props: TextAnswerProps = {
      updateCurrentAnswer: vi.fn(),
      setDisabled: vi.fn(),
      answers: [{ id: "1", answer: "test" }],
      number: true, // if number is True, then this input can only have a number
    };

    render(<TextAnswer {...props} />);
    const inputElement = screen.getByRole("textbox", { name: /textQuestion/i });

    expect(inputElement).toHaveAttribute(
      "pattern",
      "^1?[0-9]{1,2}$1[0-9][0-9]"
    );
    expect(inputElement).toHaveAttribute("title", "Please enter a number.");
  });

  it("does not apply pattern and title when number prop is false", () => {
    const props: TextAnswerProps = {
      updateCurrentAnswer: vi.fn(),
      setDisabled: vi.fn(),
      answers: [{ id: "1", answer: "test" }],
      number: false, // making it clear that number set to false should not require number regex
    };

    render(<TextAnswer {...props} />);
    const inputElement = screen.getByRole("textbox", { name: /textQuestion/i });

    expect(inputElement).toHaveAttribute("pattern", ""); // pattern should be blank / not enforced
    expect(inputElement).toHaveAttribute("title", ""); // title should be blank / not displayed to user
  });
});
