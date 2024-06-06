import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextAnswer, { TextAnswerProps } from "./textAnswers";
import { describe, it, expect, vi } from 'vitest'

// passing in the properties
describe("TextAnswers component",() => {
    it("renders the input field", () => {
        const props: TextAnswerProps = {
            updateCurrentAnswer: vi.fn(),
            setDisabled: vi.fn(),
            answers: [{ id: "1", answer: "test"}],
        }

        render(<TextAnswer {...props} />)
        const inputElement = screen.getByRole("textbox", {name: /textQuestion/i})
        expect(inputElement).toBeInTheDocument();
    })

    it("calls updateCurrentAnswer and setDisabled on input change", () => {
        // const update
    })









})