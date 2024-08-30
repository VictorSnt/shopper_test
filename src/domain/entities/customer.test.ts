import { expect, it } from 'vitest';
import { Customer } from './customer';
import { validate as validateUUID } from 'uuid';


it('Create a customer', () => {

    const customer =  new Customer('Client one');
    expect(customer).toBeInstanceOf(Customer);
    expect(validateUUID(customer.id)).toBeTruthy();
    expect(customer.name).toEqual('CLIENT ONE');
    expect(customer.created_at).toBeInstanceOf(Date);
});


it('Fail to create a customer with 4 chars name', () => {
    expect(() => {
        new Customer('test');
    }).toThrow();
});