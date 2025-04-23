'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  it('should fill up to a full tank if amount is not specified', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10);
    expect(customer.vehicle.fuelRemains).toBe(50);
  });

  it('should not exceed max tank capacity', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 48,
      },
    };

    fillTank(customer, 10, 10);
    expect(customer.vehicle.fuelRemains).toBe(50);
  });

  it("should not exceed customer's money", () => {
    const customer = {
      money: 20,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10, 5); // 5L * 10 = 50 > 20, so should only fill 2L
    expect(customer.vehicle.fuelRemains).toBe(12);
  });

  it('should round down amount to 0.1L', () => {
    const customer = {
      money: 200,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 1, 5.567); // 5.567 → 5.5
    expect(customer.vehicle.fuelRemains).toBe(15.5);
  });

  it('should not fill if less than 2L can be afforded', () => {
    const customer = {
      money: 5,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 3); // 5 / 3 ≈ 1.66 < 2
    expect(customer.vehicle.fuelRemains).toBe(10);
  });

  it('should round the price to two decimal places', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 19.99, 5); // 5 * 19.99 = 99.95
    expect(customer.money).toBeCloseTo(0.05, 2);
  });
});
