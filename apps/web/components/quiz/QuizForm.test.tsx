import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuizForm from './QuizForm';
import { Question } from '@/types/quiz.types';

// Mock les composants enfants
jest.mock('./QuestionForm', () => {
    return function MockQuestionForm({ question, onSubmit }: any) {
        return (
            <div data-testid="question-form">
                <h2>{question.text}</h2>
                <button onClick={() => onSubmit([0])}>Select Answer</button>
            </div>
        );
    };
});

jest.mock('./QuizProgress', () => {
    return function MockQuizProgress({ current, total }: any) {
        return <div data-testid="quiz-progress">Progress: {current}/{total}</div>;
    };
});

describe('QuizForm Component', () => {
    const mockQuestions: Question[] = [
        {
            _id: '1',
            quizId: 'quiz1',
            text: 'Question 1?',
            type: 'multiple_choice',
            options: [
                { id: 0, text: 'A' },
                { id: 1, text: 'B' },
            ],
            points: 10,
            correctAnswers: [0],
        },
        {
            _id: '2',
            quizId: 'quiz1',
            text: 'Question 2?',
            type: 'true_false',
            options: [
                { id: 0, text: 'Vrai' },
                { id: 1, text: 'Faux' },
            ],
            points: 10,
            correctAnswers: [0],
        },
    ];

    const mockOnSubmit = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('devrait afficher le formulaire quiz', () => {
        render(
            <QuizForm
                questions={mockQuestions}
                attemptId="attempt1"
                onSubmit={mockOnSubmit}
            />
        );

        expect(screen.getByTestId('quiz-progress')).toBeInTheDocument();
        expect(screen.getByText('Question 1?')).toBeInTheDocument();
    });

    test('devrait naviguer vers la prochaine question', async () => {
        render(
            <QuizForm
                questions={mockQuestions}
                attemptId="attempt1"
                onSubmit={mockOnSubmit}
            />
        );

        const nextButton = screen.getByText(/Suivant/i);
        fireEvent.click(nextButton);

        await waitFor(() => {
            expect(screen.getByText('Question 2?')).toBeInTheDocument();
        });
    });

    test('devrait naviguer vers la question précédente', async () => {
        render(
            <QuizForm
                questions={mockQuestions}
                attemptId="attempt1"
                onSubmit={mockOnSubmit}
            />
        );

        // Aller à la prochaine
        fireEvent.click(screen.getByText(/Suivant/i));

        // Revenir à la précédente
        const prevButton = screen.getByText(/Précédent/i);
        fireEvent.click(prevButton);

        await waitFor(() => {
            expect(screen.getByText('Question 1?')).toBeInTheDocument();
        });
    });

    test('bouton Précédent devrait être disabled à la première question', () => {
        render(
            <QuizForm
                questions={mockQuestions}
                attemptId="attempt1"
                onSubmit={mockOnSubmit}
            />
        );

        const prevButton = screen.getByText(/Précédent/i);
        expect(prevButton).toBeDisabled();
    });

    test('devrait montrer le bouton Soumettre à la dernière question', async () => {
        render(
            <QuizForm
                questions={mockQuestions}
                attemptId="attempt1"
                onSubmit={mockOnSubmit}
            />
        );

        // Aller à la dernière question
        fireEvent.click(screen.getByText(/Suivant/i));

        await waitFor(() => {
            expect(screen.getByText(/Soumettre/i)).toBeInTheDocument();
        });
    });
});
