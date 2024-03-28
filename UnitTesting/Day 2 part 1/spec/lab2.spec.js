const User = require("../lab2");


describe('test user obj', () => {
  let user;

  beforeEach(() => {
    user = new User('Shrouk', 'Shrouk1717');
  })
  it(" Adds a product to the cart array.", () => {
    const product = { name: 'milk', price: 40 };
    user.addToCart(product);
    expect(user.cart).toContain(product);
  });

  it("testing calculateTotalCartPrice logic", () => {
    const products = [
      { name: "Product1", price: 20 },
      { name: "Product2", price: 24 },
    ];
    products.forEach((product) => user.addToCart(product));
    const totoal = products.reduce((acc, prd) => acc + prd.price, 0);
    expect(user.calculateTotalCartPrice()).toBe(totoal);
  });
  it('last one testing', () => {
    const paymentModel = {
      goToVerifyPage: jasmine.createSpy(),
      returnBack: jasmine.createSpy(),
      isVerify: jasmine.createSpy().and.returnValue(true),
    };
    expect(user.checkout(paymentModel)).toBe(true);
    expect(paymentModel.goToVerifyPage()).toHaveBeenCalled;
    expect(paymentModel.returnBack()).toHaveBeenCalled;
    expect(paymentModel.isVerify()).toHaveBeenCalled;
  })
})