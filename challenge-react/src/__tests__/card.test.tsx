import React from 'react';
import { shallow } from 'enzyme';
import Card, { CardProps } from 'components/Card';
import Button from 'components/Button';

const defaultValues: CardProps = {
  item: {
    id: 1,
    name: 'Baan Kru Noi',
    image: 'baan-kru-noi.jpg',
    currency: 'THB',
  },
  showOverlay: false,
  handleDonate: (_id: number) => ({}),
  handlePay: () => ({}),
  procceccing: false,
};

const makeComponent = (args: Partial<CardProps> = {}) => (
  <Card {...Object.assign({}, defaultValues, args)} />
);

describe('When showOverlay is false', () => {
  it('should be overlay not displayed', () => {
    const wrappper = shallow(makeComponent({}));
    expect(wrappper.dive().exists('.payment-submit')).toBeFalsy();
  });

  it('should be passed correct id when "donate" clicked', () => {
    const mockHandleDonate = jest.fn();
    const wrappper = shallow(makeComponent({ handleDonate: mockHandleDonate }));
    wrappper.dive().find(Button).simulate('click');
    expect(mockHandleDonate.mock.calls[0][0]).toEqual(defaultValues.item.id);
  });
});

describe('When showOverlay is true', () => {
  it('should be overlay displayed', () => {
    const wrappper = shallow(makeComponent({ showOverlay: true }));
    expect(wrappper.dive().exists('.payment-submit')).toBeTruthy();
  });

  it('should be send correct amount with default value(10)', () => {
    const mockHandlePay = jest.fn();
    const wrappper = shallow(
      makeComponent({ showOverlay: true, handlePay: mockHandlePay })
    );
    wrappper.dive().find('.payment-submit').simulate('click');
    expect(mockHandlePay.mock.calls[0][1]).toEqual(10);
  });

  it('should be send correct amount with selected value(50)', () => {
    const mockHandlePay = jest.fn();
    const wrappper = shallow(
      makeComponent({ showOverlay: true, handlePay: mockHandlePay })
    );
    wrappper.dive().find('input[type="radio"]').at(2).simulate('change'),
      { target: { checked: true } };
    wrappper.dive().find('.payment-submit').simulate('click');
    expect(mockHandlePay.mock.calls[0][1]).toEqual(50);
  });
});
