// Write your tests here
import AppClass from './AppClass';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from "react";
test('loads webpage', () => {
  render(<AppClass />);
})
test('left appears', () => {
  render(<AppClass />);
  //left
  const left = screen.getByText('LEFT');
  expect(left).toBeInTheDocument();
})
test('right appears', () => {
  render(<AppClass />);
  //right
  const right = screen.getByText('RIGHT');
  expect(right).toBeInTheDocument();
})
test('up appears', () => {
  render(<AppClass />);
  const up = screen.getByText('UP');
  expect(up).toBeInTheDocument();
})
test('down appears', () => {
  render(<AppClass />);
  const down = screen.getByText('DOWN');
  expect(down).toBeInTheDocument();
})

